import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/authenticacion/authContext';


const Barra = () => {

    // Extraer la información de authenticacion
    const authContext = useContext(AuthContext);
    const {usuario ,usuarioAuth, cerrarSesion} = authContext;

    useEffect(() => {
        usuarioAuth();
        // eslint-disable-next-line
    }, []);

    return (
        <header className="app-header">
            { usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span> </p> : null }
            {/* <p className="nombre-usuario">JAvico</p> */}
            <nav className="nav-principal">
                {/* <a href="#!">Cerrar sesión</a> */}
                <button className="btn btn-blank cerrar-sesion"
                    onClick={ () => cerrarSesion()}
                >Cerrar sesión</button>
            </nav>
        </header>
    );
}

export default Barra;