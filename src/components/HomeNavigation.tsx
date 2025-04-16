import { Link } from "react-router-dom"

export const HomeNavigation = () => {
    return (
        <>
            <Link
                to={"/auth/login"}
                className=" bg-lime-500 hover:bg-lime-600 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer mr-4"
            >
                Iniciar Sesión
            </Link>   
            
            <Link
                to={"/auth/register"}
                className=" bg-lime-500 hover:bg-lime-600 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer mr-4"
            >
                Registrarme
            </Link>   
        </>
    )
}
