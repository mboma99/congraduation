import base64
from datetime import datetime
from uuid import uuid4
from fastapi import HTTPException
from passlib.context import CryptContext
from backend.app.model import Person, Customers
from backend.app.repository.customer import CustomerRepository
from backend.app.repository.graduation import GraduationRepository
from backend.app.repository.person import PersonRepository
from backend.app.service.schema import LoginSchema, ForgotPasswordSchema, RegisterSchema
from backend.app.repository.auth_repo import JWTRepo


# Encrypt password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:

    @staticmethod
    async def register_service(register: RegisterSchema):

        # Create uuid
        _person_id = str(uuid4())
        _Customers_id = str(uuid4())
        graduation_repo = GraduationRepository()

        # convert birthdate type from frontend str to date
        birth_date = datetime.strptime(register.date_of_birth, '%d-%m-%Y')

        # Get the graduation ID for the specified university
        graduation_id = await graduation_repo.get_graduation_id(register.university)
        # mapping request data to class entity table
        _person = Person(id=_person_id,
                         first_name=register.first_name,
                         last_name=register.last_name,
                         dob=birth_date,
                         profile="test.png",
                         phone_number=register.phone_number)

        _Customers = Customers(id=_Customers_id,
                               person_id=_person_id,
                               graduation_id=graduation_id,
                               username=register.username,
                               email=register.email,
                               password=pwd_context.hash(register.password),
                               address=register.address,
                               postcode=register.postcode
                               )

        # Checking the same username
        _username = await CustomerRepository.find_by_username(register.username)
        if _username:
            raise HTTPException(
                status_code=400, detail="Username already exists!")

        # Checking the same email
        _email = await CustomerRepository.find_by_email(register.email)
        if _email:
            raise HTTPException(
                status_code=400, detail="Email already exists!")

        else:
            # insert to tables
            await PersonRepository.create(**_person.dict())
            await CustomerRepository.create(**_Customers.dict())

    @staticmethod
    async def logins_service(login: LoginSchema):
        _username = await CustomerRepository.find_by_username(login.username)

        if _username is not None:
            if not pwd_context.verify(login.password, _username.password):
                raise HTTPException(
                    status_code=400, detail="Invalid Password !")
            return JWTRepo(data={"username": _username.username}).generate_token()
        raise HTTPException(status_code=404, detail="Username not found !")

    @staticmethod
    async def forgot_password_service(forgot_password: ForgotPasswordSchema):
        _email = await CustomerRepository.find_by_email(forgot_password.email)
        if _email is None:
            raise HTTPException(status_code=404, detail="Email not found !")
        await CustomerRepository.update_password(forgot_password.email, pwd_context.hash(forgot_password.new_password))

