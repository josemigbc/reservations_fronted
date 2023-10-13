const BackButton = ({ setData }) => {
    return (
        <button
            className="bg-yellow-800 px-4 py-2 shadow-lg rounded-lg text-white fixed top-3 left-3"
            onClick={() => { setData(null), setErrors(null) }}
        >Back</button>
    )
}

export default BackButton