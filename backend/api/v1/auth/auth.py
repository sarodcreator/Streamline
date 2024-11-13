#!/usr/bin/env python3
"""auth base model"""
from flask import request

class Auth:
    """base auth model"""

    def require_auth(self, path: str, exc_path: list):
        """checks if a path require authentication"""
        if path is None or exc_path is None or not exc_path:
            return False
        path = path if path.endswith('/') else path + '/'
        if path in exc_path:
            return False
        return True
    
    def session_cookie(self, request):
        """gets the session cookie"""
        if request is None:
            return None
        return request.cookies.get('session_id')
        