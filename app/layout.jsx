"use client";
import './globals.css'
import { useState, Suspense} from 'react'
import ErrorContext from './ErrorContext';
import Errors from './Errors';
import Loading from './Loading';

const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  
  const [errors, setErrors] = useState(null)

  return (
    <html lang="en">
      <body>
        <ErrorContext.Provider value={setErrors}>

        <main className="flex min-h-screen flex-col items-center justify-center md:p-24 p-12 sm:p-16">
          {errors && <Errors errors={errors}/>}
          <h1 className="text-center text-xl mb-3">Reservations</h1>
          <Suspense fallback={<Loading/>}>{children}</Suspense>
        </main>
        </ErrorContext.Provider>
      </body>
    </html>
  )
}
