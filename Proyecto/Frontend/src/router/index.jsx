import { createBrowserRouter } from "react-router-dom";
import SideBar from "../components/Sidebar/Sidebar";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registro from "../pages/Registro/Registro";
import SearchFriends from "../pages/Friends/SearchFriends";
import AddFriends from "../pages/Friends/AddFriends";
import Consulta from "../pages/Consultas/SeleccionConsulta";
import MyFriends from "../pages/Friends/ListFriends";
import Chat from "../pages/Chat/Chat";
import Consulta1 from "../pages/Consultas/Consulta1";
import Consulta2 from "../pages/Consultas/Consulta2";
import Consulta3 from "../pages/Consultas/Consulta3";

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
        path: "myprofile",
        element: null,
      },
      {
        path: "editprofile",
        element: null,
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
  },
]);
