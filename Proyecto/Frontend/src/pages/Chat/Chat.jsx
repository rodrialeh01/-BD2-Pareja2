import { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar/Sidebar";
import Service from "../../Service/Service";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);

  const Regresar = () => {
    navigate("/user/patients");
  };

  useEffect(() => {
    getMedicosAmigos();
  }, [loading]);

  const getMedicosAmigos = async () => {
    let id = "4:06debc2f-53ec-4333-9660-729ed9a6571f:1";
    try {
      let response = await Service.getAmigos(id);
      if (response.status === 200) {
        setMedicos(response.data);
        setLoading(false);
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="flex bg-gray-100 h-screen">
        <SideBar />
        <div className="p-7 flex-1 overflow-y-scroll scrollbar-hide border-l-2 border-white">
          <div className="flex justify-center items-center ">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <caption class="p-5 text-2xl font-semibold text-left rtl:text-right text-azullog bg-white">
                  Mensajería
                </caption>

                <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                  <tr>
                    <th scope="col" class="px-6 py-3"></th>
                    <th scope="col" class="px-6 py-3"></th>
                    <th scope="col" class="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? null
                    : medicos.map((dato, index) => (
                        <tr key={index} className="bg-azullog border-b">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-white whitespace-nowrap"
                          >
                            <td className="px-3 py-1 text-white">
                              <img
                                className="h-24 w-24 rounded-full"
                                src={dato.foto}
                                alt="imagen"
                              ></img>
                            </td>
                          </th>
                          <td className="text-white">
                            <p className="text-white text-2xl font-semibold">
                              {dato.nombre + " " + dato.apellido}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-white">
                            <button
                              href="#"
                              className="text-gray-200 inline-block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-red-600 hover:bg-red-800 hover:text-white"
                              onClick={Regresar}
                            >
                              Ver Chat
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 inline-block ml-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                                />
                              </svg>
                            </button>
                          </td>
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
