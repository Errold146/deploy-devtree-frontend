import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { Toaster } from 'sonner'
import { NavigationTabs } from './NavigationTabs'
import { User, type SocialNetwork } from '../types'
import { DevTreeLink } from './DevTreeLink'
import { Header } from './Header'

type DevTreeProps = {
    data: User
}

export const DevTree = ({data}: DevTreeProps) => {
    
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
        JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
    )

    useEffect(() => {
       setEnabledLinks( JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled) ) 
    }, [data])

    const queryClient = useQueryClient()
    const handleDragEnd = (evt: DragEndEvent) => {
        const { active, over } = evt

        if ( over && over.id ) {
            const prevIndex = enabledLinks.findIndex((item: SocialNetwork) => item.id === active.id)
            const newIndex = enabledLinks.findIndex((item: SocialNetwork) => item.id === over?.id)
            const order = arrayMove(enabledLinks, prevIndex, newIndex)
            setEnabledLinks(order)

            const disableLinks: SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled)
            const newLinks = [...order, ...disableLinks]
            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    links: JSON.stringify(newLinks)
                }
            })
        }
    }

    return (
        <>

            <Header />

            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">

                    <NavigationTabs />

                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={`/${data.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            Visitar Mi Perfil: /{data.handle}
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10 ">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>

                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6 rounded shadow-lg">
                            <p className=' text-4xl text-center text-white'>{data.handle}</p>

                            { data.image &&
                                <img src={data.image} alt="Imagen Perfil" className=' mx-auto max-w-[250px]' />
                            }

                            <p className='text-center text-lg font-semibold text-white'>{data.description}</p>
                            
                            <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <div className='mt-20 flex flex-col gap-5'>
                                    <SortableContext
                                        items={enabledLinks}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {
                                            enabledLinks.map( (link: SocialNetwork) => (
                                                <DevTreeLink key={link.name} link={link} />
                                            ))
                                        }
                                    </SortableContext>
                                </div>
                            </DndContext>

                        </div>
                    </div>
                </main>
            </div>

            <Toaster position="top-right" richColors />
        </>
    )
}
