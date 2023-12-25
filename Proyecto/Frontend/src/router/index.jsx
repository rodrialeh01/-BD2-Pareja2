import { createBrowserRouter } from "react-router-dom";
import SideBar from "../components/Sidebar/Sidebar";
import Chat from "../pages/Chat/Chat";
import Consulta1 from "../pages/Consultas/Consulta1";
import Consulta2 from "../pages/Consultas/Consulta2";
import Consulta3 from "../pages/Consultas/Consulta3";
import Consulta from "../pages/Consultas/SeleccionConsulta";
import EditProfile from '../pages/EditProfile/EditProfile';
import AddFriends from "../pages/Friends/AddFriends";
import MyFriends from "../pages/Friends/ListFriends";
import SearchFriends from "../pages/Friends/SearchFriends";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Profile from '../pages/Profile/Profile';
import Registro from "../pages/Registro/Registro";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/sidebar",
    element: <SideBar />,
  },
  {
    path: "/user",
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "friends",
        element: <MyFriends />,
      },
      {
        path: "searchfriends",
        element: <SearchFriends />,
      },
      {
        path: "addfriends",
        element: <AddFriends />,
      },
      {
        path: "messenger",
        element: <Chat />,
      },
      {
        path:'myprofile',
        element:<Profile/>
      },
      {
        path:'editprofile',
        element: <EditProfile/>
      },
      {
        path: "patients",
        element: <Consulta />,
      },

      {
        path: "consulta1",
        element: <Consulta1 />,
      },
      {
        path: "consulta2",
        element: <Consulta2 />,
      },
      {
        path: "consulta3",
        element: <Consulta3 />,
      },
      {
        path: "consulta4",
        element: null,
      },
      {
        path: "consulta5",
        element: null,
      },
    ],
  }
]);
