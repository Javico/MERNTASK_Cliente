import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({ tarea }) => {

    // Extraer proyecto de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener la funcion del state de tareas
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    // Si no hay proyecto seleccionado
    if (!proyecto) return null;

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // funcion que se ejecuta cuando el usuario hace click en eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual._id)
    }

    // funcion que modifica el estado de las tareas
    const cambiarEstado = tarea =>{
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        //console.log(tarea);
        actualizarTarea(tarea);
    }

    // Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea =>{
        guardarTareaActual(tarea);
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {
                    tarea.estado ?
                        <button type="button" className="completo" onClick={() => cambiarEstado(tarea)}>Completo</button>
                        :
                        <button type="button" className="incompleto" onClick={() => cambiarEstado(tarea)}>Incompleto</button>
                }
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-primario" onClick={() => seleccionarTarea(tarea)}>Editar</button>
                <button type="button" className="btn tbn-secundario" onClick={() => tareaEliminar(tarea._id)}>Eliminar</button>
            </div>
        </li>
    );
}

export default Tarea;