from typing import List, Optional
from pydantic import BaseModel
from .list import ListResponse  # Asegúrate de tener este esquema

class BoardBase(BaseModel):
    title: str
    description: Optional[str] = None

class BoardCreate(BoardBase):
    pass

class BoardResponse(BoardBase):
    id: int
    lists: List[ListResponse] = []

    class Config:
        orm_mode = True