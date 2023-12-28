import { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import Service from '../../Service/Service';
import { useUser } from '../../context/User';
const FormLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logged, setLogged } = useUser();

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleRegistrarse = () => {
        navigate("/registro");
    }
    const handleIniciarSesion = () => {
        const data = {
            correo: email,
            password: password,
        };
        
        Service.loginDoctor(data)
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                localStorage.setItem("id_user", response.data.id);
                setLogged(true);
				navigate("/user/myprofile");
            }else{
                toast.error("Hubo un error al iniciar sesión", {
                    position: "upper-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
        .catch((error) => {
            console.log(error);
            toast.error("Hubo un error al iniciar sesión", {
                position: "upper-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }


    return (
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
            <Toaster />
            <div className="flex items-center">
                <img src="http://imgfz.com/i/OD69X5p.png" className=" w-32 h-32" alt="" />
                <h1 className="text-5xl font-semibold"> Iniciar Sesión</h1>
            </div>
            <p className="font-medium text-lg text-gray-500 mt-4">Ingresa tus credenciales</p>
            <div className="mt-8">
                <div>
                    <label className="text-lg font-medium">Correo Electrónico</label>
                    <input 
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" 
                        type="email" 
                        placeholder="Ingresa tu correo"
                        onChange={onChangeEmail}
                        value={email} 
                    />
                </div>
                <div>
                    <label className="text-lg font-medium">Contraseña</label>
                    <input 
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" 
                        type="password" 
                        placeholder="Ingresa tu contraseña"
                        onChange={onChangePassword}
                        value={password} 
                    />
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-azullog text-white font-bold text-lg" onClick={handleIniciarSesion}>Inicia Sesión</button>
                </div>
                <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">Acaso no tienes cuenta?</p>
                    <button className="text-azullog text-base font-medium ml-2" onClick={handleRegistrarse}>Regístrate</button>
                </div>
            </div>
        </div>
    )
}

export default FormLogin;