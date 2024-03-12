from datetime import datetime

from fastapi import HTTPException
import logging
import re
from typing import TypeVar, Optional

from pydantic import BaseModel, validator, ValidationError, Field
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

class RegisterPhotographerSchema(BaseModel):
    first_name: str = Field(None, example="John")
    last_name: str = Field(None, example="Doe")
    email: str = Field(None, example="john.doe@example.com")
    password: str = Field(None, example="password")
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


class LoginSchema(BaseModel):
    email: str  = Field(None, example="john.doe@example.com")
    password: str = Field(None, example="password")


class ForgotPasswordSchema(BaseModel):
    email: str = Field(None, example="john.doe@example.com")
    new_password: str = Field(None, example="password")

class PortfolioSchema(BaseModel):
    id: str = Field(None, example="1")
    photographer_id: str = Field(None, example="1")
    university_id: str = Field(None, example="1")
    graduation_year: str = Field(None, example="2022")
    is_active: bool = Field(None, example=True)
    created_at: Optional[datetime] = Field(None, example="2022-01-01T00:00:00")
    updated_at: Optional[datetime] = Field(None, example="2022-02-01T00:00:00")
    
class PhotoSchema(BaseModel):
    uuid: str = Field(None, example="1")
    portfolio_id: str = Field(None, example="1")
    image_url: str = Field(None, example="https://example.com/image.jpg")
    
class PhotographerUpdateSchema(BaseModel):
    first_name: Optional[str] = Field(None, example="John")
    last_name: Optional[str] = Field(None, example="John")
    email: Optional[str] = Field(None, example="john.doe@example.com")
    phone_number: Optional[str] = Field(None, example="+771234567890")
    
class CustomerProfileUpdate(BaseModel):
    email: str = Field(None, example="john.doe@example.com")
    university: Optional[str] = Field(None, example="De Montfort University")
    university_id: Optional[str] = Field(None, example="1")
    address: Optional[str] = Field(None, example="1234 Main Street")
    postcode: Optional[str] = Field(None, example="LE1 7RH")
    city: Optional[str] = Field(None, example="Leicester")
    
class PersonProfileUpdate(BaseModel):
    first_name: Optional[str] = Field(None, example="John")
    last_name: Optional[str] = Field(None, example="John")
    phone_number: Optional[str] = Field(None, example="+77 1234567890")
    
class DetailSchema(BaseModel):
    status: str
    message: str
    result: Optional[T] = None

class ResponseSchema(BaseModel):
    detail: str
    result: Optional[T] = None
    
class CustomerProfileResponse(BaseModel):
    email: str = Field(None, example="john.doe@example.com")
    first_name: str = Field(None, example="John")
    last_name: str = Field(None, example="Doe")
    university: str = Field(None, example="De Montfort University")
    university_id: str = Field(None, example="1")
    phone_number: str = Field(None, example="+771234567890")
    address: str = Field(None, example="1234 Main Street")
    postcode: str = Field(None, example="LE1 7RH")
    city: str = Field(None, example="Leicester")
    
class PhotographerProfileResponse(BaseModel):
    id: str = Field(None, example="1")
    email: str = Field(None, example="photographer@example.com")
    first_name: str = Field(None, example="John")
    last_name: str = Field(None, example="Doe")
    phone_number: str = Field(None, example="+771234567890")
    portfolios: Optional[list] = Field(None, example=[{"uuid": "1", "portfolio_uuid": "1", "image_url": "https://example.com/image.jpg"}]) 

class PortfolioResponse(BaseModel):
    photographer_id: str = Field(None, example="1")
    customer_first_name: str = Field(None, example="John")
    customer_last_name: str = Field(None, example="Doe")
    customer_email: Optional[str] = Field(None, example="customer@example.com")
    university_id: str = Field(None, example="1")
    graduation_year: int = Field(None, example=2022)
    is_active: bool = Field(None, example=True)
    created_at: Optional[datetime] = Field(None, example="2022-01-01T00:00:00")
    updated_at: Optional[datetime] = Field(None, example="2022-02-01T00:00:00")

class PhotoResponse(BaseModel):
    uuid: str = Field(None, example="1")
    portfolio_id: str = Field(None, example="1")
    image_url: str = Field(None, example="https://example.com/image.jpg") 
    
class RefreshTokenSchema(BaseModel):
    access_token: str
    token_type: str
    email: str



