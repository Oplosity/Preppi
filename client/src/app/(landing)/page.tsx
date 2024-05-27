import Header from "@/components/header";
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { Bungee } from "next/font/google";
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Metadata } from 'next'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const bungee = Bungee({ subsets: ["latin"], weight: "400" });

type Tag = {
    title: string;
    key: string;
    variant: "default" | "secondary" | "destructive" | "outline" | "lightOrange" | "lightGreen" | "lightYellow" | "lightPink" | "lightPurple" | "lightBlue" | null | undefined;
}

export const metadata: Metadata = {
  title: 'Home - Preppi',
  description: 'Boost your exam prep with tailored quizzes and personalized study plans from Preppi!',
}

function Quiz({src, alt, title, description, tags}: {src: string, alt: string, title: string, description: string, tags: Tag[]}){
    return(
        <div className="group cursor-default">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
                <Image src={src} alt={alt} fill />
            </div>
            <h4 className="text-xl font-extrabold uppercase mt-4 text-neutral-600 group-hover:text-neutral-900">{title}</h4>
            <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge variant={tag.variant} key={tag.key}>{tag.title}</Badge>
                ))}
            </div>
            <p className="mt-3 text-neutral-600 group-hover:text-neutral-900">{description}</p>
        </div>
    )
}

export default function Home() {
  return (
    <main className="">
        <div className="w-full min-h-[80vh] md:h-[80vh] bg-[url('/landing/landing-bg.svg')] bg-no-repeat bg-cover customCorner flex flex-col mt-[-106px] pt-[106px]">
            <div className="standard-page flex-col-reverse md:flex-row flex h-full space-y-8 space-y-reverse md:space-x-16 items-center">
                <div className="md:flex-1">
                    <h1 className={`${bungee.className} text-white text-2xl xl:text-3xl mb-3 text-pretty`}>BOOST YOUR EXAM PREP WITH TAILORED QUIZZES AND PERSONALIZED STUDY PLANS FROM PREPPI!</h1>
                    <Button asChild><Link href="/app">Check out the quizzes</Link></Button>
                </div>
                <div className="md:flex-1">
                    <Image src="/landing/online-learning.svg" alt="" width={1620} height={960} quality={100} /> 
                </div>
            </div>
        </div>
        <div className="standard-page">
            <h2 className="text-2xl font-extrabold" id="quizzes">Quizzes</h2>
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-between">
                <Quiz
                src="/landing/quizzes/math.jpg"
                alt="Mathematics illustration"
                title="Math"
                description="Ready to test your skills? Take the quiz to evaluate your knowledge and see where you stand. It&apos;s a fun and easy way to challenge yourself and learn something new!"
                tags={[
                    {title: "Algebra", key: "math-algebra", variant: "lightOrange"},
                    {title: "Calculus", key: "math-calculus", variant: "lightGreen"},
                    {title: "Probability", key: "math-probability", variant: "lightYellow"},
                    {title: "Statistics", key: "math-statistics", variant: "lightPink"},
                    {title: "Geometry", key: "math-geometry", variant: "lightPurple"},
                    {title: "Economics", key: "math-economics", variant: "lightBlue"},
                    ]} />
                <Quiz
                src="/landing/quizzes/biology.jpg"
                alt="Biology illustration"
                title="Biology"
                description="Ready to test your skills? Take the quiz to evaluate your knowledge and see where you stand. It&apos;s a fun and easy way to challenge yourself and learn something new!"
                tags={[{title: "hi", key: "biology-hi", variant: "lightOrange"}]} />
                <Quiz
                src="/landing/quizzes/robotics.jpg"
                alt="Robotics illustration"
                title="Robotics"
                description="Ready to test your skills? Take the quiz to evaluate your knowledge and see where you stand. It&apos;s a fun and easy way to challenge yourself and learn something new!"
                tags={[{title: "hi", key: "robotics-hi", variant: "lightOrange"}]} />
            </div>
        </div>
        <div className="standard-page">
            <h2 className="text-2xl font-extrabold">Frequently Asked Questions</h2>
            <p className="mt-2">Got questions? We&apos;ve got answers! Dive into our frequently asked questions below.</p>
            <div className="mt-4 w-full">
                <Accordion type="multiple">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is Preppi free?</AccordionTrigger>
                        <AccordionContent>
                        Yes, Preppi offers great functions for studends free of charge. DONATE MONEY TO US PLEASE
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is Preppi open source?</AccordionTrigger>
                        <AccordionContent>
                        Yes Preppi is fully open source.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How do I report an issue?</AccordionTrigger>
                        <AccordionContent>
                        Send an issue to our <Link className="text-blue-700 hover:text-blue-800" href="https://github.com/Oplosity/preppi">github</Link>. We will make sure to avoid responding for as long as possible.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>How do I keep track of my progress?</AccordionTrigger>
                        <AccordionContent>
                        Our intuitive user interface makes it possible for all users to have no idea what is
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>Is Preppi accessible?</AccordionTrigger>
                        <AccordionContent>
                        Yes, Preppi adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    </main>
  );
}
