export default function SeatList({data, seatState, setSeat, setIsReserving}) {
    return (
        <div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-12 gap-3 mb-5">
                {data && data.map(seat => (
                    <div key={seat.id}
                        className={`w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-lg flex justify-center items-center border-2 ${seatState && seatState.id === seat.id ? "border-blue-200" : "border-green-500"}`}
                        onClick={() => setSeat(seat)}
                    >
                        <p className="md:text-lg font-semibold">{seat.number}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <button
                    className={`${seatState ? "bg-yellow-800" : "bg-slate-400"} px-4 py-2 shadow-lg rounded-lg text-white`}
                    onClick={()=>{setIsReserving(true)}}
                >Continuar</button>
            </div>
        </div>
    )
}