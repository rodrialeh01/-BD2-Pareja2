import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000'
});

//-----------------------PLANTILLA DE METODOS PARA EL BACKEND-----------------------
// POST:
/*export const postExample = async (data) => {

    const response = await instance.post('ruta', data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return response;
}*/

// GET:
/*
export const getExample = async () => {
    const response = await instance.get('/ruta');
    return response;
}
*/

// Obtener a todos los demás doctores excepto a si mismo
export const getDoctoresButMe = async (id) => {
    const response = await instance.get(`/doctor/getDoctoresButMe/${id}`);
    return response;
}

// Obtener a los doctores amigos de amigos
export const getFriendsOfFriends = async (id) => {
    const response = await instance.get(`/doctor/getFriendsOfFriends/${id}`);
    return response;
}

// Obtener a todos mis amigos
export const getAmigos = async (id) => {
    const response = await instance.get(`/doctor/getAmigos/${id}`);
    return response;
}

// eliminar doctor que es amigo
export const deleteFriend = async (id, data) => {
    console.log(data);
    const response = await instance.delete(`/doctor/deleteFriend/${id}`, {
        data: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return response;
}

//obtener las solicitudes de amistad
export const getSolicitudes = async (id) => {
    const response = await instance.get(`/doctor/getSolicitudes/${id}`);
    return response;
}

// aceptar solicitud de amistad
export const aceptarSolicitud = async (id, data) => {
    const response = await instance.post(`/doctor/aceptarSolicitud/${id}`, data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return response;
}

// rechazar solicitud de amistad
export const rechazarSolicitud = async (id, data) => {
    const response = await instance.post(`/doctor/rechazarSolicitud/${id}`, data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return response;
}

// mandar solicitud de amistad
export const mandarSolicitud = async (id, data) => {
    const response = await instance.post(`/doctor/mandarSolicitud/${id}`, data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return response;
}


