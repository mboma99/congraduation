from datetime import datetime

from fastapi import HTTPException
import logging
import re
from typing import TypeVar, Optional

from pydantic import BaseModel, validator, ValidationError, Field, HttpUrl
from sqlalchemy import false

T = TypeVar('T')

# get root logger
logger = logging.getLogger(__name__)


class RegisterSchema(BaseModel):
    first_name: str = Field(None, example="John")
    last_name: str = Field(None, example="Doe")
    email: str = Field(None, example="john.doe@example.com")
    password: str = Field(None, example="password")
    university: str = Field(None, example="De Montfort University")
    address: str = Field(None, example="1234 Main Street")
    postcode: str = Field(None, example="LE1 7RH")
    city: str = Field(None, example="Leicester")
    phone_number: str = Field(None, example="+771234567890")
    

    # phone number validation
    @validator("phone_number")
    def phone_validation(cls, v):
        logger.debug(f"phone in 2 validator: {v}")

        # regex phone number with the specified format
        regex = r"^\+[\d\s]{1,}[0-9]{10}$"
        if v and not re.search(regex, v, re.I):
            raise HTTPException(status_code=400, detail="Invalid input phone number!")
        return v
    
class PortfolioRegisterSchema(BaseModel):
    photographer_id: str = Field(None, example="1")
    customer_first_name: str = Field(None, example="John")
    customer_last_name: str = Field(None, example="Doe")
    customer_email: Optional[str] = Field(None, example="customer@example.com")
    university_id: str = Field(None, example="1")
    graduation_year: int = Field(None, example=2022)
    is_active: bool = Field(None, example=True)
    created_at: Optional[datetime] = Field(None, example="2022-01-01T00:00:00")
    edited_at: Optional[datetime] = Field(None, example="2022-02-01T00:00:00")
    
class RegisterPhotographerSchema(BaseModel):
    first_name: str = Field(None, example="John")
    last_name: str = Field(None, example="Doe")
    email: str = Field(None, example="john.doe@example.com")
    password: str = Field(None, example="password")
    phone_number: str = Field(None, example="+771234567890")
    access_id: str = Field(None, example="1")

    # phone number validation
    @validator("phone_number")
    def phone_validation(cls, v):
        logger.debug(f"phone in 2 validator: {v}")

        # regex phone number with the specified format
        regex = r"^\+[\d\s]{1,}[0-9]{10}$"
        if v and not re.search(regex, v, re.I):
            raise HTTPException(status_code=400, detail="Invalid input phone number!")
        return v

class CreatePortfolioSchema(BaseModel):
    customer_first_name: str = Field(None, example="John")
    customer_last_name: str = Field(None, example="Doe")
    customer_email: Optional[str] = Field(None, example="customer@example.com")
    university_id: str = Field(None, example="1")
    graduation_year: int = Field(None, example=2022)
    is_active: bool = Field(None, example=False)
    
class LoginSchema(BaseModel):
    email: str  = Field(None, example="john.doe@example.com")
    password: str = Field(None, example="password")


class ForgotPasswordSchema(BaseModel):
    email: str = Field(None, example="john.doe@example.com")
    new_password: str = Field(None, example="password")

class ForgotPasswordPhotographerSchema(BaseModel):
    email: str = Field(None, example="john.doe@admin.com")
    new_password: str = Field(None, example="password")
    access_id: str = Field(None, example="1")
    
class PortfolioSchema(BaseModel):
    id: str = Field(None, example="1")
    photographer_id: str = Field(None, example="1")
    customer_first_name: str = Field(None, example="John")
    customer_last_name: str = Field(None, example="Doe")
    customer_email: Optional[str] = Field(None, example="customer@example.com")
    university_id: str = Field(None, example="1")
    graduation_year: int = Field(None, example=2022)
    is_active: bool = Field(None, example=True)
    created_at: Optional[datetime] = Field(None, example="2022-01-01T00:00:00")
    edited_at: Optional[datetime] = Field(None, example="2022-02-01T00:00:00")

class CustomerDeleteSchema(BaseModel):
    email: str = Field(None, example="john@dmu.ac.uk")
    access_id: str = Field(None, example="1")
    
class PhotographerDeleteSchema(BaseModel):
    email: str = Field(None, example="admin@admin.ac.uk")
    password: str = Field(None, example="password")
    
class PorfoliomigrationSchema(BaseModel):
    email: str = Field(None, example="admin@admin.ac.uk")

    portfolio_migration_id: Optional[str] = Field(None, example="1")
    
    
class PhotoSchema(BaseModel):
    id: str = Field(None, example="1")
    portfolio_id: str = Field(None, example="1")
    image_url: HttpUrl = Field(None, example="https://example.com/image.jpg")
    price: float = Field(None, example=10.0)
    stripe_id: str = Field(None, example="1")
    
class PhotographerUpdateSchema(BaseModel):
    email: Optional[str] = Field(None, example="john.doe@example.com")
    
class CustomerProfileUpdate(BaseModel):
    email: str
    university: str
    university_id: str
    address: str
    postcode: str
    city: str

class PersonProfileUpdate(BaseModel):
    first_name: str
    last_name: str
    phone_number: str
    
class DetailSchema(BaseModel):
    status: str
    message: str
    result: Optional[T] = None

class ResponseSchema(BaseModel):
    detail: str
    result: Optional[T] = None

class PhotoResponse(BaseModel):
    id: str = Field(None, example="1")
    portfolio_id: str = Field(None, example="1")
    image_url: HttpUrl = Field(None, example="https://example.com/image.jpg") 
    price: float = Field(None, example=10.0)
    stripe_id: str = Field(None, example="1")
    
class PhotosResponse(BaseModel):
    photos: Optional[list[PhotoResponse]] = Field(None, example=[{"id": "1", "portfolio_id": "1", "image_url": "https://example.com/image.jpg"}])
         
class CustomerProfileResponse(BaseModel):
    id: str = Field(None, example="1")
    email: str = Field(None, example="john.doe@example.com")
    first_name: str = Field(None, example="John")
    last_name: str = Field(None, example="Doe")
    university: str = Field(None, example="De Montfort University")
    university_id: str = Field(None, example="1")
    phone_number: str = Field(None, example="+771234567890")
    address: str = Field(None, example="1234 Main Street")
    postcode: str = Field(None, example="LE1 7RH")
    city: str = Field(None, example="Leicester")
    user_type: str
    
class PhotographerProfileResponse(BaseModel):
    id: str = Field(None, example="1")
    email: str = Field(None, example="photographer@example.com")
    first_name: str = Field(None, example="John")
    last_name: str = Field(None, example="Doe")
    phone_number: str = Field(None, example="+771234567890")
    portfolios: Optional[list] = Field(None, example=[{"uuid": "1", "portfolio_uuid": "1", "image_url": "https://example.com/image.jpg"}]) 
    user_type: str
    
class PortfolioResponse(BaseModel):
    id: str = Field(None, example="1")
    photographer_id: str = Field(None, example="1")
    customer_first_name: str = Field(None, example="John")
    customer_last_name: str = Field(None, example="Doe")
    customer_email: Optional[str] = Field(None, example="customer@example.com")
    university_id: str = Field(None, example="1")
    graduation_year: int = Field(None, example=2022)
    is_active: bool = Field(None, example=True)
    photos: Optional[list[PhotoResponse]] = Field(None, example=[{"id": "1", "portfolio_id": "1", "image_url": "https://example.com/image.jpg"}])
    created_at: Optional[datetime] = Field(None, example="2022-01-01T00:00:00")
    edited_at: Optional[datetime] = Field(None, example="2022-02-01T00:00:00")
    
class PortfolioUpdateResponse(BaseModel):
    customer_first_name: str = Field(None, example="John")
    customer_last_name: str = Field(None, example="Doe")
    customer_email: Optional[str] = Field(None, example="customer@example.com")
    university_id: str = Field(None, example="1")
    graduation_year: int = Field(None, example=2022)
    is_active: bool = Field(None, example=True)

class RefreshTokenSchema(BaseModel):
    access_token: str
    token_type: str
    email: str



