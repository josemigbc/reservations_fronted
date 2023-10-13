import { useState, useEffect, useContext } from 'react'
import { useAuth } from '../profile/useAuth'
import BackendConsumer from '@/consumer'
import { useRouter } from 'next/navigation'
import ErrorContext from '../ErrorContext'

export default function ReserveForm({ seat }) {
    const [passengers, setPassengers] = useState([])
    const [showRawPass, setShowRawPass] = useState(true)
    const [auth, setAuth] = useAuth()
    const consumer = new BackendConsumer(auth, setAuth)
    const router = useRouter()
    const setErrors = useContext(ErrorContext)

    useEffect(() => {
        try {
            consumer.do_get('/passenger/', {}, true).then(d => setPassengers(d))
        } catch {
            setErrors(["Connection error"])
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        let passenger;
        if (showRawPass) {
            try {
                const user = await consumer.do_get('/auth/user/')
            } catch (error) {
                setErrors(["Connection error"])
                return
            }
            
            const dataPassenger = {
                user: user.id,
                full_name: form.get('fullName'),
                dni: form.get('dni')
            }
            try {
                passenger = await consumer.do_post('/passenger/', dataPassenger)
                passenger = passenger.id
            } catch (error) {
                setErrors(["Connection error"])
                return
            }

        } else {
            passenger = form.get("passenger")
        }
        const data = {
            passenger_id: passenger,
            seat_id: seat.id
        }
        try {
            const reservation = await consumer.do_post('/reservation/', data)
            if (reservation.id) {
                router.push(`/payment?id=${reservation.id}`)
            }
        } catch (error) {
            setErrors(["Connection error"])
            return
        }


    }

    return (
        <div className="w-full">
            <form
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 mb-3">
                    <label>Seat</label>
                    <p className="bg-transparent border-b-2 border-slate-700 px-3 py-1">{seat.number}</p>
                </div>
                {showRawPass && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 mb-3">
                            <label>Full Name</label>
                            <input type="text" name="fullName" className="bg-transparent border-b-2 border-slate-700 outline-none px-3 py-1" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 mb-3">
                            <label>DNI</label>
                            <input type="text" name="dni" className="bg-transparent border-b-2 border-slate-700 outline-none px-3 py-1" />
                        </div>
                    </>
                )}
                <p className="text-center mb-3">or</p>
                <div className="grid grid-cols-1 md:grid-cols-2 mb-6">
                    <label>Select passenger</label>
                    <select
                        className="bg-transparent border-b-2 border-slate-700 outline-none px-3 py-1"
                        onChange={(e) => { setShowRawPass(false) }}
                        name="passenger"
                    >
                        <option>---------</option>
                        {passengers &&
                            passengers.map(pass => (
                                <option key={pass.id} value={pass.id}>{pass.full_name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex justify-center">
                    <button className="px-4 py-2 shadow-lg rounded-lg text-white bg-yellow-800">Pay</button>
                </div>

            </form>
        </div>
    )
}