import { Header, SearchForm } from "../components"

export const HomeView = () => {
    return (
        <>
            <Header />  

            <main className="bg-gray-100 py-10 min-h-screen bg-no-repeat bg-right-top lg:bg-home lg:bg-home-xl">
                <div className="max-w-5xl mx-auto mt-10">
                    <div className="lg:w-1/2 px-10 lg:px-0 space-y-10">
                        <h1 className="text-6xl font-black">
                            Todas tus <span className="text-cyan-400">Redes Sociales</span> en un solo enlance
                        </h1>

                        <p className="text-slate-800 text-lg">
                            Crea tu perfil y comparte todas tus redes sociales en un solo enlace. 
                            Comparte tu perfild de Facebook, Instagram, Github, TikTok y más.
                        </p>

                        <SearchForm />
                    </div>
                </div>
            </main>
        </>
    )
}
