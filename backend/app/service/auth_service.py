
from uuid import uuid4
from fastapi import HTTPException
from passlib.context import CryptContext
from backend.app.model import Person, Customers, Photographer
from backend.app.repository.customer import CustomerRepository
from backend.app.repository.university import UniversityRepository
from backend.app.repository.person import PersonRepository
from backend.app.repository.photographer import PhotographerRepository
from backend.app.service.schema import LoginSchema, ForgotPasswordSchema, RegisterSchema, RefreshTokenSchema
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
        _customer = await CustomerRepository.find_by_email(forgot_password.email)
        _email = _customer.email
        if _email is None:
            raise HTTPException(status_code=404, detail="Email not found !")
        await CustomerRepository.update_password(forgot_password.email, pwd_context.hash(forgot_password.new_password))
        return JWTRepo(data={"email": _customer.email}).generate_token()
     
    async def photographer_forgot_password_service(forgot_password: ForgotPasswordSchema):
        _email = await PhotographerRepository.find_by_email(forgot_password.email)
        if _email is None:
            raise HTTPException(status_code=404, detail="Email not found !")
        await PhotographerRepository.update_password(forgot_password.email, pwd_context.hash(forgot_password.new_password))

        _email = await CustomerRepository.find_by_email(forgot_password.email)
        if _email is not None:
            raise HTTPException(status_code=400, detail="Invalid Email !")
        _photographer = await CustomerRepository.find_by_email(forgot_password.email)
        if _photographer is not None:
            if not pwd_context.verify(forgot_password.password, _photographer.password):
                raise HTTPException(
                    status_code=400, detail="Invalid Password !")
            return JWTRepo(data={"email": _photographer.email}).generate_token()
        raise HTTPException(status_code=404, detail="email not found !")
    
    @staticmethod
    async def register_photographer_service(register: RegisterSchema):
        _person_id = str(uuid4())
        _photographer_id = str(uuid4())
        _person = Person(id=_person_id,
                         first_name=register.first_name,
                         last_name=register.last_name,
                         phone_number=register.phone_number)
        _photographer = Photographer(id=_photographer_id,
                                     person_id=_person_id,
                                     email=register.email,
                                     password=pwd_context.hash(register.password))
        _email = await PhotographerRepository.find_by_email(register.email)
        if _email:
            raise HTTPException(
                status_code=400, detail="Email already exists!")
        else:
            await PersonRepository.create(**_person.dict())
            await PhotographerRepository.create(**_photographer.dict())
            
    @staticmethod
    async def login_photographer_service(login: LoginSchema):
        _email = await PhotographerRepository.find_by_email(login.email)
        if _email is not None:
            if not pwd_context.verify(login.password, _email.password):
                raise HTTPException(
                    status_code=400, detail="Invalid Password !")
            return JWTRepo(data={"email": _email.email}).generate_token()
        raise HTTPException(status_code=404, detail="email not found !")
    
    @staticmethod
    async def token_refresh_service(refresh_token: RefreshTokenSchema):
        _email = await CustomerRepository.find_by_email(refresh_token.email)
        if _email is not None:
            return JWTRepo(data={"email": _email.email}).generate_token()
        raise HTTPException(status_code=404, detail="email not found !")