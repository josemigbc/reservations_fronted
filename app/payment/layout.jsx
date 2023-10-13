"use client";
import {Elements} from "@stripe/react-stripe-js";
import stripePromise from '@/stripe';

export default function Layout({children}){
    return(
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    )
}