import Link from "next/link"
import BackButton from "./BackButton"

export default function Trips({ data, setData, setErrors }) {
    if (data.length > 0) {
        return (
            <>
                <BackButton setData={setData} />
                <div className="flex flex-col w-full">
                    {data.map(trip => (
                        <Link href={`/seats?id=${trip.id}`} key={trip.id}>
                            <div className="flex justify-between items-center shadow-md py-2 px-4 rounded-md bg-blue-200">
                                <div>
                                    <h3 className="text-base mb-2">{`${trip.origin} - ${trip.destination}`}</h3>
                                    <h5 className="text-sm text-slate-700">{new Date(trip.datetime).toLocaleString()}</h5>
                                </div>
                                <div>
                                    <p className=" text-cyan-950 font-semibold">{trip.price / 100} USD</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </>

        )
    }
    return (
        <>
            <BackButton setData={setData} setErrors={setErrors} />
            <h2>There are no trips.</h2>
        </>
    )
}