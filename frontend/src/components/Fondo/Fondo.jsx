import styles from "./Fondo.module.css";

function Fondo({ children }) {

    return <div className={styles.fondo}>{children}</div>;
}

export default Fondo;