import { createBrowserRouter } from 'react-router-dom';
import SideBar from '../components/Sidebar';
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
    },
    {
        path: '/sidebar',
        element: <SideBar/>
    },
    {
        path:'/user',
        children:[
            {
                path:'home',
                element: null
            },
            {
                path:'friends',
                element: null
            },
            {
                path:'addfriends',
                element: null
            },
            {
                path:'messenger',
                element: null
            },
            {
                path:'myprofile',
                element:null
            },
            {
                path:'editprofile',
                element: null
            },
            {
                path:'patients',
                element:null
            }
        ]
    }
]);