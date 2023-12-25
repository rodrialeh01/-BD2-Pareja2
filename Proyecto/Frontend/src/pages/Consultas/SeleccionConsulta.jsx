import { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router";
export default function Consulta() {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <>
      <div className="flex h-screen flex bg-gray-100 ">
        <SideBar />
        <div className="flex flex-col border-l-2 border-white w-full">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="mt-5 flex flex-col items-center justify-center">
              <div className="flex items-center">
                {/*Busqueda y esas cosas*/}

                <h1 className="text-3xl font-bold text-black">
                  CONSULTAS &nbsp;
                </h1>
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <h1 className="text-xl font-semibold text-[#040e5f] italic">
                {" "}
                Selecciona la consulta a realizar:{" "}
              </h1>
            </div>

            <div className="w-full height-100  flex  flex-wrap gap-4 justify-center mt-8">
              <div className="h-auto max-w-xs bg-white shadow-lg shadow-gray-500/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3 flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://cdn.stocksnap.io/img-thumbs/960w/health-care_LGAOALQUVQ.jpg"
                    alt="Imagen de Perfil"
                    className="w-48 h-48 rounded-lg object-contain object-center border-2 border-gray-300 bg-gray-200"
                  />
                </div>
                <div className="flex items-center justify-center py-4">
                  <h1 className="text-xl font-semibold text-gray-800 text-center">
                    Total de pacientes que llegan a la clínica por edad y
                    catalogados
                  </h1>
                </div>

                <div className="flex items-center justify-center">
                  <div className=" flex w-20 justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                    <button className="m-2 bg-[#007ac2] hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate("/user/consulta1")}
                    >
                      Realizar Consulta
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-auto max-w-xs bg-white shadow-lg shadow-gray-500/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3 flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://media.istockphoto.com/id/1298375809/photo/empty-luxury-modern-hospital-room.jpg?s=612x612&w=0&k=20&c=COJYNIiGvKfgiNITdE2IZmHo31tzUewK64jwuv8glgA="
                    alt="Imagen de Perfil"
                    className="w-48 h-48 rounded-lg object-contain object-center border-2 border-gray-300 bg-gray-200"
                  />
                </div>
                <div className="flex items-center justify-center py-4">
                  <h1 className="text-xl font-semibold text-gray-800 text-center">
                    Cantidad de pacientes que pasan por cada habitación
                  </h1>
                </div>

                <div className="flex items-center justify-center">
                  <div className=" flex w-20 justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                    <button className="m-2 bg-[#007ac2] hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate("/user/consulta2")}
                    >
                      Realizar Consulta
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-auto max-w-xs bg-white shadow-lg shadow-gray-500/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3 flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://media.istockphoto.com/id/1425453868/photo/doctor-healthcare-and-medical-man-and-woman-with-smile-and-confident-leadership-at-hospital.jpg?s=612x612&w=0&k=20&c=nKVToYMCVegefWd48PHY3Z3eIXYtrtYdzXE0iOlNIBM="
                    alt="Imagen de Perfil"
                    className="w-48 h-48 rounded-lg object-contain object-center border-2 border-gray-300 bg-gray-200"
                  />
                </div>
                <div className="flex items-center justify-center py-4">
                  <h1 className="text-xl font-semibold text-gray-800 text-center">
                    Cantidad de pacientes que llegan a la clínica por género
                  </h1>
                </div>

                <div className="flex items-center justify-center">
                  <div className=" flex w-20 justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                    <button className="m-2 bg-[#007ac2] hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate("/user/consulta3")}
                    >
                      Realizar Consulta
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full height-100 flex flex-wrap gap-4 justify-center mt-8">
              <div className="h-auto max-w-xs bg-white shadow-lg shadow-gray-500/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3 flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://media.istockphoto.com/id/504458834/photo/pediatrician-visiting-father-and-child-in-hospital-bed.jpg?s=612x612&w=0&k=20&c=Dlk1MWXjTo4n8lx1hbW09N68lIkeVqM0rKLVjN11Gsk="
                    alt="Imagen de Perfil"
                    className="w-48 h-48 rounded-lg object-contain object-center border-2 border-gray-300 bg-gray-200"
                  />
                </div>
                <div className="flex items-center justify-center py-4">
                  <h1 className="text-xl font-semibold text-gray-800 text-center">
                    Top 5 edades más atendidas en la clínica
                  </h1>
                </div>

                <div className="flex items-center justify-center">
                  <div className=" flex w-20 justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                    <button className="m-2 bg-[#007ac2] hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate("/user/consulta4")}
                    >
                      Realizar Consulta
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-auto max-w-xs bg-white shadow-lg shadow-gray-500/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3 flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://www.shutterstock.com/image-photo/confident-specialist-holding-digital-tablet-600nw-2244302319.jpg"
                    alt="Imagen de Perfil"
                    className="w-48 h-48 rounded-lg object-contain object-center border-2 border-gray-300 bg-gray-200"
                  />
                </div>
                <div className="flex items-center justify-center py-4">
                  <h1 className="text-xl font-semibold text-gray-800 text-center">
                    Top 5 edades menos atendidas en la clínica
                  </h1>
                </div>

                <div className="flex items-center justify-center">
                  <div className=" flex w-20 justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                    <button className="m-2 bg-[#007ac2] hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate("/user/consulta5")}
                    >
                      Realizar Consulta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
