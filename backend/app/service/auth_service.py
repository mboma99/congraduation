
from uuid import uuid4
from fastapi import HTTPException
from passlib.context import CryptContext
from backend.app.model import Person, Customers
from backend.app.repository.customer import CustomerRepository
from backend.app.repository.university import UniversityRepository
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
        university_repo = UniversityRepository()

        # Get the email ID for the specified university
        university_id = await university_repo.get_university_id(register.university)
        # mapping request data to class entity table
        _person = Person(id=_person_id,
                         first_name=register.first_name,
                         last_name=register.last_name,
                         phone_number=register.phone_number)

        _Customers = Customers(id=_Customers_id,
                               person_id=_person_id,
                               university_id=university_id,
                               email=register.email,
                               password=pwd_context.hash(register.password),
                               address=register.address,
                               postcode=register.postcode,
                               city=register.city
                               )

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
        _email = await CustomerRepository.find_by_email(login.email)

        if _email is not None:
            if not pwd_context.verify(login.password, _email.password):
                raise HTTPException(
                    status_code=400, detail="Invalid Password !")
            return JWTRepo(data={"email": _email.email}).generate_token()
        raise HTTPException(status_code=404, detail="email not found !")

    @staticmethod
    async def forgot_password_service(forgot_password: ForgotPasswordSchema):
        _email = await CustomerRepository.find_by_email(forgot_password.email)
        if _email is None:
            raise HTTPException(status_code=404, detail="Email not found !")
        await CustomerRepository.update_password(forgot_password.email, pwd_context.hash(forgot_password.new_password))

