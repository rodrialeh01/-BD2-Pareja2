import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import SideBar from "../../components/Sidebar/Sidebar";
const Profile = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem("id_user");
    const EditarPerfil = () => {
        navigate('/user/editprofile');
    }
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [edad, setEdad] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [correo, setCorreo] = useState('');
    const [web, setWeb] = useState('');
    const [foto, setFoto] = useState('');

    useEffect(() => {
        Service.getDoctor(id)
        .then((response) => {
            console.log(response.data);
            setNombre(response.data.nombre);
            setApellido(response.data.apellido);
            setUsuario(response.data.usuario);
            setEdad(response.data.edad);
            setEspecialidad(response.data.especialidad);
            setCorreo(response.data.correo);
            setWeb(response.data.web);
        });

        Service.getProfilePhoto(id)
        .then((response) => {
            console.log(response.data);
            setFoto(response.data.image);
        })
    }, []);

    return (
        <div className="flex bg-gray-100">
            <SideBar />
            <div className="p-7 flex-1 h-screen overflow-y-scroll scrollbar-hide border-l-2 border-white">
                <div class="container mx-auto my-16" id="infoperfil">
                    <div>
                        <div class="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto mt-n20">
                            <div class="flex justify-center">
                                <img src={`${foto}`} alt="" class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
                            </div>

                            <div class="mt-16">
                                <h1 class="font-bold text-center text-3xl text-gray-900">{nombre + ' '+ apellido}</h1>
                                <p class="text-center text-sm text-gray-400 font-medium">{'@'+usuario}</p>
                                <p className="px-6 text-lg"><span className="font-bold">Edad: </span>{edad}</p>
                                <p className="px-6 text-lg"><span className="font-bold">Especialidad: </span>{especialidad}</p>
                                <p className="px-6 text-lg"><span className="font-bold">Correo Electrónico: </span>{correo}</p>
                                <p className="px-6 text-lg"><span className="font-bold">Sitio Web: </span><a href={`${web}`}>{web}</a></p>
                                <div class="my-5 px-6">
                                    <a href="#" class="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white" onClick={EditarPerfil}>Editar mi Perfil</a>
                                </div>

                                <div class="w-full">
                                    <h3 class="font-medium text-gray-900 text-left px-6 text-xl">Casos de pacientes que estoy trabajando</h3>
                                    <div class="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                                        <a href="#" class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                            <div class="flex items-center">
                                                <div class="flex items-center">
                                                    {/* Icono del PDF */}
                                                    <span class="mr-2">
                                                        <img width="48" height="48" src="https://img.icons8.com/color/48/pdf.png" alt="pdf" />
                                                    </span>
                                                    {/* Nombre del PDF */}
                                                    <span class="text-sm font-medium">nombre_del_pdf.pdf</span>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="#" class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                            <div class="flex items-center">
                                                <div class="flex items-center">
                                                    {/* Icono del PDF */}
                                                    <span class="mr-2">
                                                        <img width="48" height="48" src="https://img.icons8.com/color/48/pdf.png" alt="pdf" />
                                                    </span>
                                                    {/* Nombre del PDF */}
                                                    <span class="text-sm font-medium">nombre_del_pdf.pdf</span>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="#" class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                            <div class="flex items-center">
                                                <div class="flex items-center">
                                                    {/* Icono del PDF */}
                                                    <span class="mr-2">
                                                        <img width="48" height="48" src="https://img.icons8.com/color/48/pdf.png" alt="pdf" />
                                                    </span>
                                                    {/* Nombre del PDF */}
                                                    <span class="text-sm font-medium">nombre_del_pdf.pdf</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <button class="my-5 ml-5 px-6 py-3 bg-black text-white rounded-lg">
                                Agregar PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;