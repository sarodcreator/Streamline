#!/usr/bin/env python3
""" this is the engine of the app """
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, scoped_session
from dotenv import load_dotenv
import os
from models.base_model import Base
from sqlalchemy.exc import SQLAlchemyError
from models.user import User
from models.video import Video
from models.comment import Comment

load_dotenv()

classes = {"User": User, "Video": Video, "Comment": Comment}
DB_USER = os.getenv('DB_USER')
DB_USER_PWD = os.getenv('DB_USER_PWD')
DB_ENGINE = os.getenv('DB_ENGINE')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')

class DbStorage:
    """this is the storage engine of the app"""
    __engine = None
    __session = None

    def __init__(self):
        """creating the engine"""
        DATABASE_URL = f'mysql+mysqldb://{DB_USER}:{DB_USER_PWD}@{DB_HOST}:{DB_PORT}/{DB_ENGINE}'
        self.__engine = create_engine(DATABASE_URL, pool_pre_ping=True)


    def reload(self):
        """creates all the table and connect to db
        check the init file of this directory to see how it is
        called"""
        Base.metadata.create_all(self.__engine)  # creating all the declared tables into the db
        session_factory = sessionmaker(self.__engine, expire_on_commit=False)
        self.__session = scoped_session(session_factory)  # the connector
    
    def new(self, obj):
        """adds a new obj to session"""
        self.__session.add(obj)
    
    def save(self):
        """commits the current session(object) to database"""
        try:
            self.__session.commit()
        except SQLAlchemyError as e:
            print(f"Error: {str(e)}")
            self.rollback()
    
    def rollback(self):
        """roll backs the state of database if error occurs"""
        self.__session.rollback()
    
    def delete(self, obj=None):
        """delete obj from session"""
        if obj is not None:
            self.__session.delete(obj)
            self.__session.commit()
    
    def all(self, cls=None):
        """queries the db for all instances of d class.
        if the class is None, all instances of all the classes
        are returned"""
        result = {}
        try:
            for clss in classes:
                if cls is None or cls is clss or cls is classes[clss]:
                    objs = self.__session.query(classes[clss]).all()
                    for obj in objs:
                        key = "{}.{}".format(obj.__class__.__name__, obj.id)
                        result[key] = obj
            return result
        except SQLAlchemyError:
            raise ValueError()
    
    def get(self, cls, get_id):
        """get a single obj via id"""
        if isinstance(cls, str):
            cls = classes.get(cls)
        if cls is None or not cls in classes.values():
            return None
        return self.__session.query(cls).get(get_id)
    
    def count(self, cls=None):
        """get the count of all object of the class"""
        from models import storage

        clss = classes.values()
        if cls is None:
            count = 0
            for i in clss:
                count += len(storage.all(i).values())
        else:
            count = len(storage.all(cls).values())
        return count

    def search(self, cls, kwargs: dict):
        try:
            all_val = self.__session.query(cls).filter_by(**kwargs).all()
            return all_val
        except SQLAlchemyError:
            raise ValueError('Not found')

    def close(self):
        """closes the session"""
        if self.__session:
            self.__session.close()

    def delete_all(self, cls):
        """deletes all the data from a table
        this is just for testing purposes (WARNING)"""
        try:
            self.__session.query(cls).delete()
            self.__session.commit()
        except SQLAlchemyError:
            self.__session.rollback()
            raise
    
    def update(self, cls, get_id, updates: dict):
        """updates an object in db"""
        from datetime import datetime
        if updates is None or not updates:
            pass
        else:
            try:
                obj = self.get(cls, get_id)
                if obj is None:
                    raise ValueError('not found')
                for key, val in updates.items():
                    if hasattr(obj, key):
                        setattr(obj, key, val)
                obj.updated_at = datetime.now()
                self.save()
            except SQLAlchemyError:
                self.rollback()
                raise ValueError('Error updating')
        