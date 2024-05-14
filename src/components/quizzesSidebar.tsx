import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "./ui/button"
import Link from "next/link"


export default function QuizzesSidebar () {
    return(
        <ScrollArea className="w-full h-full bg-[url('/landing/landing-bg.svg')] bg-no-repeat bg-cover standard-app-padding">
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes">All</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes">Link 1</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes">Link 2</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes">Link 3</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes">Link 4</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes">Link 5</Link>
            </Button>
        </ScrollArea>
    )
}