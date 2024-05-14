import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function Page ({ params }: { params: { slug: string } }) {
    return(
        <div className="">
            <div className="rounded-xl bg-gradient-to-t from-black/5 to-white/90 standard-app-padding">
                <h3 className="text-xl font-bold">Grammar and puntuation</h3>
                <div>
                    <Button asChild>
                        <Link href="/app/quizzes">Start quiz</Link>
                    </Button>
                </div>
                <Progress value={33} />
                <div>33% completed</div>
            </div>
        </div>
    )
}