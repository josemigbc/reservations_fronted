"use client";
import LoginPage from "./LoginPage";
import Profile from "./Profile";
import { useAuth } from "./useAuth";

export default function Page(){
    const [auth, setAuth] = useAuth()

    if (auth.isAuthenticated()){
        return <Profile auth={auth} setAuth={setAuth}/>
    }
    return <LoginPage setAuth={setAuth}/>
}