#!/usr/bin/env python3
"""Comment model"""
from sqlalchemy.orm import relationship
from sqlalchemy import Column, ForeignKey, String
from models.base_model import BaseModel


class Comment(BaseModel):
    __tablename__ = 'comments'

    # Comment content field
    content = Column(String(100), nullable=False)

    # Foreign keys to the User and Video tables
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    video_id = Column(String(60), ForeignKey('videos.id'), nullable=False)

    # Relationships to the User and Video models
    user = relationship('User', back_populates='comments')
    video = relationship('Video', back_populates='comments', cascade='all, delete')
