"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from 'next/navigation'

export default function Page ({ params }: { params: { id: string } }) {
  const router = useRouter()

    return(
      <div className="standard-app">
        <Button onClick={() => router.back()} className=""><FontAwesomeIcon icon={faChevronLeft} />&nbsp;&nbsp;Back</Button>
        <h1 className="text-3xl font-bold">A quiz title</h1>
        <p>This is a quiz with id of {params.id}</p>
        <p className="text-neutral-600 group-hover:text-neutral-900">{30}% completed</p>
        <Progress value={30} />
        <Button asChild><Link href={`/app/quiz/${params.id}/run/`}>Start quiz</Link></Button>
        <Button>Start group quiz</Button>
      </div>
    )
}