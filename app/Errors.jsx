export default function Errors({ errors }) {
    return errors.map((err,i) => ( err &&
        <div key={i} className="bg-yellow-800 text-white mb-2 p-1 rounded-lg">
            <p>{err.toString()}</p>
        </div>
    ))
}