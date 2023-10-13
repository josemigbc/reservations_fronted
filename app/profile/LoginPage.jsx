import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import BackendConsumer from '@/consumer'
import config from '@/config'
import ErrorContext from '../ErrorContext'

export default function LoginPage({ setAuth }) {

    const google_url = config.GOOGLE_AUTH_URL
    console.log(google_url)
    const [username, setUsername] = useState(null)
    const [password1, setPassword1] = useState(null)
    const [password2, setPassword2] = useState(null)
    const [isLogin, setIsLogin] = useState(true)
    const router = useRouter()
    const consumer = new BackendConsumer()
    const setErrors = useContext(ErrorContext)

    const handleSubmit = async (e) => {

        e.preventDefault()
        if (isLogin) {
            const payload = {
                username,
                password: password1
            }
            const data = await consumer.do_post('/auth/token/',payload,false)
            if (data.access){
                setAuth(data.refresh, data.access)
            } else {
                setErrors([data.username && `Username ${data.username}`, data.password && `Password ${data.password}`])
            }
            
        } else {
            if (password1 === password2) {
                const payload = {
                    username,
                    password: password1
                }
                const data = await consumer.do_post('/auth/register/',payload,false)
                if (typeof data.username === "string") {
                    setIsLogin(true)
                } else {
                    setErrors([data.username && `Username ${data.username}`, data.password && `Password ${data.password}`])
                }
            } else {
                setErrors(["The passwords doesnot match."])
            }
        }
    }

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col justify-center items-center px-10 py-6 rounded-md shadow-lg w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 mb-3">
                <label for="username">Username</label>
                <input id="username"
                    onChange={(e) => { setUsername(e.target.value) }}
                    className="bg-transparent border-b-2 border-slate-700 outline-none px-3 py-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mb-3">
                <label for="password1">Password</label>
                <input id="password1"
                    onChange={(e) => { setPassword1(e.target.value) }}
                    className="bg-transparent border-b-2 border-slate-700 outline-none px-3 py-1" type="password" />
            </div>
            {!isLogin && (
                <div className="grid grid-cols-1 md:grid-cols-2 mb-5">
                    <label>Confirm Password</label>
                    <input
                        onChange={(e) => { setPassword2(e.target.value) }}
                        className="bg-transparent border-b-2 border-slate-700 outline-none px-3 py-1" type="password" />
                </div>
            )}
            <div className="flex flex-col gap-2 items-center w-full">
                <button className="bg-yellow-800 text-white text-lg rounded-lg shadow-md px-8 py-2">
                    {isLogin ? "Log In" : "Sign Up"}
                </button>
                <a
                    className="text-slate-700 hover:text-slate-900"
                    onClick={() => { setIsLogin(!isLogin) }}
                >{isLogin ? "Create an account..." : "You has already account. Log in..."}</a>
            </div>
            <span className="text-center">or</span>
            <div className="w-full px-12 flex justify-center">
                <button
                    className="shadow-md md:px-8 px-2 py-2 text-slate-900 bg-blue-200 rounded-lg"
                    onClick={() => { router.push(google_url) }}
                >
                    {`${isLogin ? "Log In" : "Sign Up"} with Google`}
                </button>
            </div>
        </form>
    )
}