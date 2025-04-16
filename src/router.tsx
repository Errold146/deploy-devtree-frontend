import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HandleView, HomeView, LinkTreeView, LoginView, NotFoundView, ProfileView, RegisterView } from "./views";
import { AppLayout, AuthLayout } from "./layouts";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={ <AuthLayout /> }>
                    <Route path="/auth/login" element={ <LoginView /> } />
                    <Route path="/auth/register" element={ <RegisterView /> } />
                </Route> 

                <Route path="/admin" element={ <AppLayout /> }>
                    <Route index={true} element={ <LinkTreeView /> } />
                    <Route path="profile" element={ <ProfileView /> } />
                </Route>

                <Route path="/:handle" element={<AuthLayout />} >
                    <Route element={<HandleView />} index={true} />
                </Route>

                <Route path="/" element={ <HomeView /> } />

                <Route path="/404" element={<AuthLayout />} >
                    <Route element={ <NotFoundView /> } index={true} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}