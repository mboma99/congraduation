from fastapi import APIRouter

from backend.app.service.schema import ResponseSchema, RegisterSchema, LoginSchema, ForgotPasswordSchema, RefreshTokenSchema
from backend.app.service.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=['Authentication'])


@router.post("/register", response_model=ResponseSchema, response_model_exclude_none=True)
async def register(request_body: RegisterSchema):
    await AuthService.register_service(request_body)
    return ResponseSchema(detail="Successfully save data!")


@router.post("/login", response_model=ResponseSchema)
async def login(request_body: LoginSchema):
    token = await AuthService.logins_service(request_body)
    return ResponseSchema(detail="Successfully login", result={"token_type": "Bearer", "access_token": token})


@router.post("/forgot-password", response_model=ResponseSchema, response_model_exclude_none=True)
async def forgot_password(request_body: ForgotPasswordSchema):
    await AuthService.forgot_password_service(request_body)
    return ResponseSchema(detail="Successfully update data!")

@router.post("/token_refresh", response_model=ResponseSchema, response_model_exclude_none=True)
async def token_refresh(request_body: RefreshTokenSchema):
    token = await AuthService.token_refresh_service(request_body)
    return ResponseSchema(detail="Successfully refresh token", result={"token_type": "Bearer", "access_token": token})
