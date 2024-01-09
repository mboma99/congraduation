from typing import List, Optional
from sqlalchemy import Column, String
from sqlmodel import SQLModel, Field, Relationship
from backend.app.model.mixins import TimeMixin



class Customers(SQLModel, table=True):
    __tablename__= "tbl_customer"

    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    person_id: Optional[str] = Field(default=None, foreign_key="tbl_person.id")
    graduation_id: Optional[str] = Field(default=None, foreign_key="tbl_graduation.id")
    username: str = Field(sa_column=Column("username", String, unique=True))
    email: str = Field(sa_column=Column("email", String, unique=True))
    password: str
    address: str = Field(sa_column=Column("address", String, unique=False))
    postcode: str = Field(sa_column=Column("postcode", String, unique=False))

    person: Optional["Person"] = Relationship(back_populates="customers")

    graduation: Optional["Graduations"] = Relationship(back_populates="customers")

