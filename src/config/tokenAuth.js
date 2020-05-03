import clienteAxios from "./axios";

const tokenAuth = token => {
    //console.log(token + ' ' + 'el testeo en el tokenauthjs');
    if(token) {
        //console.log('aqui');
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    }else{
        //console.log('aca');
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;