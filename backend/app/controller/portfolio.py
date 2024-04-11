from fastapi import APIRouter, Depends, Security, HTTPException, UploadFile
from backend.app.service.schema import ResponseSchema,PortfolioResponse,PortfolioUpdateResponse, CreatePortfolioSchema
from backend.app.repository.auth_repo import JWTBearer, JWTRepo
from fastapi.security import HTTPAuthorizationCredentials
from backend.app.service.portfolio import PortfolioService
from backend.app.service.photo import PhotoService
from fastapi.responses import JSONResponse
import boto3 
import os
from dotenv import load_dotenv 
  
load_dotenv()

S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

router = APIRouter(
    prefix="/porfolio",
    tags=['Portfolio'],
    dependencies=[Depends(JWTBearer())]
)

@router.get("/specific_portfolio/{portfolio_id}", response_model=PortfolioResponse, response_model_exclude_none=True)
async def get_portfolio(portfolio_id: str):
    result = await PortfolioService.get_portfolio(portfolio_id)
    if result:
        return result
    else:
        return ResponseSchema(detail="Portfolio not found", result=None)

@router.get("/all_portfolios/{photographer_id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_all_portfolios(credentials: HTTPAuthorizationCredentials = Security(JWTBearer()), photographer_id: str = None):
    token = JWTRepo.extract_token(credentials)
    if 'email' not in token:
        return JSONResponse(status_code=403, content={"detail": "Missing email in token"})
    
    email = token['email']
    result = await PortfolioService.get_portfolios(photographer_id)
    if result:
        return ResponseSchema(detail="Successfully fetch data!", result=result)
    else:
        return ResponseSchema(detail="No portfolios found for the user", result=None)

@router.put("/update_portfolio/{portfolio_id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def update_portfolio(portfolio_id: str, request_body: PortfolioUpdateResponse, credentials: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token = JWTRepo.extract_token(credentials)
    if 'email' not in token:
        return JSONResponse(status_code=403, content={"detail": "Missing email in token"})
    
    email = token['email']
    await PortfolioService.update_portfolio(portfolio_id, request_body)
    return ResponseSchema(detail="Successfully update data!")

@router.post("/create_portfolio/{photographer_id}", response_model=ResponseSchema, response_model_exclude_none=True)
async def create_portfolio(request_body: CreatePortfolioSchema):
    new_portfolio = await PortfolioService.create_portfolio(request_body)
    #create new s3 bucket
    portfolio_id = new_portfolio.id
    s3_folder_key = f"{portfolio_id}/"
    s3_client = boto3.client('s3')
    s3_client.put_object(Bucket=S3_BUCKET_NAME, Key=s3_folder_key)
    return ResponseSchema(detail="Successfully create data!")


@router.post("/{portfolio_id}/upload_photo", response_model=ResponseSchema, response_model_exclude_none=True, status_code=201)
async def upload_photo(file: UploadFile , portfolio_id: str):
    print ("create endpoint ")
    #upload photo to s3
    s3 = boto3.resource('s3')
    bucket = s3.Bucket(S3_BUCKET_NAME)
    key = f"{portfolio_id}/{file.filename}"
    bucket.upload_fileobj(file.file, key)
    
    uploaded_file_url = f"https://{S3_BUCKET_NAME}.s3.amazonaws.com/{key}"
    #store photo url to database
    await PhotoService.create_photo(portfolio_id, uploaded_file_url)
    return ResponseSchema(detail="Successfully create data!", result=uploaded_file_url)

