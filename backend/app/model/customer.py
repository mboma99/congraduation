from typing import List, Optional
from sqlalchemy import Column, String
from sqlmodel import SQLModel, Field, Relationship
from backend.app.model.mixins import TimeMixin


class Customers(SQLModel, table=True):
    __tablename__ = "tbl_customer"

    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    person_id: Optional[str] = Field(default=None, foreign_key="tbl_person.id")
    university_id: Optional[str] = Field(default=None, foreign_key="tbl_university.id")
    email: str = Field(sa_column=Column("email", String, unique=True))
    password: str
    address: str = Field(sa_column=Column("address", String, unique=False))
    city: str = Field(sa_column=Column("city", String, unique=False))
    postcode: str = Field(sa_column=Column("postcode", String, unique=False))

    person: Optional["Person"] = Relationship(back_populates="customers")

    university: Optional["Universities"] = Relationship(back_populates="customers")
