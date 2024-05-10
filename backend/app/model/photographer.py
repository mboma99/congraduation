from typing import List, Optional
from sqlalchemy import Column, String
from sqlmodel import SQLModel, Field, Relationship
from app.model.mixins import TimeMixin

class Photographer(SQLModel, table=True):
    __tablename__ = "tbl_photographer"

    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    person_id: Optional[str] = Field(default=None, foreign_key="tbl_person.id")
    email: str = Field(sa_column=Column("email", String, unique=True))
    password: str
    
    person: Optional["Person"] = Relationship(back_populates="photographer")
    portfolio: List["Portfolio"] = Relationship(back_populates="photographer")