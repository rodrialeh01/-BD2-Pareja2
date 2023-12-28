import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from "../context/User";

const LayoutPrivate = () => {
    const { logged } = useUser();
    console.log(logged)
    return (
        <>
            {logged ? <Outlet /> : <Navigate to="/" />}
        </>
    )
}

export default LayoutPrivate;