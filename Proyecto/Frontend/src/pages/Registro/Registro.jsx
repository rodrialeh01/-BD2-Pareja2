import { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import Service from "../../Service/Service";
const Registro = () => {
    const navigate = useNavigate();
	const [nombres, setNombres] = useState('');
	const [apellidos, setApellidos] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [edad, setEdad] = useState('');
	const [especialidad, setEspecialidad] = useState('');
	const [password, setPassword] = useState('');
	const [web, setWeb] = useState('');
	const [namephoto, setNamephoto] = useState('Cargar Foto');
	const [fotobase64, setFotobase64] = useState('');

	const onChangeNombres = (e) => {
		setNombres(e.target.value);
	};

	const onChangeApellidos = (e) => {
		setApellidos(e.target.value);
	};

	const onChangeUsername = (e) => {
		setUsername(e.target.value);
	};

	const onChangeEmail = (e) => {
		setEmail(e.target.value);
	};

	const onChangeEdad = (e) => {
		setEdad(e.target.value);
	};

	const onChangeEspecialidad = (e) => {
		setEspecialidad(e.target.value);
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const onChangeWeb = (e) => {
		setWeb(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
	};

	const handleRegistrar = () => {
		const data = {
			nombres: nombres,
			apellidos: apellidos,
			usuario: username,
			correo: email,
			edad: edad,
			especialidad: especialidad,
			password: password,
			web: web,
			imagen: fotobase64,
		}
		console.log(data)
		Service.registroDoctor(data)
		.then((response) => {
			if(response.status === 200){
				toast.success("Se registró exitosamente", {
					position: "upper-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				  });
		  
				setTimeout(() => {
					navigate("/");
				}, 3000);
			}
		})
	};

	const onChangeFoto = (e) => {
		const selectedFile = e.target.files[0];
		const reader = new FileReader();
		console.log(selectedFile);
	
		reader.onloadend = () => {
			console.log('a');
			console.log(reader.result);
			setNamephoto(selectedFile.name);
			setFotobase64(reader.result);
		};
	
		if (selectedFile) {
			reader.readAsDataURL(selectedFile);
		}
	};


    return (
        <div className="h-screen md:flex fuente">
			<Toaster />
	<div
		className="hidden relative lg:flex overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-lightPurple to-purple-700 i justify-around items-center" style={{ 
            backgroundImage: "url('http://imgfz.com/i/rFOe8ZW.jpeg')", 
            backgroundColor: "rgba(127, 63, 191, 0.7)",
            backgroundSize: "cover", 
            backgroundPosition: "center center" }}>
		<div>
        <img src="http://imgfz.com/i/OD69X5p.png"
              className=" w-80 h-80 mx-auto opacity-60 animate-bounce" alt="Logo" />
		</div>
	</div>
	<div className="flex md:w-1/2 justify-center py-10 items-center bg-azullog">
		<form className="bg-azullog" onSubmit={handleSubmit}>
			<h1 className="text-white font-bold text-4xl mb-1 "><span className='text-azul'>Bienvenido</span>, Regístrate!</h1>
			<p className="text-s font-normal text-white mb-7">A la mejor red de Médicos</p>
			<div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white">
                <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/20/306bac/user--v1.png" alt="user--v1"/>
				<input className="pl-2 outline-none border-none bg-white text-black" 
					type="text" 
					name="name_user" 
					id="name_user" 
					placeholder="Nombres" 
					required
                    style={{ width: "100%" }}
					onChange={onChangeNombres}
					value={nombres}
				/>
      </div>
      
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white">
                <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/20/306bac/user--v1.png" alt="user--v1"/>
				<input className="pl-2 outline-none border-none bg-white text-black" 
					type="text" 
					name="ap_user" 
					id="ap_user" 
					placeholder="Apellidos" 
					required
                    style={{ width: "100%" }}
					onChange={onChangeApellidos}
					value={apellidos}
				/>
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white">
                <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/20/306bac/user--v1.png" alt="user--v1"/>
				<input className="pl-2 outline-none border-none bg-white text-black" 
					type="text" 
					name="username" 
					id="username" 
					placeholder="Nombre de usuario" 
					required
                    style={{ width: "100%" }}
					onChange={onChangeUsername}
					value={username}
				/>
      </div>
					<div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white" >
                    <img width="20" height="20" src="https://img.icons8.com/material-rounded/20/306bac/new-post.png" alt="new-post"/>
						<input className="pl-2 outline-none border-none bg-white text-black" 
							type="email" 
							name="email_user" 
							id="email_user" 
							placeholder="Correo Electrónico"
							required
                            style={{ width: "100%" }}
							onChange={onChangeEmail}
							value={email}
                        />
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white" >
      <img width="20" height="20" src="https://img.icons8.com/ios-filled/20/306bac/identification-documents.png" alt="identification-documents"/>
				<input className="pl-2 outline-none border-none bg-white text-black" 
					type="number" 
					name="age_user" 
					id="age_user" 
					placeholder="Edad" 
					required
                    style={{ width: "100%" }}
					onChange={onChangeEdad}
					value={edad}
				/>
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white" >
      <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/20/306bac/user--v1.png" alt="user--v1"/>
				<input className="pl-2 outline-none border-none bg-white text-black" 
					type="text" 
					name="especiality_user" 
					id="especiality_user" 
					placeholder="Especialidad" 
					required
                    style={{ width: "100%" }}
					onChange={onChangeEspecialidad}
					value={especialidad}
				/>
      </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white">
                    <img width="20" height="20" src="https://img.icons8.com/metro/20/306bac/password.png" alt="password"/>
							<input className="pl-2 outline-none border-none bg-white text-black" 
								type="password" 
								name="pass_user" 
								id="pass_user" 
								placeholder="Contraseña" 
								required
								onChange={onChangePassword}
								value={password}
							/>
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="w-6 h-6 text-azullog">
                        <path  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
							<input className="pl-2 outline-none border-none bg-white text-black" 
								type="url" 
								name="web_user" 
								id="web_user" 
								placeholder="Sitio Web"
								onChange={onChangeWeb}
								value={web} 
							/>
                        </div>
                        <label className="flex items-center border-2 py-2 px-3 rounded-2xl cursor-pointer bg-white">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-azullog" viewBox="0 0 16 16" fill="currentColor">
        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
    </svg>
    <input className="hidden bg-white" 
			type="file" 
			accept="image/*" 
			capture="camera" 
			name="photo_user" 
			id="photo_user" 
			required
			onChange={onChangeFoto}
			/>
    <span className="pl-2 outline-none border-none bg-white text-gray-500" style={{ pointerEvents: "none" }}>{namephoto}</span>
</label>
        <button type="submit" className="block w-full bg-white mt-4 py-2 rounded-2xl text-azullog font-semibold mb-2" onClick={handleRegistrar} >Registrar</button>
        <p className='text-sm ml-2 text-white'>Acaso ya tienes cuenta ? 
        <Link to="/" className="text-sm ml-2 hover:text-white cursor-pointer text-azul font-bold">Inicia Sesión</Link></p>
		
        </form>
	</div>
</div>
    );
}

export default Registro;