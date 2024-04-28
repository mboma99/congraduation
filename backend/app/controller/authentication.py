from fastapi import APIRouter
from fastapi import HTTPException
from backend.app.service.schema import CustomerDeleteSchema, ForgotPasswordPhotographerSchema, ResponseSchema, RegisterSchema, LoginSchema, ForgotPasswordSchema, RefreshTokenSchema, RegisterPhotographerSchema
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

@router.delete("/delete/customer", response_model=ResponseSchema, response_model_exclude_none=True)
async def delete(request_body: CustomerDeleteSchema):
    await AuthService.delete_customer_service(request_body)
    return ResponseSchema(detail="Successfully delete data!")

@router.post("/token_refresh", response_model=ResponseSchema, response_model_exclude_none=True)
async def token_refresh(request_body: RefreshTokenSchema):
    try: 
        # Check if the user is a customer
        token = await AuthService.token_refresh_service(request_body)
        return ResponseSchema(detail="Successfully refresh token", result={"token_type": "Bearer", "access_token": token})
    except HTTPException as e:
        # If the customer token refresh fails with a 404 error, try photographer
        if e.status_code == 404:
            try:
                token = await AuthService.token_refresh_service_photographer(request_body)
                return ResponseSchema(detail="Successfully refresh token", result={"token_type": "Bearer", "access_token": token})
            except HTTPException as e:
                # Handle any other errors
                return e
        else:
            # Handle any other errors
            return e
        
@router.post("/register_photographer", response_model=ResponseSchema, response_model_exclude_none=True)
async def register_photographer(request_body: RegisterPhotographerSchema):
    await AuthService.register_photographer_service(request_body)
    return ResponseSchema(detail="Successfully save data!")

@router.post("/login_photographer", response_model=ResponseSchema)
async def login_photographer(request_body: LoginSchema):
    token = await AuthService.login_photographer_service(request_body)
    return ResponseSchema(detail="Successfully login", result={"token_type": "Bearer", "access_token": token})

@router.post("/forgot-password_photographer", response_model=ResponseSchema, response_model_exclude_none=True)
async def forgot_password_photographer(request_body: ForgotPasswordPhotographerSchema):
    token = await AuthService.photographer_forgot_password_service(request_body)
    return ResponseSchema(detail="Successfully update data!", result={"token_type": "Bearer", "access_token": token})
