import { Link, useNavigate } from 'react-router-dom';
const Registro = () => {
    const navigate = useNavigate();


    return (
        <div className="h-screen md:flex fuente">
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
		<form className="bg-azullog">
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
				/>
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white" >
      <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/20/306bac/user--v1.png" alt="user--v1"/>
				<input className="pl-2 outline-none border-none bg-white text-black" 
					type="number" 
					name="especiality_user" 
					id="especiality_user" 
					placeholder="Especialidad" 
					required
                    style={{ width: "100%" }}
				/>
      </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 bg-white">
                    <img width="20" height="20" src="https://img.icons8.com/metro/20/306bac/password.png" alt="password"/>
							<input className="pl-2 outline-none border-none bg-white text-black" 
								type="password" 
								name="pass_user" 
								id="pass_user" 
								placeholder="Contraseña" 
								required/>
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
			/>
    <span className="pl-2 outline-none border-none bg-white text-gray-500" style={{ pointerEvents: "none" }}>Cargar Foto</span>
</label>
        <button type="submit" className="block w-full bg-white mt-4 py-2 rounded-2xl text-azullog font-semibold mb-2" >Registrar</button>
        <p className='text-sm ml-2 text-white'>Acaso ya tienes cuenta ? 
        <Link to="/" className="text-sm ml-2 hover:text-white cursor-pointer text-azul font-bold">Inicia Sesión</Link></p>
		
        </form>
	</div>
</div>
    );
}

export default Registro;