"use client";
import Link from "next/link";
import ErrorContext from "../ErrorContext";
import {useContext} from 'react'

export default function Layout({ children }) {
    const setErrors = useContext(ErrorContext)
    return (
        <>
            <Link 
            onClick={()=>{setErrors(null)}}
            href="/" className="bg-yellow-800 text-white fixed top-2 left-2 shadow-lg px-3 py-2 rounded-lg">
                Home
            </Link>
            {children}
        </>
    )
}