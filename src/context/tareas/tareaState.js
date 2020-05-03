import React, {useReducer} from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios'
//import uuid from 'uuid';
import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    //ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {
    const initialState = {
        // tareas: [
        //     {id:1, nombre: 'Elegir plataforma', estado: true, proyectoId: 1 },
        //     {id:2, nombre: 'Elegir colores', estado: false, proyectoId: 2 },
        //     {id:3, nombre: 'Elegir plataformas de pago', estado: false, proyectoId: 3 },
        //     {id:4, nombre: 'Elegir hosting', estado: true, proyectoId: 4 },
        //     {id:5, nombre: 'Elegir plataforma', estado: true, proyectoId: 4 },
        //     {id:6, nombre: 'Elegir colores', estado: false, proyectoId: 3 },
        //     {id:7, nombre: 'Elegir plataformas de pago', estado: false, proyectoId: 2 },
        //     {id:8, nombre: 'Elegir hosting', estado: true, proyectoId: 1 }
        // ],
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    // Crear las funciones

    //Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});
            //console.log(resultado);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea =>{
        //tarea.id = uuid.v4();
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);

            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Valid y muestra un error en caso de que sea necesario
    const validarTarea = () =>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Eliminar tarea por id
    const eliminarTarea = async (id,proyecto) =>{
        try {
            await clienteAxios.delete(`/api/tareas/${id}`,{params: {proyecto}})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        } catch (error) {
            console.log(error);
        }
    }

    // // Cambia el estado de cada tarea
    // const cambiarEstadoTarea = tarea =>{
    //     dispatch({
    //         type: ESTADO_TAREA,
    //         payload: tarea
    //     })
    // }

    // Edita o modifica una tarea
    const actualizarTarea = async tarea => {

        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            // console.log(resultado.data.tarea);
            // console.log(resultado.data);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data
            });
        } catch (error) {
            console.log(error);
        }
    }

    //Extrae una tarea para edicion
    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // Elimina la tareaselecionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return(
        <TareaContext.Provider
            value={{
                //tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                //cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;