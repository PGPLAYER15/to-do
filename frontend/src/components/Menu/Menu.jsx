import { useState,useEffect, useRef } from 'react';
import styles from './Menu.module.css'
import  ConfigIcon  from '../../assets/confi_logo.svg';
import MenuIcon from '../../assets/logomenu.svg';
import CloseIcon from '../../assets/cerrar_logo.svg';
import clsx from 'clsx';


function Menu() {

    const [menuState, setMenuState] = useState({
        isOpen: false,
        activeItem: null
    });
    
    const toggleMenu = () => {
        setMenuState(prev => ({
            ...prev,
            isOpen: !prev.isOpen
        }));
    };

    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuState(prev => ({ ...prev, isOpen: false }));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav 
            ref={menuRef}
            aria-label="Menú principal" 
            className={clsx(styles.menuContainer, {
                [styles.menuOpen]: menuState.isOpen
            })}
        >
            <button
                onClick={toggleMenu}
                aria-label={menuState.isOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuState.isOpen}
                aria-controls="menu-content"
                className={styles.menuButton}
            >
                <img 
                    src={menuState.isOpen ? CloseIcon : MenuIcon} 
                    alt="" 
                    aria-hidden="true"
                />
                {menuState.isOpen && (
                    <span className={styles.buttonText}>Cerrar</span>
                )}
            </button>
    
            <div 
                id="menu-content"
                role="menu"
                className={styles.menuContent}
            >
                <button 
                    role="menuitem"
                    className={styles.menuItem}
                    onClick={() => console.log('Configuración')}
                >
                    <img 
                        src={ConfigIcon} 
                        alt="Icono de configuración" 
                        aria-hidden="true"
                    />
                    {menuState.isOpen && <span>Configuración</span>}
                </button>
            </div>
        </nav>
    );
}

export default Menu;