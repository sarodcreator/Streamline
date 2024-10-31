#!/usr/bin/env python3
"""video model"""
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Float, DateTime, JSON
from models.base_model import BaseModel


class Video(BaseModel):
    __tablename__ = 'videos'
    comments = relationship('Comment', back_populates='video')
    title = Column(String(20), nullable=False)
    description = Column(String(1024), nullable=True)
    video_url = Column(String(60), nullable=True)
    thumbnail_url = Column(String(60), nullable=True)
    trailer_url = Column(String(1024), nullable=True)
    total_rating = Column(Float(), nullable=True)
    genre = Column(JSON, nullable=False)
    release_date = Column(DateTime(timezone=True), nullable=False)

    