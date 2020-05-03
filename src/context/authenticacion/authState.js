import React, {useReducer} from 'react';
import AuthContext from '../authenticacion/authContext';
import AuthReducer from '../authenticacion/authReducer';
import clienteAxios from '../../config/axios';

import { 
    REGISTRO_EXISTOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from "../../types";
import tokenAuth from '../../config/tokenAuth';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Funciones

    // Crear usuario
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios',datos);
            //console.log(respuesta.data);

            dispatch({
                type: REGISTRO_EXISTOSO,
                payload: respuesta.data
            });
            
            // Obtener usuario
            usuarioAuth();
        } catch (error) {
            console.log(error.response.data.msg);

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
    }

    // Retorna el usuario authenticado
    const usuarioAuth = async () => {
        const token = localStorage.getItem('token');
        //console.log(token +  ' ' +  'el test');
        if(token){
            // TODO: funcion para enviar el token por headers
            tokenAuth(token);
        }
        //console.log('por aca');
        try {
            const respuesta = await clienteAxios.get('/api/auth');
            //console.log(respuesta.data);
            //console.log('algo aqui');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    // Cuando el usuario incia sesion
    const inciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            //console.log(respuesta);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });
            //console.log('hola');
            usuarioAuth();
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    // Cierra la sesión del usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticado: state.authenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                inciarSesion,
                usuarioAuth,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;