from fastapi import APIRouter, Depends, Security
from fastapi import HTTPException
from backend.app.service.schema import ResponseSchema
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
    result = await CustomerService.get_customer_profile(token['email'])
    return ResponseSchema(detail="Successfully fetch data!", result=result)



@router.get("/logged_in", response_model=ResponseSchema, response_model_exclude_none=True)
async def is_user_logged_in(credentials: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token = JWTRepo.extract_token(credentials)
    is_valid = await CustomerService.get_customer_profile(token['email'])
    if is_valid is not None:
        return ResponseSchema(detail="Logged In", result=True)
    else:
        raise HTTPException(status_code=401, detail="Invalid token or expired", result=False)