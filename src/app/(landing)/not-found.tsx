import Link from 'next/link'

export default function NotFound() {
  return(
    <div className="standard-page">
        <h1 className="text-2xl font-extrabold">Not found – 404!</h1>
        <div>
            <Link href="/">Go back to Home</Link>
        </div>
    </div>
  )
}