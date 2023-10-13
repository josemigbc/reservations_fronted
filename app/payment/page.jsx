"use client";
import {useSearchParams} from 'next/navigation'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import BackendConsumer from '@/consumer';
import { useAuth } from '../profile/useAuth';
import ErrorContext from '../ErrorContext';
import {useContext} from "react"


export default function Page() {

    const searchParams = useSearchParams()
    const stripe = useStripe()
    const elements = useElements()
    const [auth,setAuth] = useAuth()
    const consumer = new BackendConsumer(auth,setAuth)
    const setErrors = useContext(ErrorContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        try {
            const { token } = await stripe.createToken(cardElement)
            
            //Send token.id to backend
            const data = {
                reservation_id: searchParams.get('id'),
                charge_token: token.id
            }
            const response = await consumer.do_post('/payment/',data)
            if (response.error){
                setErrors('Error')
            } else {
                setErrors('Payed')
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full bg-slate-50 px-10 py-6 rounded-lg">
            <CardElement/>
            <div className="flex justify-center">
                <button className="mt-5 bg-yellow-800 px-6 py-2 rounded-lg text-white">Buy</button>
            </div>
        </form>
    )
}