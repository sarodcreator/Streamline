#!/usr/bin/env python3
"""base Model for all models"""
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
import uuid
import models
from datetime import datetime
import html
from sqlalchemy import DateTime, String, Column

Base = declarative_base()

class BaseModel(Base):
    """base for all models"""
    # this class won't be mapped to any table but any class that
    # inherits from it will be mapped. I made this so i won't be importing Base
    # everytime
    __abstract__ = True
    # --- these are the attributes all models will have in common -----

    # the unique id of the object
    id = Column(String(60), primary_key=True, default=lambda: str(uuid.uuid4()))
    # created at
    created_at = Column(DateTime(timezone=True), default=datetime.now(), nullable=False)
    # for updated obj
    updated_at = Column(DateTime(timezone=True), default=datetime.now, onupdate=func.now, nullable=False)

    # ---- end -----------
    def __init__(self, **kwargs):
        self.id = str(uuid.uuid4())
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        if kwargs:
            for key, val in kwargs.items():
                if key in ['created_at', 'updated_at']:
                    value = datetime.strptime(value, "%Y-%m-%dT%H:%M:%S.%f")
                setattr(self, key, val)

    def __str__(self):
        """Returns a string representation of the instance"""
        cls = type(self).__name__
        attributes = ', '.join(f"'{key}': {repr(getattr(self, key))}" for key in self.__dict__.keys()
                               if key != '_sa_instance_state' and key !='password')
        return f"[{cls}] ({self.id}) {{{attributes}}}"

    def save(self):
        """save to db"""
        models.storage.new(self)
        models.storage.save()
    
    def delete(self):
        """deletes object from db"""
        if self is None:
            raise ValueError()
        models.storage.delete(self)
    
    def to_json(self):
        """serializes the obj from db"""
        data = {}
        for col in self.__table__.columns:
            if col.name == 'password':
                continue
            value = getattr(self, col.name)
            # unescape the html content before adding it to the data dictionary
            if col.name == "trailer_url":
                value = html.unescape(value)
            
            if isinstance(value, datetime):
                data[col.name] = value.isoformat()
            else:
                data[col.name] = value
        return data
    
    @classmethod
    def search(cls, kwargs: dict):
        """search for an object"""
        return models.storage.search(cls, kwargs)

    @classmethod
    def all(cls=None):
        """returns all object"""
        return models.storage.all(cls)
    
    @classmethod
    def get(cls, get_id):
        """get a single obj"""
        return models.storage.get(cls, get_id)
    
    @classmethod
    def delete_all(cls):
        """deletes all instances of the model (FOR TESTING WARNING)"""
        models.storage.delete_all(cls)
    
    def update(self, updates: dict):
        """updates an obj in db"""
        models.storage.update(self.__class__, self.id, updates)
