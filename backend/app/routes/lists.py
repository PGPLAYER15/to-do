from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.list import List
from app.models.board import Board  # Necesario para validar que el board_id existe
from app.schemas.list import ListCreate, ListResponse

router = APIRouter()

@router.post("/", response_model=ListResponse, status_code=status.HTTP_201_CREATED)
def create_list(list_data: ListCreate, db: Session = Depends(get_db)):
    db_board = db.query(Board).filter(Board.id == list_data.board_id).first()
    if not db_board:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tablero no encontrado"
        )
    
    # Crear la lista
    db_list = List(**list_data.dict())
    db.add(db_list)
    db.commit()
    db.refresh(db_list)
    return db_list

@router.get("/", response_model=list[ListResponse])
def get_lists_by_board(board_id: int, db: Session = Depends(get_db)):
    print(f"Fetching lists for board_id: {board_id}")
    lists = db.query(List).filter(List.board_id == board_id).all()
    print(f"Lists found: {lists}")
    return lists

@router.get("/{list_id}", response_model=ListResponse)
def get_listbyid(list_id: int, db: Session = Depends(get_db)):
    db_list = db.query(List).filter(List.id == list_id).first()
    if not db_list:
        raise HTTPException(status_code=404, detail="Lista no encontrada")
    return db_list

@router.put("/{list_id}", response_model=ListResponse)
def update_list(list_id: int, list_data: ListCreate, db: Session = Depends(get_db)):
    db_list = db.query(List).filter(List.id == list_id).first()
    if not db_list:
        raise HTTPException(status_code=404, detail="Lista no encontrada")
    
    for key, value in list_data.dict().items():
        setattr(db_list, key, value)
    
    db.commit()
    db.refresh(db_list)
    return db_list

@router.delete("/{list_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_list(list_id: int, db: Session = Depends(get_db)):
    db_list = db.query(List).filter(List.id == list_id).first()
    if not db_list:
        raise HTTPException(status_code=404, detail="Lista no encontrada")
    
    db.delete(db_list)
    db.commit()
    return