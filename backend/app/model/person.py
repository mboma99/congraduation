from enum import Enum

from pydantic import BaseModel, validator
from typing import Optional
from datetime import date
from sqlmodel import SQLModel, Field, Relationship
from app.model.mixins import TimeMixin

class Person(SQLModel, TimeMixin, table=True):
    __tablename__ = "tbl_person"

    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    first_name: str
    last_name: str
    phone_number: str

    customers: Optional["Customers"] = Relationship(
        sa_relationship_kwargs={'uselist': False}, back_populates="person")

    photographer: Optional["Photographer"] = Relationship(
        sa_relationship_kwargs={'uselist': False}, back_populates="person")