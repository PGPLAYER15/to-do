import Cabecera from "../Cabecera/Cabecera";
import Fondo from "../Fondo/Fondo";
import Menu from "../Menu/Menu.jsx";

function Home(){ 
    return(
    <>
        <Fondo>
            <Cabecera/> 
            <Menu/>
        </Fondo>;
        
    </>
    )
}

export default Home;