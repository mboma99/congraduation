from typing import List
from fastapi import APIRouter, Depends, Security
from fastapi import HTTPException
from backend.app.service.customers import CustomerService
from backend.app.service.schema import CustomerProfileResponse, ResponseSchema,PhotographerUpdateSchema, PersonProfileUpdate
from backend.app.repository.auth_repo import JWTBearer, JWTRepo
from fastapi.security import HTTPAuthorizationCredentials
from backend.app.service.photographer import PhotographerService

router = APIRouter(
    prefix="/photographer",
    tags=['Photographer'],
    dependencies=[Depends(JWTBearer())]
)

@router.get("/", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_photographer_profile(credentials: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token = JWTRepo.extract_token(credentials)
    result = await PhotographerService.get_photographer(token['email'])
    return ResponseSchema(detail="Successfully fetch data!", result=result)

@router.put("/update_photographer_profile", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_photographer_profile(request_body:PhotographerUpdateSchema , credentials: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token = JWTRepo.extract_token(credentials)
    await PhotographerService.update_photographer_profile(token['email'], request_body)
    return ResponseSchema(detail="Successfully update data!")

@router.put("/update_person_profile", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_person_profile(request_body: dict, credentials: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token = JWTRepo.extract_token(credentials)
    await PhotographerService.update_person_profile(token['email'], request_body)
    return ResponseSchema(detail="Successfully update data!")
