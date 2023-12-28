import { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar/Sidebar";
import Service from "../../Service/Service";
import { useNavigate } from "react-router-dom";
export default function MyFriends() {
  const navigate = useNavigate();

  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    getMedicos();
  }, []);

  const getMedicos = async () => {
    let id = "4:06debc2f-53ec-4333-9660-729ed9a6571f:1";
    try {
      let response = await Service.getAmigos(id);
      if (response.status === 200) {
        setMedicos(response.data);
      }
    } catch (error) {
    }
  }

  const handleDelete = async (idFriend) => {
    let data = {
      id: idFriend,
    };

    console.log(data);
    let id = "4:06debc2f-53ec-4333-9660-729ed9a6571f:1";
    try {
      let response = await Service.deleteFriend(id, data);
      console.log(response);
      if (response.status === 200) {
        getMedicos();
      }

    } catch (error) {
    }
  }

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
                  Mis Amigos &nbsp;
                </h1>
              </div>
            </div>

            <div className="w-full height-100 flex flex-wrap overflow-y-auto scrollbar-hide  justify-center mt-8">
              {medicos.map((medico) => (
                <div className="h-auto w-1/3 max-w-xs bg-white shadow-lg shadow-black/20 rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3">
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
                    <div className=" flex w-auto justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1">
                      <button className="bg-[#007ac2] hover:bg-blue-800 transition duration-300 text-white font-bold py-2 px-4 rounded"
                      onClick={() => navigate(`/user/profile/${medico.id}`)}
                      >
                        Ver Perfil
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 transition duration-300 text-white font-bold py-2 px-4 m-2 rounded"
                      onClick={() => handleDelete(medico.id)}
                      >
                        Eliminar
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
