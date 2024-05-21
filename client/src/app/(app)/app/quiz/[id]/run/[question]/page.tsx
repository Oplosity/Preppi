"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { QuizContext } from "../layout";

function InputQuestion () {
  return(
    <div className="w-full bg-[url('/landing/landing-bg.svg')] bg-no-repeat bg-cover rounded-xl p-3">
      <h2>What is kdjfjkdfkjfd?</h2>
      <p>Write answer</p>
    </div>
  )
}

function ChoiceQuestion ({answer, setAnswer}: {answer: string, setAnswer: Dispatch<SetStateAction<string>>}) {
  return(
    <div className="w-full bg-[url('/landing/landing-bg.svg')] bg-no-repeat bg-cover rounded-xl p-3">
      <h2 className="text-2xl">What is 9+10?</h2>
      <p>Select correct option</p>
      <div className="grid grid-cols-2 grix-rows-2 gap-2">
        <Button variant={answer === "1" ? "quizSelectedButton" : "quizUnselectedButton"} onClick={() => setAnswer("1")}>Option 1</Button>
        <Button variant={answer === "2" ? "quizSelectedButton" : "quizUnselectedButton"} onClick={() => setAnswer("2")}>Option 2</Button>
        <Button variant={answer === "3" ? "quizSelectedButton" : "quizUnselectedButton"} onClick={() => setAnswer("3")}>Option 3</Button>
        <Button variant={answer === "4" ? "quizSelectedButton" : "quizUnselectedButton"} onClick={() => setAnswer("4")}>Option 4</Button>
      </div>
    </div>
  )
}

function FillInTheBlankQuestion () {
  return(
    <div className="w-full bg-[url('/landing/landing-bg.svg')] bg-no-repeat bg-cover rounded-xl p-3">
      <h2>Fill in the blank</h2>
      <p>This is a test question (input) This is a test question</p>
    </div>
  )
}

export default function Page({ params }: { params: { id: string; question: string; } }){
  const { userAnswers, setUserAnswers } = useContext(QuizContext)

  const [answer, setAnswer] = useState<string>("")

  return(
    <>
      {userAnswers}
      <div className="grow">
        {/*     <div className="mb-4">
          <p>Question 1</p>
          <InputQuestion />
        </div> */}
        <div className="mb-4">
          <h3 className="mb-2">Question {params.question}</h3>
          <ChoiceQuestion answer={answer} setAnswer={setAnswer} />
        </div>
        {/*     <div className="mb-4">
          <p>Question 3</p>
          <FillInTheBlankQuestion />
        </div> */}
      </div>
      <div className="flex justify-end">
        <Button onClick={() => {
          setUserAnswers((prevUserAnswers: (string | undefined)[]) => [...prevUserAnswers, "asd"])
        }}>asd</Button>
        <Button asChild><Link href={`/app/quiz/${params.id}/run/${Number(params.question) + 1}`}>Next</Link></Button>
      </div>
    </>
  )
}