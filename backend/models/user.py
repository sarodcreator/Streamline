#!/usr/bin/env python3
"""User model"""
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
import bcrypt, re
from models.base_model import BaseModel



class User(BaseModel):
    __tablename__ = 'users'
    password = Column(String(60), nullable=False)
    email = Column(String(60), nullable=False)
    first_name = Column(String(60), nullable=False)
    last_name = Column(String(60), nullable=False)
    other_names = Column(String(60), nullable=True)
    gender = Column(String(60), nullable=False)
    user_name = Column(String(60), nullable=False)
    comments = relationship('Comment', back_populates='user')

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._password = kwargs.get('password')
        self._email = kwargs.get('email')
        self._first_name = kwargs.get('first_name')
        self._last_name = kwargs.get('last_name')
        self.gender = kwargs.get('gender', "MALE")
        self.user_name = kwargs.get('user_name')
    
    @property
    def _password(self):
        """returns password"""
        return self.password
    
    @_password.setter
    def _password(self, pwd):
        """sets password"""
        self.validate_pwd(pwd)
        hashed_pwd = bcrypt.hashpw(pwd.encode('utf-8'), bcrypt.gensalt())
        self.password = hashed_pwd.decode('utf-8') 


    def is_valid_pwd(self, pwd: str) -> bool:
        """check the validity of the password"""
        if pwd is None or not isinstance(pwd, str) or not pwd:
            raise ValueError('Incorrect password')

        return bcrypt.checkpw(pwd.encode('utf-8'), self._password.encode('utf-8'))


    @property
    def _first_name(self) -> str:
        """returns first name"""
        return self.first_name

    @_first_name.setter
    def _first_name(self, name: str) -> None:
        """sets first name and must not be empty"""
        self.validate_name(name)
        self.first_name = name

    @property
    def _last_name(self) -> str:
        """return last name"""
        return self.last_name
    
    @_last_name.setter
    def _last_name(self, name: str) -> None:
        """sets last name"""
        self.validate_name(name)
        self.last_name = name

    @property
    def _email(self) -> str:
        """return email"""
        return self.email
    
    @_email.setter
    def _email(self, mail) -> None:
        """sets email"""
        self.validate_email(mail)
        self.email = mail

    @staticmethod
    def validate_pwd(pwd: str) -> bool:
        """validate the password"""
        if pwd is None or not isinstance(pwd, str):
            raise ValueError('Invalid password')
        if len(pwd) < 8:
            raise ValueError("Password must be at least 8 characters")
        if not re.search(r'[A-Z]', pwd):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r'[0-9]', pwd):
            raise ValueError('Password must contain at least one number')
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', pwd):
            raise ValueError("Password must contain at least one symbol")
        return True

    @staticmethod
    def validate_name(name: str) -> bool:
        """validate first name"""
        if name is None or not name:
            raise ValueError("Name must not be empty")        
        if not isinstance(name, str):
            raise ValueError("Invalid name")
        if re.search(r'[0-9]', name):
            raise ValueError("Name cannot contain numbers")
        if re.search(r'[!@#$%^&*(),?":{}|<>]', name):
            raise ValueError("Name cannot contain special characters")
        if len(name) > 50:
            raise ValueError("Name too long")
        return True

    @staticmethod
    def validate_email(mail: str) -> bool:
        """validate mail"""
        if mail is None or not mail:
            raise ValueError("Email cannot be empty")
        if '@' not in mail or mail.count('@') != 1 or not isinstance(mail, str):
            raise ValueError("Email is invalid")
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, mail):
            raise ValueError("Email is invalid")
        if len(mail) > 100:
            raise ValueError("Email too long")
        return True
