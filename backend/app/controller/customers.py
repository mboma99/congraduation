from fastapi import APIRouter, Depends, Security

from backend.app.service.schema import ResponseSchema, RegisterSchema, LoginSchema, ForgotPasswordSchema
from backend.app.repository.auth_repo import JWTBearer, JWTRepo

from fastapi.security import HTTPAuthorizationCredentials
from backend.app.service.customers import CustomerService

router = APIRouter(
    prefix="/customer",
    tags=['Customer'],
    dependencies=[Depends(JWTBearer())]
)


@router.get("/", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_user_profile(credentials: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token = JWTRepo.extract_token(credentials)
    result = await CustomerService.get_customer_profile(token['username'])
    return ResponseSchema(detail="Successfully fetch data!", result=result)