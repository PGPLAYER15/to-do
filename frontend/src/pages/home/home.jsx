import Cabecera from "../../components/Cabecera/Cabecera.jsx";
import Fondo from "../../components/Fondo/Fondo.jsx";
import Menu from "../../components/Menu/Menu.jsx";
import styles from "../home/home.module.css";
import Btn_crear from "../../components/Btn_crear/Btn_crear.jsx";


function Home(){ 
    return(
    <>
        <Fondo>
            <Cabecera/>
            <div style={{display: "flex"}}>
                <Menu/> 
                <div className={styles.contenedor}>
                    <Btn_crear/> 
                </div>
            </div> 
        </Fondo>;
        
    </>
    )
}

export default Home;