import Passengers from "./Passengers"
import Reservations from "./Reservations"
import {useState} from 'react'

export default function Profile({auth, setAuth}){

    const [showRes, setShowRes] = useState(true)

    return (
        <div className="w-full">
            <div className="flex justify-around">
                <a className={showRes ? "border-b-2 border-yellow-800": null}
                onClick={()=>{setShowRes(true)}}
                >Reservations</a>
                <a 
                onClick={()=>{setShowRes(false)}}
                className={!showRes ? "border-b-2 border-yellow-800": null}>Passengers</a>
            </div>
            {showRes ? <Reservations auth={auth} setAuth={setAuth}/> : <Passengers auth={auth} setAuth={setAuth}/>}
        </div>
    )
}