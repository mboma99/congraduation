from datetime import datetime
from typing import List, Optional
from sqlalchemy import Column, String
from sqlmodel import Field, SQLModel


class Access(SQLModel, table=True):
    __tablename__ = "tbl_access"

    id: str = Field(None, primary_key=True, nullable=False)
    created_at: datetime = Field(default=None)