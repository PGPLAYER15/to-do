from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.database import engine, Base, SessionLocal
from app.routes import boards, lists, cards
from app.models.board import Board
from app.models.list import List
from app.models.card import Card

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

# Configurar el evento de inicio
@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        if not db.query(Board).first():
            demo_board = Board(
                title="Mi Primer Tablero",
                description="Tablero de ejemplo creado automáticamente"
            )
            db.add(demo_board)
            db.commit()
            db.refresh(demo_board)
            
            lista_todo = List(title="Por Hacer", board_id=demo_board.id)
            lista_progreso = List(title="En Progreso", board_id=demo_board.id)
            lista_hecho = List(title="Hecho", board_id=demo_board.id)
            
            db.add_all([lista_todo, lista_progreso, lista_hecho])
            db.commit()
            
            tarjeta_1 = Card(title="Configurar proyecto", list_id=lista_todo.id)
            tarjeta_2 = Card(title="Diseñar interfaz", list_id=lista_todo.id)
            
            db.add_all([tarjeta_1, tarjeta_2])
            db.commit()
                        
    except Exception as e:
        print(f" Error al crear datos iniciales: {str(e)}")
        db.rollback()
    finally:
        db.close()

app.include_router(boards.router, prefix="/api/boards")
app.include_router(lists.router, prefix="/api/boards/{board_id}/lists")
app.include_router(cards.router, prefix="/api/cards")

@app.get("/")
def read_root():
    return {"message": "API de Trello Clone"}