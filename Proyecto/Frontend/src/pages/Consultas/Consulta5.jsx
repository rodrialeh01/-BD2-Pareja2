import { useNavigate } from 'react-router-dom';
import SideBar from "../../components/Sidebar/Sidebar";
const Consulta5 = () => {
    const navigate = useNavigate();
    const Regresar = () => {
        navigate('/user/patients')
    }
    return (
        <div className="flex bg-gray-100">
            <SideBar />
            <div className="p-7 flex-1 h-screen overflow-y-scroll scrollbar-hide border-l-2 border-white">
                <div className="flex justify-center items-center h-screen">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                            <caption class="p-5 text-2xl font-semibold text-left rtl:text-right text-azullog bg-white">
                                Top 5 edades menos atendidas en la clínica
                                <div class="my-5 px-6">
                                    <button href="#" class="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-red-600 hover:bg-red-800 hover:text-white" onClick={Regresar}>Regresar</button>
                                </div>
                            </caption>

                            <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        No.
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Edad
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Cantidad Frecuentada
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-azullog border-b ">
                                    <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap ">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td class="px-6 py-4 text-white">
                                        Silver
                                    </td>
                                    <td class="px-6 py-4 text-white">
                                        Laptop
                                    </td>
                                </tr>
                                <tr class="bg-azullog border-b ">
                                    <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap ">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td class="px-6 py-4 text-white">
                                        Silver
                                    </td>
                                    <td class="px-6 py-4 text-white">
                                        Laptop
                                    </td>
                                </tr>
                                <tr class="bg-azullog border-b ">
                                    <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap ">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td class="px-6 py-4 text-white">
                                        Silver
                                    </td>
                                    <td class="px-6 py-4 text-white">
                                        Laptop
                                    </td>
                                </tr>
                                <tr class="bg-azullog border-b ">
                                    <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap ">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td class="px-6 py-4 text-white">
                                        Silver
                                    </td>
                                    <td class="px-6 py-4 text-white">
                                        Laptop
                                    </td>
                                </tr>
                                <tr class="bg-azullog border-b ">
                                    <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap ">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td class="px-6 py-4 text-white">
                                        Silver
                                    </td>
                                    <td class="px-6 py-4 text-white">
                                        Laptop
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Consulta5;