import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { SocialNetwork } from "../types"

type DevTreeLinkProps = {
    link: SocialNetwork
}

export function DevTreeLink({link}: DevTreeLinkProps) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: link.id
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <li 
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-5 rounded-lg bg-white px-5 py-2"
            {...attributes}
            {...listeners}
        >
            <div
                className="w-12 h-12 bg-cover rounded-full overflow-hidden"
                style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}
            ></div>
            <p className=" capitalize">Visita mi: <strong>{link.name}</strong></p>
        </li>
    )
}
