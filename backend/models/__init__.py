#!/usr/bin/env python3
"""refreshes the db"""

from models.engine.DBstorage import DbStorage

storage = DbStorage()
storage.reload()
