import React, {useContext, useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/authenticacion/authContext'

const RutaPrivada = ({component: Component, ...props}) => {
    const authContext = useContext(AuthContext);
    const {authenticado, cargando, usuarioAuth} = authContext;

    useEffect(() => {
        usuarioAuth();
        // eslint-disable-next-line
    }, [])

    return (
        <Route
            {...props} render={props => !authenticado && !cargando ? (
                <Redirect to="/" />
            ) : (
                <Component {...props} />
            )}
        >
        </Route>
    );
}

export default RutaPrivada;
