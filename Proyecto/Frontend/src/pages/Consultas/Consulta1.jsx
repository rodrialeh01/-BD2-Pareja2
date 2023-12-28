import { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar/Sidebar";
import Service from "../../Service/Service";
import { useNavigate } from "react-router-dom";

export default function Consulta1() {
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  const Regresar = () => {
    navigate("/user/patients");
  };

  useEffect(() => {
    getConsulta1();
  }, [loading]);

  const getConsulta1 = async () => {
    try {
      let response = await Service.getConsulta1();
      if (response.status === 200) {
        setDatos(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex bg-gray-100 h-screen">
        <SideBar />
        <div className="p-7 flex-1 overflow-y-scroll scrollbar-hide border-l-2 border-white">
          <div className="flex justify-center items-center h-screen">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <caption class="p-5 text-2xl font-semibold text-left rtl:text-right text-azullog bg-white">
                  Total de pacientes que llegan a la clínica por edad y
                  catalogados
                  <div class="my-5 px-6">
                    <button
                      href="#"
                      class="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-red-600 hover:bg-red-800 hover:text-white"
                      onClick={Regresar}
                    >
                      Regresar
                    </button>
                  </div>
                </caption>

                <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                  <tr>
                    <th scope="col" class="px-6 py-3">No. </th>
                    <th scope="col" class="px-6 py-3">
                      Categoría
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Cantidad
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? null
                    : datos.map((dato, index) => (
                        <tr key={index} className="bg-azullog border-b">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-white whitespace-nowrap"
                          >{index+1}</th>
                          <td className="px-6 py-4 text-white">{dato._id}</td>
                          <td className="px-6 py-4 text-white">{dato.pacientes}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
