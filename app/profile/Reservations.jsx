import BackendConsumer from '@/consumer'
import {useState, useEffect} from 'react'
export default function Reservations({auth, setAuth}){

    const [data, setData] = useState(null)
    const consumer = new BackendConsumer(auth,setAuth)
    useEffect(()=>{
        consumer.do_get('/reservation/').then(d=>{setData(d)})
    },[])
    
    return (
        <section>
            <div>
                {data && data.length > 0 ? data.map(res => (
                    <div className="shadow-md py-2 px-4 rounded-md bg-blue-200 mt-5">
                        <p className="font-semibold text-lg border-b-2 border-slate-800">
                            {`${res.seat.trip.origin} - ${res.seat.trip.destination}`}
                        </p>
                        <p className="pt-3">Date: {new Date(res.seat.trip.datetime).toLocaleString()}</p>
                        <p>Sold: {new Date(res.datetime).toLocaleString()}</p>
                        <p>Payment Status: {res.payment_status === "0" ? "Pending" : res.payment_status === "1" ? "Payed": "Cancelled"}</p>
                    </div>
                )):
                    <p className="text-center my-3">There are no Reservations</p>
                }
            </div>
        </section>
    )
}