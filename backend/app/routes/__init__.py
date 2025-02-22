# Exporta los routers para facilitar su inclusión en main.py
from .boards import router as boards_router
from .lists import router as lists_router
from .cards import router as cards_router

__all__ = ["boards_router", "lists_router", "cards_router"]