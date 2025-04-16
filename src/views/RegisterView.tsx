import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import type { RegisterForm } from "../types"
import { ErrorMessage } from "../components"
import { api } from "../config"

export const RegisterView = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const initialValues: RegisterForm = {
        name: '',
        email: '',
        handle: location?.state?.handle || '',
        password: '',
        password_confirmation: '',
    }

    const { register, watch, handleSubmit, formState: { errors } } = useForm({defaultValues: initialValues})

    const pass = watch('password')

    const handleRegister = async ( formData: RegisterForm ) => {
        try {
            const { data } = await api.post('/auth/register', formData)
            toast.success( data )
            navigate('/auth/login')

        } catch (error) {
            if ( isAxiosError(error) && error.response ) {
                toast.error(error.response.data.error)
            }
            
        }
    }

    return (
        <>
            <h1 className=" text-4xl text-white font-bold">Crear Cuenta</h1>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10 mb-10 shadow-lg"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className={`bg-slate-100 border p-3 rounded-lg placeholder-slate-400 ${errors.name ? 'border-red-500' : 'border-none' }`}
                        {...register('name', {
                            required: 'El Nombre es Obligatorio'
                        })}
                    />
                    { errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage> }
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className={`bg-slate-100 border p-3 rounded-lg placeholder-slate-400 ${errors.email ? 'border-red-500' : 'border-none'}`}
                        {...register('email', {
                            required: 'El Email es Obligatorio',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Email no Válido",
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className={`bg-slate-100 border p-3 rounded-lg placeholder-slate-400 ${errors.handle ? 'border-red-500' : 'border-none'}`}
                        {...register('handle', {
                            required: 'El Handle es Obligatorio'
                        })}
                    />
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className={`bg-slate-100 border p-3 rounded-lg placeholder-slate-400 ${errors.password ? 'border-red-500' : 'border-none'}`}
                        {...register('password', {
                            required: 'El Password es Obligatorio',
                            minLength: {
                                value: 8,
                                message: 'El Password es Minimo de 8 Caracteres'
                            }
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className={`bg-slate-100 border p-3 rounded-lg placeholder-slate-400 ${errors.password_confirmation ? 'border-red-500' : 'border-none'}`}
                        {...register('password_confirmation', {
                            required: 'Repetir el Password es Obligatorio',
                            validate: value => value === pass || 'Los Password\'s NO son Iguales'
                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}

                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Crear Cuenta'
                />
            </form>

            <div className="mt-10">
                <Link 
                    to="/auth/login"
                    className="text-center text-white text-lg block"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>
            </div>
        </>
    )
}
