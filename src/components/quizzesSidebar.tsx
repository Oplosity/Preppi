import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "./ui/button"
import Link from "next/link"


export default function QuizzesSidebar () {
    return(
        <ScrollArea className="w-full h-full bg-[url('/landing/landing-bg.svg')] bg-no-repeat bg-cover standard-app-padding">
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/all">All</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/link1">Link 1</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/link2">Link 2</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/link3">Link 3</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/link4">Link 4</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/link5">Link 5</Link>
            </Button>
        </ScrollArea>
    )
}