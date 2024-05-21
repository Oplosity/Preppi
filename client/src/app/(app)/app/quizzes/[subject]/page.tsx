import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: { subject: string } }
): Promise<Metadata> {
  return {
    title: `${params.subject} quizzes - Preppi`,
    description: `Discover ${params.subject} quizzes on Preppi!`
  }
}

function QuizOption({name, description, completed, id}: {name: string, description: string, completed: number, id: string}){
  return(
    <div className="group">
      <div className="rounded-xl bg-gradient-to-t from-black/5 to-white/90 p-8">
        <div>
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-neutral-600 group-hover:text-neutral-900 mt-1">{description}</p>
        </div>
        <div className="text-right mt-4">
          <p className="text-neutral-600 group-hover:text-neutral-900">{completed}% completed</p>
          <Progress value={completed} />
          <Button asChild className="mt-4">
            <Link href={`/app/quiz/${id}`}>Start quiz</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Page ({ params }: { params: { subject: string } }) {
    return(
      <div>
        <Button className="md:hidden"><FontAwesomeIcon icon={faChevronLeft} />&nbsp;&nbsp;{params.subject}</Button>
        <QuizOption name="Grammar and punctuation" description="This is the description of this quiz." completed={56} id="something"  />
        <QuizOption name="Grammar and punctuation" description="This is the description of this quiz." completed={56} id="something"  />
        <QuizOption name="Grammar and punctuation" description="This is the description of this quiz." completed={56} id="something"  />
      </div>
    )
}