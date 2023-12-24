import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Registro from '../pages/Registro/Registro';

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Login/>
    },
    {
        path:'/registro',
        element: <Registro/>
    }
]);