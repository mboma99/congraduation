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
    username: str
    email: str
    password: str
    university: str
    address:str
    postcode:str
    phone_number: str
    date_of_birth: str
    profile: str = "base64"


    # phone number validation
    @validator("phone_number")
    def phone_validation(cls, v):
        logger.debug(f"phone in 2 validator: {v}")

        # regex phone number
        regex = r"^[\+]?[(]?[0-9]{4}[)]?[-\s\.]?[0-9]{4}[-\s\.]?[0-9]{4,6}$"
        if v and not re.search(regex, v, re.I):
            raise HTTPException(status_code=400, detail="Invalid input phone number!")
        return v

        # date of birth validation
        @validator("date_of_birth")
        def date_of_birth_validation(cls, v):
            logger.debug(f"date_of_birth in validator: {v}")

            try:
                # Parse the date of birth string into a datetime object
                dob = datetime.strptime(v, '%d-%m-%Y')

                # Assuming a reasonable age range (e.g., 18 to 100 years old)
                min_age = 18
                max_age = 100

                # Calculate the age
                age = (datetime.now() - dob).days // 365

                # Check if the age is within the acceptable range
                if not (min_age <= age <= max_age):
                    raise ValidationError("Invalid age. Must be between 18 and 100 years.")
            except ValueError:
                raise ValidationError("Invalid date of birth format. Use 'dd-mm-yyyy'.")

            return v



class LoginSchema(BaseModel):
    username: str
    password: str


class ForgotPasswordSchema(BaseModel):
    email: str
    new_password: str


class DetailSchema(BaseModel):
    status: str
    message: str
    result: Optional[T] = None

class CustomerProfileResponse(BaseModel):
    username: str
    email: str
    first_name: str
    last_name: str
    dob: datetime
    profile: str
    phone_number: str
class ResponseSchema(BaseModel):
    detail: str
    result: Optional[CustomerProfileResponse] = None

