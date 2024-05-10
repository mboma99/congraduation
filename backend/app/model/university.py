from typing import List, Optional
from sqlalchemy import Column, String
from sqlmodel import SQLModel, Field, Relationship
from app.model.mixins import TimeMixin


class Universities(SQLModel, table=True):
    __tablename__ = "tbl_university"

    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    university: str = Field(sa_column=Column("university", String, unique=True))
    city: str = Field(sa_column=Column("city", String, unique=False))
    address: str = Field(sa_column=Column("address", String, unique=False))
    postcode: str = Field(sa_column=Column("postcode", String, unique=False))

    customers: List["Customers"] = Relationship(back_populates="university")
