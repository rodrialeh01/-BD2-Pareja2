import { useNavigate } from "react-router-dom";
import SideBar from "../../components/Sidebar/Sidebar";
import Service from "../../Service/Service";
import { useEffect, useState } from "react";

const Consulta4 = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  const Regresar = () => {
    navigate("/user/patients");
  };

  useEffect(() => {
    getConsulta4();
  }, [loading]);

  const getConsulta4 = async () => {
    try {
      let response = await Service.getConsulta4();
      console.log(response);
      if (response.status === 200) {
        setDatos(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-gray-100">
      <SideBar />
      <div className="p-7 flex-1 h-screen overflow-y-scroll scrollbar-hide border-l-2 border-white">
        <div className="flex justify-center items-center h-screen">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
              <caption class="p-5 text-2xl font-semibold text-left rtl:text-right text-azullog bg-white">
                Top 5 edades más atendidas en la clínica
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
              {loading ? null : (
              datos.map((dato, index) => (
                <tr key={index} className="bg-azullog border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 text-white">{dato._id}</td>
                  <td className="px-6 py-4 text-white">{dato.count}</td>
                </tr>
              ))
            )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consulta4;
