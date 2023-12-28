import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Service from '../../Service/Service';
import SideBar from "../../components/Sidebar/Sidebar";
const EditProfile = () => {
    const navigate = useNavigate();
    const Regresar = () => {
        navigate('/user/myprofile');
    }
    const id = localStorage.getItem("id_user");
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [username, setUsername] = useState('');
    const [edad, setEdad] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [web, setWeb] = useState('');

    useEffect(() => {
        Service.getDoctor(id)
        .then((response) => {
            setNombres(response.data.nombre);
            setApellidos(response.data.apellido);
            setUsername(response.data.usuario);
            setEdad(response.data.edad);
            setEspecialidad(response.data.especialidad);
            setWeb(response.data.web);
        });
    }, []);

    const handleSubmit = async (e) => {
		e.preventDefault();
	};

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangeWeb = (e) => {
        setWeb(e.target.value);
    }

    const handleModificar = () => {
        const data = {
            id: id,
            username: username,
            web: web,
        };
        console.log(data);
        Service.updateDoctor(data)
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                navigate('/user/myprofile');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="flex bg-gray-100">
            <SideBar />
            <div className="p-7 flex-1 h-screen overflow-y-scroll scrollbar-hide border-l-2 border-white">
                <div className="flex justify-center items-center h-screen">
                    <form class="w-full max-w-lg " onSubmit={handleSubmit}>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Nombres
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-azullog rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Nombres" disabled value={nombres}/>
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Apellidos
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-azullog rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Apellidos" disabled value={apellidos}/>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Nombre de Usuario
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-azullog rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Nombre de Usuario" onChange={onChangeUsername} value={username} />
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Edad
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-azullog rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="Edad" disabled value={edad} />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    Sitio Web
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-azullog rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="url" placeholder="Sitio Web" onChange={onChangeWeb} value={web} />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    Especialidad
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-azullog rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Especialidad" disabled value={especialidad}/>
                            </div>
                        </div>
                        <div class="my-5 px-6">
                            <a href="#" class="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white" onClick={handleModificar}>Modificar mis datos</a>
                        </div>
                        <div class="my-5 px-6">
                            <a href="#" class="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-red-600 hover:bg-red-800 hover:text-white" onClick={Regresar}>Regresar</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;