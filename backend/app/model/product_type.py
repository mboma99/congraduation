from typing import Optional, List
from sqlalchemy import Column, String, Float
from sqlmodel import SQLModel, Field, Relationship
from app.model.mixins import TimeMixin

class ProductType(SQLModel, table=True):
    __tablename__ = "tbl_product_type"
    
    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    name: str = Field(sa_column=Column("name", String, unique=True))
    description: str = Field(sa_column=Column("description", String, unique=False))
    price: float = Field(sa_column=Column("price", Float, unique=False))
    stripe_id: str = Field(sa_column=Column("stripe_id", String, unique=False))
    
    photos: List["Photo"] = Relationship(back_populates="product_type")