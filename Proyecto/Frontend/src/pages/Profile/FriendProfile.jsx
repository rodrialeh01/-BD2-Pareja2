
import { useParams } from 'react-router-dom';
import SideBar from "../../components/Sidebar/Sidebar";
const FriendProfile = () => {
    const { id } = useParams();
    console.log(id)

    return (
        <div className="flex bg-gray-100">
            <SideBar />
            <div className="p-7 flex-1 h-screen overflow-y-scroll scrollbar-hide border-l-2 border-white">
                <div class="container mx-auto my-16" id="infoperfil">
                    <div>
                        <div class="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto mt-n20">
                            <div class="flex justify-center">
                                <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
                            </div>

                            <div class="mt-16">
                                <h1 class="font-bold text-center text-3xl text-gray-900">Nombre Apellido</h1>
                                <p class="text-center text-sm text-gray-400 font-medium">@username</p>
                                <p className="px-6 text-lg"><span className="font-bold">Edad: </span>22</p>
                                <p className="px-6 text-lg"><span className="font-bold">Especialidad: </span>Cirujano</p>
                                <p className="px-6 text-lg"><span className="font-bold">Correo Electrónico: </span>correo@correo.com</p>
                                <p className="px-6 text-lg"><span className="font-bold">Sitio Web: </span><a href="www.web.com">www.web.com</a></p>

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendProfile;