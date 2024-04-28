from sqlalchemy import update as sql_update
from sqlalchemy.future import select

from backend.app.config import db, commit_rollback
from backend.app.model.access import Access
from backend.app.repository.base_repo import BaseRepo

class AccessRepository(BaseRepo):
    model = Access