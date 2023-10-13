"use client";
import { useState, useContext } from 'react';
import Form from './Form';
import Trips from './Trips';
import Link from 'next/link';
import ErrorContext from './ErrorContext';


export default function Home() {
  const [data, setData] = useState(null)
  const setErrors = useContext(ErrorContext)

  if (!data) {
    return (
      <>
        <Link href="/profile"
            onClick={()=>{setErrors(null)}}
            className="bg-yellow-800 px-4 py-2 shadow-lg rounded-lg text-white fixed top-3 left-3"
        >Profile</Link>
        <Form setData={setData} />
      </>
    )
  }
  return <Trips data={data} setData={setData} setErrors={setErrors}/>
}
