from fastapi import APIRouter, Depends, Security
from fastapi import HTTPException
from backend.app.service.schema import ResponseSchema
from backend.app.repository.auth_repo import JWTBearer, JWTRepo
from fastapi.security import HTTPAuthorizationCredentials
from backend.app.service.person import PersonService

router = APIRouter(
    prefix="/person",
    tags=['Person'],
    dependencies=[Depends(JWTBearer())]
)


@router.put("/update_profile", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_user_profile(request_body: dict, credentials: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token = JWTRepo.extract_token(credentials)
    await PersonService.update_person_profile(token['email'], request_body)
    return ResponseSchema(detail="Successfully update data!")
