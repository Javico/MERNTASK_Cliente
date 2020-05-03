import React, {useContext, useEffect} from 'react';
import Barra from '../layout/Barra';
import Sidebar from '../layout/Sidebar';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';
import AuthContext from '../../context/authenticacion/authContext';


const Proyectos = () => {

    // Extraer la información de authenticacion
    const authContext = useContext(AuthContext);
    const {usuarioAuth} = authContext;

    useEffect(() => {
        usuarioAuth();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTarea />
                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Proyectos;