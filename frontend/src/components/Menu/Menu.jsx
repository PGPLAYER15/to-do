import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import styles from './Menu.module.css';
import MenuIcon from '../../assets/logomenu.svg';
import CloseIcon from '../../assets/cerrar_logo.svg';
import clsx from 'clsx';
import { FiSettings, FiLayers } from "react-icons/fi";

function Menu() {
    const navigate = useNavigate();
    const location = useLocation();

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
                    onClick={(e) => {
                        e.preventDefault();
                        console.log('Configuración');
                    }}
                >
                    <FiSettings 
                        alt="Icono de configuracion"
                        aria-hidden="true"
                        className={styles.iconsItem}
                    />
                    
                    {menuState.isOpen && <span>Configuración</span>}
                </button>

                {location.pathname !== '/' && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/');
                        }}
                        className={styles.menuItem}
                        role='menuitem'
                    >
                        <FiLayers
                            alt="Icono de tableros"
                            aria-hidden="true"
                            className={styles.iconsItem}
                        />

                        {menuState.isOpen && <span>Tableros</span>}
                    </button>
                )}
            </div>
            
        </nav>
    );
}

export default Menu;