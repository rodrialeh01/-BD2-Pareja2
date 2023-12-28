import { createContext, useContext, useState } from "react";

export const User = createContext();

export const UserProvider = ({ children }) => {
    const id = localStorage.getItem("id_user");
    let existe = false;

    if(id){
        existe = true;
    }

    const [logged, setLogged] = useState(existe);
    return (
        <User.Provider value={{ logged, setLogged }}>{children}</User.Provider>
    );
}

export default User;

export const useUser = () => useContext(User);
