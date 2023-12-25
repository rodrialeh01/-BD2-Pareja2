import { FaRegNewspaper } from 'react-icons/fa';
import SideBar from "../../components/Sidebar/Sidebar";
const Home = () => {
  return (
    <div className="flex bg-gray-100">
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
          ></textarea>

          <div className="flex justify-between items-center mt-4">
            <button
              className="bg-azullog text-white px-4 py-2 rounded-md hover:bg-azuloscuro focus:outline-none text-base"
            >
              Publicar
            </button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-4 my-4 rounded-md shadow-md">
            <div className="flex items-start">
              <img
                src={'https://media.istockphoto.com/id/636379014/es/foto/manos-la-formaci%C3%B3n-de-una-forma-de-coraz%C3%B3n-con-silueta-al-atardecer.jpg?s=612x612&w=0&k=20&c=R2BE-RgICBnTUjmxB8K9U0wTkNoCKZRi-Jjge8o_OgE='}
                alt={`${'username'}'s Photo`}
                className="w-10 h-10 mr-2 rounded-full"
              />
              <div>
                <h3 className="text-2xl font-semibold">{'Nombre Apellido'}</h3>
                <p className="text-gray-500 font-extralight text-sm">{'@username'}</p>
                <p className="text-gray-500 font-extralight text-xs">{'24/12/2023'}</p>
              </div>
            </div>
            <p className="mt-3 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-4 my-4 rounded-md shadow-md">
            <div className="flex items-start">
              <img
                src={'https://media.istockphoto.com/id/636379014/es/foto/manos-la-formaci%C3%B3n-de-una-forma-de-coraz%C3%B3n-con-silueta-al-atardecer.jpg?s=612x612&w=0&k=20&c=R2BE-RgICBnTUjmxB8K9U0wTkNoCKZRi-Jjge8o_OgE='}
                alt={`${'username'}'s Photo`}
                className="w-10 h-10 mr-2 rounded-full"
              />
              <div>
                <h3 className="text-2xl font-semibold">{'Nombre Apellido'}</h3>
                <p className="text-gray-500 font-extralight text-sm">{'@username'}</p>
                <p className="text-gray-500 font-extralight text-xs">{'24/12/2023'}</p>
              </div>
            </div>
            <p className="mt-3 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-4 my-4 rounded-md shadow-md">
            <div className="flex items-start">
              <img
                src={'https://media.istockphoto.com/id/636379014/es/foto/manos-la-formaci%C3%B3n-de-una-forma-de-coraz%C3%B3n-con-silueta-al-atardecer.jpg?s=612x612&w=0&k=20&c=R2BE-RgICBnTUjmxB8K9U0wTkNoCKZRi-Jjge8o_OgE='}
                alt={`${'username'}'s Photo`}
                className="w-10 h-10 mr-2 rounded-full"
              />
              <div>
                <h3 className="text-2xl font-semibold">{'Nombre Apellido'}</h3>
                <p className="text-gray-500 font-extralight text-sm">{'@username'}</p>
                <p className="text-gray-500 font-extralight text-xs">{'24/12/2023'}</p>
              </div>
            </div>
            <p className="mt-3 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;