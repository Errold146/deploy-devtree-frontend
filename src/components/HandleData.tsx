import type { SocialNetwork, UserHandle } from "../types"

type HandleDataProps = {
    data: UserHandle
}

export const HandleData = ({data}: HandleDataProps) => {

    const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled)

    return (
        <div className="space-y-6 text-white text-center">
            <p className="text-5xl font-bold">{data.handle}</p>

            {
                data.image && <img src={data.image} className="max-w-[250px] mx-auto" alt={`Imagen de ${data.handle}`} />
            }

            <p className="text-2xl font-semibold">{data.description}</p>

            <div className="mt-20 flex flex-col gap-5">
                {
                    links.length 
                    ? links.map(link => (
                        <a 
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white px-16 py-2 flex items-center gap-5 rounded-lg text-lime-500 hover:text-white
                            hover:bg-lime-500 font-bold capitalize text-center"
                        >
                            <img src={`/social/icon_${link.name}.svg`} alt={`Icono de ${link.name}`} className="w-12" />
                            <p className="text-center">Visita mi: {link.name}</p>
                        </a>
                    ))
                    : <p>No hay enlances en este perfil</p>
                }
            </div>
        </div>
    )
}
