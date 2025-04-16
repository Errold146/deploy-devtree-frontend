import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { social } from "../data"
import { DevTreeInput } from "../components"
import { isValidUrl } from "../utils"
import { updateProfile } from "../api"
import type { SocialNetwork, User } from "../types"

export const LinkTreeView = () => {

    const [devTreeLinks, setDevTreeLinks] = useState(social)
    const queryClient = useQueryClient()
    const user: User = queryClient.getQueryData(['user'])!
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            toast.success("Actualizado correctamente")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    useEffect(() =>{
        const updatedData = devTreeLinks.map( item => {
            const userLink = JSON.parse(user.links).find( (link: SocialNetwork) => link.name === item.name )
            if ( userLink ) {
                return {
                    ...item,
                    url: userLink.url,
                    enabled: userLink.enabled
                }
            }
            return item
        })

        setDevTreeLinks(updatedData)
    }, [])

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
        setDevTreeLinks(updatedLinks)
    }

    const links: SocialNetwork[] = JSON.parse(user.links)
    
    const handleEnableLink = (socialNetwork: string) => { 
        const updatedLinks = devTreeLinks.map(link => {
            if ( link.name === socialNetwork ) {
                if ( isValidUrl(link.url) ) {
                    return { ...link, enabled: !link.enabled }
                } else {
                    toast.error("URL inválida")
                }
            }
            return link
        })
        setDevTreeLinks(updatedLinks)

        let updateditems: SocialNetwork[] = []
        const selectedSocialNetwork = updatedLinks.find( link => link.name === socialNetwork )
        if (selectedSocialNetwork?.enabled) {

            const id = links.filter( link => link.id > 0).length + 1
            toast.success(`Link de: ${selectedSocialNetwork.name} habilitado`)

            if (links.some( link => link.name === socialNetwork)) {
                updateditems = links.map(link => {
                    if ( link.name === socialNetwork ) {
                        return {  ...link,  id, enabled: true }

                    } else {
                        return link
                    }
                })
            } else {
                const newItem = { ...selectedSocialNetwork, id }
                updateditems = [...links, newItem]
            }
        } else {
            toast.error(`Link de: ${selectedSocialNetwork?.name} desabilitado`)
            const indexToUpdate = links.findIndex( link => link.name === socialNetwork )
            updateditems = links.map(link => {
                if ( link.name === socialNetwork ) {
                    return {  ...link, id: 0, enabled: false }

                } else if (link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)) {
                    return { ...link, id: link.id - 1 }

                } else {
                    return link
                }
            })
        }

        // Store in the database
        queryClient.setQueryData(['user'], (prevData: User) => {
            return { ...prevData, links: JSON.stringify(updateditems) }
        })
    }

    return (
        <>
            <div className=" space-y-5">
                {
                    devTreeLinks.map( item => (
                        <DevTreeInput 
                            key={item.name}
                            item={item}
                            handleUrlChange={handleUrlChange}
                            handleEnableLink={handleEnableLink}
                        />
                    ))
                }

                <button
                    className="bg-cyan-400 hover:bg-cyan-500 text-slate-600 font-bold p-2 text-lg w-full uppercase rounded-lg"
                    onClick={() => mutate(queryClient.getQueryData(['user'])!)}
                >Guardar Cambios</button>
            </div>
        </>
    )
}