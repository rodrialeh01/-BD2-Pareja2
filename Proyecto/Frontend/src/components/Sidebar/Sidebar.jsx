import { ChevronFirst, ChevronLast, Home, LogOut, MessageCircle, Search, UserPlus, UsersRound, UserSearch } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SideBar = () => {
    const [expandido, setExpandido] = useState(true);
    const navigate = useNavigate();
    const Items = [
        {
            icon:<Home size={20} />,
            text: 'Home',
            path:'/user/home'
        },
        {
            icon:<UsersRound size={20} />,
            text: 'Mis Amigos',
            path:'/user/friends'
        },
        {
            icon:<UserPlus size={20} />,
            text:'Añadir Amigos',
            path:'/user/addfriends'
        },
        {
            icon:<UserSearch size={20} />,
            text:'Buscar Amigo',
            path:'/user/searchfriends'
        },
        {
            icon:<MessageCircle size={20} />,
            text:'Mensajeria',
            path:'/user/messenger'
        },
        {
            icon:<Search size={20} />,
            text:'Consulta de Pacientes',
            path:'/user/patients'
        }
    ]

    const goToPath = (path) => {
        navigate(path);
    }
    const goToProfile = () => {
        navigate('/user/myprofile')
    }

    return (
        <>
            <aside className="h-screen">
                <nav className={`h-full flex flex-col bg-azullog border-r shadow-sm ${expandido ? ' w-64' : 'w-20'}`}>
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <img src="http://imgfz.com/i/91Ec5Ma.png" className={`overflow-hidden transition-all ${expandido ? 'w-32' : 'w-0'}`} alt="" />
                        <button onClick={() => setExpandido(curr => !curr)} className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200">
                            {expandido? <ChevronFirst/>: <ChevronLast/>}
                        </button>
                    </div>

                    <ul className='flex-1 px-3'>
                        {Items.map((item, index) => (
                            <li key={index} className={`
                                relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors hover:bg-gray-500 text-white
                            `}
                            onClick={() => goToPath(item.path)}>
                                {item.icon}
                                <span 
                                className={`overflow-hidden transition-all ${expandido?'w-52 ml-3':'w-0'}`}>{item.text}</span>                            
                            </li>
                        ))}
                        <li key={Items.length +1} className={`
                            relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors hover:bg-gray-500 text-white
                        `}
                        onClick={() => goToPath('/')}>
                            <LogOut size={20}/>
                            <span 
                            className={`overflow-hidden transition-all ${expandido?'w-52 ml-3':'w-0'}`}>Cerrar Sesión</span>                            
                        </li>
                    </ul>

                    <div className='border-t flex p-3 hover:bg-gray-500 hover:cursor-pointer' onClick={goToProfile}>
                        <img src={'https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true'} alt="" 
                            className='w-10 h-10 rounded-md'
                        />
                        <div className={`
                        flex justify-center items-center
                        overflow-hidden transition-all ${expandido ? 'w-52 ml-3':'w-0'}
                        `}>
                            <div className='leading-4'>
                                <h4 className='font-semibold text-white'>Jhon Doe</h4>
                                <span className='text-xs text-gray-200'>johndoe@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    )
}

export default SideBar;