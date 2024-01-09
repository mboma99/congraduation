from backend.app.model.person import Person
from backend.app.repository.base_repo import BaseRepo

class PersonRepository(BaseRepo):
    model = Person