import BackendConsumer from '@/consumer'
import {useState, useEffect} from 'react'

export default function Passengers({auth, setAuth}){

    const [data, setData] = useState(null)
    const consumer = new BackendConsumer(auth, setAuth)
    
    useEffect(()=>{
        consumer.do_get('/passenger/').then(d=>{setData(d)})
    },[])

    return (
        <section >
            <div>
                {data && data.length > 0 ? data.map(pass => (
                    <div className="shadow-md py-2 px-4 rounded-md bg-blue-200 mt-5">
                        <div className="font-bold text-lg text-slate-700 border-b-2 border-slate-800">
                            <h3>Passenger</h3>
                        </div>
                        <div className="pt-2">
                            <h5>{pass.full_name}</h5>
                        </div>
                        <div className="pt-2 font-medium text-slate-600">
                            <p>{pass.dni}</p>
                        </div>
                    </div>
                )): <p className="text-center my-3">There are no Passengers</p>}
            </div>
        </section>
    )
}