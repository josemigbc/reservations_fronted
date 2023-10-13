import { useState, useContext } from 'react'
import ErrorContext from './ErrorContext';
import config from "@/config";
import BackendConsumer from '@/consumer';

const PlaceInput = ({ name, data, setData }) => {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 w-full mb-3">
            <label for={name.toLowerCase()}>{name}</label>
            <select id={name.toLowerCase()}
                className="bg-transparent border-b-2 border-slate-700 outline-none px-3 py-1"
                onChange={(e) => { setData(e.target.value) }}
            >
                <option>---------------</option>
                {
                    config.locations.map(loc => <option key={loc} value={loc}>{loc}</option>)
                }
            </select>
        </div>
    )
}

export default function Form({ setData }) {
    const [origin, setOrigin] = useState(config.locations[0])
    const [destination, setDestination] = useState(config.locations[1])
    const [date, setDate] = useState(null)
    const setErrors = useContext(ErrorContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const consumer = new BackendConsumer()
        const data = {
            origin,
            destination,
            date,
        }
        try {
            const dataResp = await consumer.do_get('/trip/', data, false)
            if (!dataResp.detail) {
                setData(dataResp)
            } else {
                setErrors([dataResp.detail])
            }
        } catch(err){
            setErrors(["Connection error"])
        }
        
    }

    return (
        <form
            className="flex flex-col justify-center items-center px-10 py-6 rounded-md shadow-lg w-full"
            onSubmit={handleSubmit}
        >
            <PlaceInput name={"Origin"} data={origin} setData={setOrigin} />
            <PlaceInput name={"Destination"} data={destination} setData={setDestination} />
            <div className="grid md:grid-cols-2 grid-cols-1 w-full mb-3">
                <label for="date">Date</label>
                <input type="date" id="date"
                    className="bg-transparent border-b-2 border-slate-700 outline-none px-3 py-1"
                    onChange={(e) => { setDate(e.target.value) }}
                />
            </div>
            <div className="w-full">
                <button className="text-lg bg-yellow-800 text-white rounded-lg shadow-md w-full">Search</button>
            </div>
        </form>
    )
}