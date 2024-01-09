from typing import List, Optional
from sqlalchemy import Column, String
from sqlmodel import SQLModel, Field, Relationship
from backend.app.model.mixins import TimeMixin



class Graduations(SQLModel, table=True):
    __tablename__= "tbl_graduation"

    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    university: str = Field(sa_column=Column("university", String, unique=False))
    city: str = Field(sa_column=Column("city", String, unique=False))
    graduation_year: str = Field(sa_column=Column("graduation_year", String, unique=False))
    address: str = Field(sa_column=Column("address", String, unique=False))
    postcode: str = Field(sa_column=Column("postcode", String, unique=False))

    customers: List["Customers"] = Relationship(back_populates="graduation")