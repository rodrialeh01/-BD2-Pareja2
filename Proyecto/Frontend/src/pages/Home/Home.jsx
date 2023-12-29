import { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { FaRegNewspaper } from 'react-icons/fa';
import Service from '../../Service/Service';
import SideBar from "../../components/Sidebar/Sidebar";
import { obtenerFechaHoraActual } from '../../utils/index.js';
const Home = () => {
  const [contenido, setContenido] = useState('');
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('id_user');
    Service.getPublicaciones(id)
    .then((response) => {
      console.log(response.data);
      setPublicaciones(response.data);
    })
  }, []);

  const onChangeContenido = (e) => {
    setContenido(e.target.value);
  }

  const handlePublicar = () => {
    if(contenido.length === 0){
      toast.error("No puedes dejar una publicación vacia", {
        position: "upper-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        return;
    }
    const id = localStorage.getItem('id_user');
    console.log(obtenerFechaHoraActual())
    const data = {
      contenido: contenido,
      fechahora: obtenerFechaHoraActual()
    }
    console.log(data)

    Service.addPublicacion(id, data)
    .then((response) => {
      console.log(response);
      if(response.status === 200){
        window.location.reload();
      }
    })
  }

  console.log(publicaciones);
  return (
    <div className="flex bg-gray-100">
      <Toaster />
      <SideBar />
      <div className="p-7 flex-1 h-screen overflow-y-scroll scrollbar-hide border-l-2 border-white">
        <div className="max-w-4xl mx-auto mb-4">
          <div className="flex items-center justify-center bg-azullog text-white p-2">
            <FaRegNewspaper className="mr-2 text-2xl" />
            <span className="text-2xl font-semibold">Publicaciones</span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md relative">
          <textarea
            style={{ resize: 'none' }}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none resize: none text-base font-normal scrollbar-hide"
            rows="3"
            placeholder="Agrega una publicación!"
            onChange={onChangeContenido}
            value={contenido}
          ></textarea>

          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-azullog text-white px-4 py-2 rounded-md hover:bg-azuloscuro focus:outline-none text-base"
              onClick={handlePublicar}
              disabled={contenido.length === ''}
            >
              Publicar
            </button>
          </div>
        </div>
        <div>
        {publicaciones.map((publicacion, index) => (
            <div className="max-w-4xl mx-auto" key={index}>
              <div className="bg-white p-4 my-4 rounded-md shadow-md">
                <div className="flex items-start">
                  <img
                    src={publicacion.foto}
                    alt={`${publicacion.nombre}'s Photo`}
                    className="w-10 h-10 mr-2 rounded-full"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold">{`${publicacion.nombre}`}</h3>
                    <p className="text-gray-500 font-extralight text-sm">{`@${publicacion.username}`}</p>
                    <p className="text-gray-500 font-extralight text-xs">{publicacion.tiempo}</p>
                  </div>
                </div>
                <p className="mt-3 text-lg">{publicacion.contenido}</p>
              </div>
            </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Home;