import React, {useContext, useState, useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {

    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener la funcion del state de tareas
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada);
        }else{
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])

    // State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    // Extraer el nombre del proyecto
    const {nombre} = tarea;

    // Si no hay proyecto seleccionado
    if(!proyecto) return null;

    // Array destructurin para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();

        // Validando
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        // revisar si es edicion o si es nueva tarea
        if(tareaseleccionada === null){
            // Agregar nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            //tarea.estado = false;
            agregarTarea(tarea);
        }else{
            // actualizar tarea existente
            actualizarTarea(tarea);

            // Eliimina tareaseleccionada del state
            limpiarTarea();
        }

        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id);

        // reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }


    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value = {nombre}
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar tarea' : 'Agregar tarea'}
                    ></input>
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
}

export default FormTarea;