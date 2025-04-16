import { Link, Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { Logo } from "../components"

export  function AuthLayout() {
    return (
        <>
            <div className=" bg-slate-800 min-h-screen">
                <div className=" max-w-lg mx-auto pt-10 px-5">
                    <Link to={'/'}>
                        <Logo />
                    </Link>

                    <div className=" py-10">
                        <Outlet />
                    </div>

                </div>
            </div>

            <Toaster position="top-right" richColors />
        </>
    )
}
