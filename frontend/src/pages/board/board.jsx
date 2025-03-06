import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cabecera from "../../components/Cabecera/Cabecera.jsx";
import Fondo from "../../components/Fondo/Fondo.jsx";
import Menu from "../../components/Menu/Menu.jsx";
import Tablero from "../../components/Tablero/Tablero.jsx";

function Board() {
    const { id } = useParams();



    return (
        <Fondo>
            <Cabecera />
            <Menu />
            <Tablero id={id} >
                
            </Tablero>
        </Fondo>
    );
}

export default Board;