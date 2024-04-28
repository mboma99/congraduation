from backend.app.model.product_type import ProductType
from backend.app.repository.base_repo import BaseRepo

class ProductTypeRepository(BaseRepo):
    model = ProductType