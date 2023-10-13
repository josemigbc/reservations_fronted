export default function Errors({ errors }) {
    return errors.map(err => ( err &&
        <div className="bg-yellow-800 text-white mb-2 p-1 rounded-lg">
            <p>{err.toString()}</p>
        </div>
    ))
}