from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.models.database import Base
from sqlalchemy.orm import Session, joinedload
from app.schemas.board import BoardCreate
from .list import List

def get_boards(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Board)
        .options(
            joinedload(Board.lists)
            .joinedload(List.cards)
        )
        .offset(skip)
        .limit(limit)
        .all()
    )

def get_board(db: Session, board_id: int):
    return (
        db.query(Board)
        .options(
            joinedload(Board.lists)
            .joinedload(List.cards)
        )
        .filter(Board.id == board_id)
        .first()
    )

def create_board(db: Session, board: BoardCreate):
    db_board = Board(**board.dict())
    db.add(db_board)
    db.commit()
    db.refresh(db_board)
    return db_board

def delete_board(db: Session, board_id: int):
    db_board = db.query(Board).get(board_id)
    if db_board:
        db.delete(db_board)
        db.commit()
        return True
    return False

class Board(Base):
    __tablename__ = "boards"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(String(500), nullable=True)

    # Relación con Listas (incluyendo cascade delete)
    lists = relationship(
        "List", 
        back_populates="board",
        cascade="all, delete-orphan",
        lazy="joined",
        order_by="List.id"
    )

    def __repr__(self):
        return f"<Board(id={self.id}, title='{self.title}')>"