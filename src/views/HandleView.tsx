import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getUserByHandle } from "../api"
import { HandleData, SpinnerComponent } from "../components"

export const HandleView = () => {

    const params = useParams()
    const handle = params.handle as string
    const { data, error, isLoading } = useQuery({
        queryFn: () => getUserByHandle(handle),
        queryKey: ['handle', handle],
        retry: 1,
    })

    if (isLoading) return <SpinnerComponent />;
    if (error) return <Navigate to={'/404'} />;
    if (data) return <HandleData data={data} />;
}
