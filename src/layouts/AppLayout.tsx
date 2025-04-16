import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"
import { DevTree } from "../components"
import { getUser } from "../api"

export function AppLayout() {

    const { data, isLoading, isError } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 2,
        refetchOnWindowFocus: false,
    })

    if ( isLoading ) return 'Cargando...';
    if ( isError ) return <Navigate to={'/auth/login'} />;
    if ( data ) return <DevTree data={data} />;
}