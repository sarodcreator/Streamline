#!/usr/bin/env python3
"""blueprint of the views"""
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/netflix')

from api.v1.views.user import *
# from api.v1.views.users import *
from api.v1.views.videos import *