from typing import Optional
from sqlalchemy import Column, String
from sqlmodel import SQLModel, Field, Relationship
from backend.app.model.mixins import TimeMixin
from .product_type import ProductType

class Photo(SQLModel, table=True):
    __tablename__ = "tbl_photo"
    
    id: Optional[str] = Field(None, primary_key=True, nullable=False)
    portfolio_id: Optional[str] = Field(default=None, foreign_key="tbl_portfolio.id")
    product_type_id: Optional[str] = Field(default=None, foreign_key="tbl_product_type.id")
    image_url: str = Field(sa_column=Column("image_url", String, unique=False))
    portfolio: "Portfolio" = Relationship(back_populates="photos")
    product_type: "ProductType" = Relationship(back_populates="photos")
