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
                <Link href="/app/quizzes/Mathematics">Mathematics</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/Biology">Biology</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/Chemistry">Chemistry</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/History">History</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/Physics">Physics</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/Geography">Geography</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/ComputerScience">Computer Science</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/Literature">Literature</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/Economics">Economics</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/Art">Art</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/Music">Music</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/Philosophy">Philosophy</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/Psychology">Psychology</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/Sociology">Sociology</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/PoliticalScience">Political Science</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/BusinessStudies">Business Studies</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/EnvironmentalScience">Environmental Science</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/HealthEducation">Health Education</Link>
            </Button>
            <Button asChild variant="sidebarButton">
                <Link href="/app/quizzes/ForeignLanguages">Foreign Languages</Link>
            </Button>

        </ScrollArea>
    )
}