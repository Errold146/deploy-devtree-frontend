import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import slugify from "slugify"
import { ErrorMessage } from "./ErrorMessage"
import { searchByHandle } from "../api"
import { SpinnerComponent } from "./SpinnerComponent"
import { Link } from "react-router-dom"

export const SearchForm = () => {

    const { register, handleSubmit, watch, formState: { errors }} = useForm({
        defaultValues: {
            handle: ''
        }
    })

    const mutation = useMutation({
        mutationFn: searchByHandle,
    })

    const handle = watch("handle")

    const handleSearch = () => {
        const slug = slugify(handle, {
            lower: true,
            strict: true,
            trim: true,
        })
        mutation.mutate(slug)
    }

    return (
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-5"
        >
            <div className="relative flex items-center  bg-white  px-2">
                <label
                    htmlFor="handle"
                >devtree.com/</label>
                <input
                    type="text"
                    id="handle"
                    className="border-none bg-transparent p-2 focus:ring-0 flex-1"
                    placeholder="elonmusk, zuck, jeffbezos"
                    {...register("handle", {
                        required: "El handle es obligatorio",
                    })}
                />

            </div>
            {errors.handle && (
                <ErrorMessage>{errors.handle.message}</ErrorMessage>
            )}

            <div className="mt-10">
                { mutation.isPending && <SpinnerComponent /> }
                { mutation.isError && <ErrorMessage>{mutation.error.message}</ErrorMessage> }
                {
                    mutation.isSuccess && (
                        <span className="text-center text-cyan-500">
                            {mutation.data} ir a {' '}
                            <Link
                                className=" underline text-lime-600 font-bold"
                                to={'/auth/register'}
                                state={{ handle: slugify(handle) }}
                            >
                                Registro
                            </Link>
                        </span>
                    )
                }
            </div>

            <input
                type="submit"
                className="bg-cyan-400 hover:bg-cyan-500 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Obtener mi DevTree'
            />
        </form>
    )
}
