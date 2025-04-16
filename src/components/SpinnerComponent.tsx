
export const SpinnerComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center text-lime-500">
            <p className=" text-3xl text-center mb-4">Cargando...</p>

            <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
        </div>
    )
}
