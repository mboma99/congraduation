from typing import List, Optional
from sqlalchemy import Column, String, Integer
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
from backend.app.model.mixins import TimeMixin

class Portfolio(SQLModel, table=True):
    __tablename__ = "tbl_portfolio"
    
    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    photographer_id: Optional[str] = Field(default=None, foreign_key="tbl_photographer.id")
    university_id: Optional[str] = Field(default=None, foreign_key="tbl_university.id")
    customer_first_name: str = Field(sa_column=Column("customer_first_name", String, unique=False))
    customer_last_name: str = Field(sa_column=Column("customer_last_name", String, unique=False))
    graduation_year: int = Field(sa_column=Column("graduation_year", Integer, unique=False))
    customer_email: Optional[str] = Field(sa_column=Column("customer_email", String, unique=False))
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default=None)
    edited_at: datetime = Field(default=None)
    photographer: Optional["Photographer"] = Relationship(back_populates="portfolio")
    photos: List["Photo"] = Relationship(back_populates="portfolio")

