import Header from "@/components/header";
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { Bungee } from "next/font/google";

const bungee = Bungee({ subsets: ["latin"], weight: "400" });

function Quiz(){
    return(
        <div>
            <div className="relative aspect-[16/9] h-48">
                <Image src="/landing/quizzes/maths.jpg" alt="Mathematics illustration" fill />
            </div>
        </div>
    )
}

export default function Home() {
  return (
    <main className="">
        <div className="w-full min-h-[80vh] md:h-[80vh] bg-[url('/landing/landing-bg.svg')] bg-no-repeat bg-cover customCorner flex flex-col">
            <Header/>
            <div className="standard-page flex-col-reverse md:flex-row flex h-full space-y-8 space-y-reverse md:space-x-16 items-center">
                <div className="md:flex-1">
                    <h1 className={`${bungee.className} text-white text-2xl xl:text-3xl mb-3 text-pretty`}>BOOST YOUR EXAM PREP WITH TAILORED QUIZZES AND PERSONALIZED STUDY PLANS FROM PREPPI!</h1>
                    <Button>Join</Button>
                </div>
                <div className="md:flex-1">
                    <Image src="/landing/online-learning.png" alt="" width={1620} height={960} quality={100} /> 
                </div>
            </div>
        </div>
        <div className="standard-page">
            <h2 className="text-2xl font-extrabold">Quizzes</h2>
            <div className="flex">
                <Quiz />
                <Quiz />
                <Quiz />
                <Quiz />
                <Quiz />
                <Quiz />
            </div>
        </div>
    </main>
  );
}
