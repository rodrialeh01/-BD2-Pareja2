import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Service from "../../Service/Service";
import SideBar from "../../components/Sidebar/Sidebar";

const Profile = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem("id_user");
    const EditarPerfil = () => {
        navigate('/user/editprofile');
    }
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [edad, setEdad] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [correo, setCorreo] = useState('');
    const [web, setWeb] = useState('');
    const [foto, setFoto] = useState('');
    const [archivos, setArchivos] = useState([]);
    const [fileName, setFileName] = useState('Cargar PDF');
    const [pdf64, setPdf64] = useState('');
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);

    useEffect(() => {
        Service.getDoctor(id)
        .then((response) => {
            console.log(response.data);
            setNombre(response.data.nombre);
            setApellido(response.data.apellido);
            setUsuario(response.data.usuario);
            setEdad(response.data.edad);
            setEspecialidad(response.data.especialidad);
            setCorreo(response.data.correo);
            setWeb(response.data.web);
        });

        Service.getProfilePhoto(id)
        .then((response) => {
            console.log(response.data);
            setFoto(response.data.image);
        })

        Service.getPdfs(id)
        .then((response) => {
            console.log(response.data);
            setArchivos(response.data);
        })
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFileName(file.name);
            setPdf64(reader.result);
        };

        if (file) {
          reader.readAsDataURL(file);
        }
    };

    const handleCargarPdf = () => {
        if(fileName === 'Cargar PDF'){
            toast.error("No puedes cargar nada sin un archivo", {
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
        const data = {
            nombre: fileName,
            pdf: pdf64
        }
        Service.addPdf(id, data)
        .then((response) => {
            console.log(response);
            if(response.status === 200){
                toast.success("Se cargó el archivo correctamente", {
                    position: "upper-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const verMasPdf = (archivo) => {
        console.log(archivo);
        setSelectedPdf(archivo);
        setShowPdfModal(true);
    };
    
    const closeModal = () => {
    setShowPdfModal(false);
    setSelectedPdf(null);
    };
    return (
        <div className="flex bg-gray-100">
            <Toaster />
            <SideBar />
            <div className="p-7 flex-1 h-screen overflow-y-scroll scrollbar-hide border-l-2 border-white">
                <div class="container mx-auto my-16" id="infoperfil">
                    <div>
                        <div class="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto mt-n20">
                            <div class="flex justify-center">
                                <img src={`${foto}`} alt="" class="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" />
                            </div>

                            <div class="mt-16">
                                <h1 class="font-bold text-center text-3xl text-gray-900">{nombre + ' '+ apellido}</h1>
                                <p class="text-center text-sm text-gray-400 font-medium">{'@'+usuario}</p>
                                <p className="px-6 text-lg"><span className="font-bold">Edad: </span>{edad}</p>
                                <p className="px-6 text-lg"><span className="font-bold">Especialidad: </span>{especialidad}</p>
                                <p className="px-6 text-lg"><span className="font-bold">Correo Electrónico: </span>{correo}</p>
                                <p className="px-6 text-lg"><span className="font-bold">Sitio Web: </span><a href={`${web}`}>{web}</a></p>
                                <div class="my-5 px-6">
                                    <a href="#" class="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white" onClick={EditarPerfil}>Editar mi Perfil</a>
                                </div>

                                <div class="w-full">
                                    <h3 class="font-medium text-gray-900 text-left px-6 text-xl">Casos de pacientes que estoy trabajando</h3>
                                    <div class="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                                        {archivos.map((archivo, index) => (
                                            <div key={index} class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150 hover:cursor-pointer" onClick={() =>verMasPdf(archivo.pdfPacientes)}>
                                                <div class="flex items-center">
                                                    <div class="flex items-center">
                                                        {/* Icono del PDF */}
                                                        <span class="mr-2">
                                                            <img width="48" height="48" src="https://img.icons8.com/color/48/pdf.png" alt="pdf" />
                                                        </span>
                                                        {/* Nombre del PDF */}
                                                        <span class="text-sm font-medium">{archivo.nombre}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {showPdfModal && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      {/* Fondo oscuro detrás del modal */}
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      {/* Contenido del modal */}
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full">
        <div className="bg-white p-5" style={{ width: 'auto' }}>
          <div className="text-center">
            <button className="absolute top-0 right-0 m-3" onClick={closeModal}>
              &times;
            </button>
            {selectedPdf && (
              <div className="text-center">
                <button className="absolute top-0 right-0 m-3" onClick={closeModal}>
                  &times;
                </button>
                <div style={{ width: '100%', height: '700px' }}>
                  <object
                    data={selectedPdf}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                  >
                  </object>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
)}
                                    </div>
                                </div>
                            </div>
                            <label className="flex items-center border-2 py-2 px-3 rounded-2xl cursor-pointer bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-700" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                                <input className="hidden bg-white" 
                                        type="file" 
                                        accept="application/pdf" 
                                        capture="camera" 
                                        name="pdf_user" 
                                        id="pdf_user" 
                                        required
                                        onChange={handleFileChange}
                                        />
                                <span className="px-6 py-1 pl-2 outline-none border-none bg-white text-gray-500" style={{ pointerEvents: "none" }}>{fileName}</span>
                                </label>
                            <button class="my-5 ml-5 px-6 py-3 bg-black text-white rounded-lg" onClick={handleCargarPdf}>
                                Agregar PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;