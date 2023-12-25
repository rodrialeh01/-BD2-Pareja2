import { useNavigate } from 'react-router-dom';
const FormLogin = () => {
    const navigate = useNavigate();
    const handleRegistrarse = () => {
        navigate("/registro");
    }

    return (
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
            <div className="flex items-center">
                <img src="http://imgfz.com/i/OD69X5p.png" className=" w-32 h-32" alt="" />
                <h1 className="text-5xl font-semibold"> Iniciar Sesión</h1>
            </div>
            <p className="font-medium text-lg text-gray-500 mt-4">Ingresa tus credenciales</p>
            <div className="mt-8">
                <div>
                    <label className="text-lg font-medium">Correo Electrónico</label>
                    <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" type="email" placeholder="Ingresa tu correo" />
                </div>
                <div>
                    <label className="text-lg font-medium">Contraseña</label>
                    <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" type="password" placeholder="Ingresa tu contraseña" />
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-azullog text-white font-bold text-lg">Inicia Sesión</button>
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