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

//Registro de doctores
export const registroDoctor = async (data) => {
    const response = await instance.post('/auth/registrar', data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return response;
}

//Inicio de sesión de un doctor
export const loginDoctor = async (data) => {
    const response = await instance.post('/auth/login', data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return response;
}

// Obtener a todos los demás doctores excepto a si mismo
export const getDoctoresButMe = async (id) => {
    const response = await instance.get(`/doctor/getDoctoresButMe/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        }
    
    });
    return response;
}

// Obtener a los doctores amigos de amigos
export const getFriendsOfFriends = async (id) => {
    const response = await instance.get(`/doctor/getFriendsOfFriends/${id}`, {
        headers: {
            'Cache-Control': 'no-cache'
        }
    });
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

// obtener un doctor por su id
export const getDoctor = async (id) => {
    const response = await instance.get(`/doctor/getDoctor/${id}`);
    return response;
}

//Obtener la foto de perfil de un doctor
export const getProfilePhoto = async (id) => {
    const response = await instance.get(`/doctor/getPhoto/${id}`, {
        headers: {
            'Cache-Control': 'no-cache'
        }
    });
    return response;
}

export const updateDoctor = async (data) => {
    const response = await instance.put(`/doctor/update`, data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return response;
}

// Revisar si somos amigos
export const areWeFriends = async (id, data) => {
    const response = await instance.get(`/doctor/areWeFriends/${id}/${data}`);
    return response;
}


// Consultas:
export const getConsulta1 = async (id) => {
    const response = await instance.get(`/consultas/getConsulta1`);
    return response;
}

export const getConsulta2 = async (id) => {
    const response = await instance.get(`/consultas/getConsulta2`);
    return response;
}

export const getConsulta3 = async (id) => {
    const response = await instance.get(`/consultas/getConsulta3`);
    return response;
}

export const getConsulta4 = async (id) => {
    const response = await instance.get(`/consultas/getConsulta4`);
    return response;
}

export const getConsulta5 = async (id) => {
    const response = await instance.get(`/consultas/getConsulta5`);
    return response;
}

// getChat
export const getChat = async (id, data) => {
    const response = await instance.post(`/mensaje/getChat/${id}`, data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
}

// Crear una publicación
export const addPublicacion = async (id, data) => {
    const response = await instance.post(`/publicacion/publicar/${id}`, data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return response;
}
// Obtener las publicaciones de un doctor
export const getPublicaciones = async (id) => {
    const response = await instance.get(`/publicacion/getPublicaciones/${id}`);
    return response;
}

// insertMessage
export const insertMessage = async (data) => {
    const response = await instance.post(`/mensaje/insertMessage`, data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    return response;
}