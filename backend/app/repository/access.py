from sqlalchemy import update as sql_update
from sqlalchemy.future import select

from app.config import db, commit_rollback
from app.model.access import Access
from app.repository.base_repo import BaseRepo

class AccessRepository(BaseRepo):
    model = Access