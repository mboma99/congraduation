from datetime import datetime

from fastapi import HTTPException
import logging
import re
from typing import TypeVar, Optional

from pydantic import BaseModel, validator, ValidationError
from sqlalchemy import false

T = TypeVar('T')

# get root logger
logger = logging.getLogger(__name__)


class RegisterSchema(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    university: str
    address: str
    postcode: str
    city: str
    phone_number: str

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
    email: str
    password: str


class ForgotPasswordSchema(BaseModel):
    email: str
    new_password: str


class CustomerProfileResponse(BaseModel):
    email: str
    first_name: str
    last_name: str
    university: str
    university_id: str
    phone_number: str
    address: str
    postcode: str
    city: str
    

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
    
class RefreshTokenSchema(BaseModel):
    access_token: str
    token_type: str
    email: str



