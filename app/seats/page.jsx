"use client";
import config from "@/config"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation";
import SeatList from "./SeatList";
import ReserveForm from "./ReserveForm";
import BackendConsumer from "@/consumer";
import BackButton from "./BackButton";
import { useAuth } from "../profile/useAuth";
import { useRouter } from "next/navigation";



export default function Page() {
    const [isReserving, setIsReserving] = useState(false)
    const [seatState, setSeat] = useState(null)
    const [data, setData] = useState(null)
    const [auth,setAuth] = useAuth()
    const searchParams = useSearchParams()
    const consumer = new BackendConsumer()
    const router = useRouter()

    useEffect(() => {
        try{
            consumer.do_get(`/seat/${searchParams.get("id")}/`, { needAuth: false }).then(d => { setData(d) })
        }catch(err){
            setErrors(["Connection error"])
        }
        
    }, [searchParams])

    if (!isReserving) {
        return (
            <>
                <BackButton />
                <SeatList data={data} seatState={seatState} setSeat={setSeat} setIsReserving={setIsReserving} />
            </>

        )
    }
    if (auth.isAuthenticated()){
        return (
            <>
                <BackButton />
                <ReserveForm seat={seatState} />
            </>
        )
    }

    router.push('/profile')
    
}