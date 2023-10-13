import Link from "next/link"

const BackButton = () => {
    return (
        <Link href="/">
            <button
                className="bg-yellow-800 px-4 py-2 shadow-lg rounded-lg text-white fixed top-3 left-3"
            >
                Back
            </button>
        </Link>

    )
}

export default BackButton