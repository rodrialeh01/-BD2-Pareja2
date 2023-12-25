import { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar/Sidebar";
export default function SearchFriends() {
  const [medicos, setMedicos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [amigosdeamigos, setAmigosdeamigos] = useState([]);
  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    setMedicos([
      {
        nombreUsuario: "LisaMedica01",
        nombre: "Lisa",
        apellido: "Medicina",
        correo: "correo@medicina.com",
        edad: 28,
        especialidad: "Pediatría",
        foto: "https://eldoctor.pe/app/images/medico/perfil/imagen-medico.20201020181310.jpg",
      },
      {
        nombreUsuario: "LisaMedica02",
        nombre: "Maria",
        apellido: "Pediatra",
        correo: "correo2@medicina.com",
        edad: 29,
        especialidad: "Pediatría",
        foto: "https://eldoctor.pe/app/images/medico/perfil/imagen-medico.20201020181310.jpg",
      },
    ]);
  }, []);


  const filteredMedicos = medicos.filter((medico) => {
    return (medico.nombre.toLowerCase().includes(searchText.toLowerCase()) || medico.apellido.toLowerCase().includes(searchText.toLowerCase()));
  });

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
                  Buscar Amigos &nbsp;
                </h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <div className="md:flex md:items-center">
                <div className="">
                  <label
                    className="block text-black font-bold md:text-left mb-1 md:mb-0 text-md"
                    htmlFor="inline-full-name"
                  >
                    Nombre Completo:
                  </label>
                </div>
                <div className="w-full mr-[20px]">
                  <input
                    className="text-md bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    id="inline-full-name"
                    type="text"
                    name="nombreCompleto"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Nombre del médico"
                  ></input>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <h1 className="text-xl font-semibold text-[#040e5f] italic">
                {" "}
                De tu búsqueda:{" "}
              </h1>
            </div>
            <div className="w-full height-100 flex flex-wrap overflow-y-auto scrollbar-hide  justify-center mt-8">
              {filteredMedicos.map((medico) => (
                <div className="h-auto w-1/3 max-w-xs bg-white shadow-lg shadow-[#007ac2]/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3">
                  <div className="flex items-center justify-center">
                    <img
                      src={medico.foto}
                      alt="Imagen de Perfil"
                      className="w-48 h-48 rounded-lg"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="p-4 flex">
                      <h1 className="text-xl font-semibold text-gray-800">
                        {medico.nombre}&nbsp;
                      </h1>
                      <h1 className="text-xl font-semibold text-gray-800">
                        {medico.apellido}
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="p-2">
                      <h1 className="text-sm text-gray-800 font-mono">
                        {medico.correo}
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="p-2">
                      <h1 className="text-sm text-gray-800 italic">
                        Especialidad: {medico.especialidad}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className=" flex w-20 justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                      <button className="bg-green-500 hover:bg-green-700 transition duration-300 text-white font-bold py-2 px-4 rounded">
                        Ver Perfil
                      </button>
                      <button className="m-2 bg-[#007ac2] hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded">
                        Mandar Solicitud
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-5">
              <h1 className="text-xl font-semibold text-[#040e5f] italic">
                {" "}
                Sugerencias de amistad:{" "}
              </h1>
            </div>
            <div className="flex justify-center mt-5">
              <h2 className="text-xl font-semibold text-[#040e5f]">
                {" "}
                Amigos de Amigos:{" "}
              </h2>
            </div>
            <div className="w-full height-100 flex flex-wrap overflow-y-auto scrollbar-hide  justify-center mt-8">
              {medicos.map((medico) => (
                <div className="h-auto w-1/3 max-w-xs bg-white shadow-lg shadow-[#007ac2]/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3">
                  <div className="flex items-center justify-center">
                    <img
                      src={medico.foto}
                      alt="Imagen de Perfil"
                      className="w-48 h-48 rounded-lg"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="p-4 flex">
                      <h1 className="text-xl font-semibold text-gray-800">
                        {medico.nombre}&nbsp;
                      </h1>
                      <h1 className="text-xl font-semibold text-gray-800">
                        {medico.apellido}
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="p-2">
                      <h1 className="text-sm text-gray-800 font-mono">
                        {medico.correo}
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="p-2">
                      <h1 className="text-sm text-gray-800 italic">
                        Especialidad: {medico.especialidad}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className=" flex w-20 justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                      <button className="bg-green-500 hover:bg-green-700 transition duration-300 text-white font-bold py-2 px-4 rounded">
                        Ver Perfil
                      </button>
                      <button className="m-2 bg-[#007ac2] hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded">
                        Mandar Solicitud
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-5">
              <h2 className="text-xl font-semibold text-[#040e5f]">
                {" "}
                En el mismo campo que tú:{" "}
              </h2>
            </div>
            <div className="w-full height-100 flex flex-wrap overflow-y-auto scrollbar-hide  justify-center mt-8">
              {medicos.map((medico) => (
                <div className="h-auto w-1/3 max-w-xs bg-white shadow-lg shadow-[#007ac2]/50 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3">
                  <div className="flex items-center justify-center">
                    <img
                      src={medico.foto}
                      alt="Imagen de Perfil"
                      className="w-48 h-48 rounded-lg"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="p-4 flex">
                      <h1 className="text-xl font-semibold text-gray-800">
                        {medico.nombre}&nbsp;
                      </h1>
                      <h1 className="text-xl font-semibold text-gray-800">
                        {medico.apellido}
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="p-2">
                      <h1 className="text-sm text-gray-800 font-mono">
                        {medico.correo}
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="p-2">
                      <h1 className="text-sm text-gray-800 italic">
                        Especialidad: {medico.especialidad}
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className=" flex w-20 justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                      <button className="bg-green-500 hover:bg-green-700 transition duration-300 text-white font-bold py-2 px-4 rounded">
                        Ver Perfil
                      </button>
                      <button className="m-2 bg-[#007ac2] hover:bg-blue-800 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded">
                        Mandar Solicitud
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
