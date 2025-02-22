from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import board as board_model
from app.schemas import board as board_schema
from app.models.database import get_db

router = APIRouter()

@router.get("/", response_model=list[board_schema.BoardResponse])
def read_boards(db: Session = Depends(get_db)):
    return board_model.get_boards(db)

@router.get("/{board_id}", response_model=board_schema.BoardResponse)
def read_board(board_id: int, db: Session = Depends(get_db)):
    board = board_model.get_board(db, board_id)
    if board is None:
        raise HTTPException(status_code=404, detail="Board not found")
    return board

@router.post("/", response_model=board_schema.BoardResponse)
def create_board(board: board_schema.BoardCreate, db: Session = Depends(get_db)):
    return board_model.create_board(db, board)

@router.delete("/{board_id}")
def delete_board(board_id: int, db: Session = Depends(get_db)):
    deleted_board = board_model.delete_board(db, board_id)
    if deleted_board is None:
        raise HTTPException(status_code=404, detail="Board not found")
    return {"message": "Board deleted successfully"}