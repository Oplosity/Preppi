"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Progress } from "@/components/ui/progress";
import { count } from "console";
import { QuizContext } from "../provider";

const serverUrl = process.env.SERVER_URL || ""

function InputQuestion () {
  return(
    <div className="w-full bg-[url('/landing/landing-bg.svg')] bg-no-repeat bg-cover rounded-xl p-3">
      <h2>What is kdjfjkdfkjfd?</h2>
      <p>Write answer</p>
    </div>
  )
}

function ChoiceQuestion ({answer, setAnswer, question, options}: {answer: string, setAnswer: Dispatch<SetStateAction<string>>, question: string, options: any}) {
  return(
    <div className="w-full bg-[url('/landing/landing-bg.svg')] bg-no-repeat bg-cover rounded-xl p-3">
      <h2 className="text-2xl">{question}</h2>
      <p>Select correct option</p>
      <div className="grid grid-cols-2 grix-rows-2 gap-2">
        <Button variant={answer === options.option1 ? "quizSelectedButton" : "quizUnselectedButton"} onClick={() => setAnswer(options.option1)}>{options.option1}</Button>
        <Button variant={answer === options.option2 ? "quizSelectedButton" : "quizUnselectedButton"} onClick={() => setAnswer(options.option2)}>{options.option2}</Button>
        <Button variant={answer === options.option3 ? "quizSelectedButton" : "quizUnselectedButton"} onClick={() => setAnswer(options.option3)}>{options.option3}</Button>
        <Button variant={answer === options.option4 ? "quizSelectedButton" : "quizUnselectedButton"} onClick={() => setAnswer(options.option4)}>{options.option4}</Button>
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

  const router = useRouter()

  const { userAnswers, setUserAnswers } = useContext(QuizContext)
  const [answer, setAnswer] = useState<string>("")
  const [questionData, setQuestionData] = useState<any>(null);
  const [currentQuestionData, setCurrentQuestionData] = useState<any>({status: "loading"});
  const [questionsNumber, setQuestionsNumber] = useState<number>(0)
  const [progress, setProgress] = useState<number>()


  useEffect(() => {
    async function getQuestion(id: string) {
      try {
        const response = await axios.get(`${serverUrl}quizzes/questions?quiz_id=${id}`);
        setQuestionData(response.data[0].questions);
        setQuestionsNumber(Object.keys(response.data[0].questions).length)
        setProgress(((Number(params.question)-1)/Object.keys(response.data[0].questions).length)*100)
      } catch (error: any) {
        console.error("Error fetching questions:", error);
        throw error;
      }
    }

    getQuestion(params.id);
  }, [params.id, params.question]);

  useEffect(() => {
    if (questionData) {
      const selectedQuestionData = questionData["question"+params.question]
      if(selectedQuestionData){
        selectedQuestionData.status = "exists"
        setCurrentQuestionData(selectedQuestionData);
      }else{
        setCurrentQuestionData({ status: "empty" });

        axios.post(`${serverUrl}checkAuthentication`, null, {withCredentials: true})
        .then((res) => {
          let count = 0;
          const max = Number(params.question) - 1;
          for(let i = 1; i <= max; i++){
            if(questionData["question"+i].answer === userAnswers[i-1]) count++
          }

          const stringCount: string = (count / max).toFixed(2);

          const value = {username: res.data, quiz_id: params.id, score: stringCount};
          axios.post(`${serverUrl}scores`, value);
        });
      }
    }
  }, [params.question, questionData, params.id, userAnswers]);

  const countResult = () => {
    let count = 0;
    const max = Number(params.question) - 1;
    for(let i = 1; i <= max; i++){
      if(questionData["question"+i].answer === userAnswers[i-1]) count++
    }
    return count+"/"+max
  }

  return(
    <>
      <Progress value={progress} />
      { currentQuestionData.status === "exists" ? (
        <>
          <div className="grow">
            <div className="mb-4">
              <h3 className="mb-2">Question {params.question}</h3>
              <ChoiceQuestion answer={answer} setAnswer={setAnswer} question={currentQuestionData?.question || ""} options={currentQuestionData?.options || ""} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => {
              setUserAnswers(current => [...current, answer])
              setAnswer("")
              router.push(`/app/quiz/${params.id}/run/${Number(params.question) + 1}`)
            }}>Next</Button>
          </div>
        </>
      ) : currentQuestionData.status === "empty" ? (
        <>
          <div className="grow">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <FontAwesomeIcon icon={faCheck} className="text-8xl" />
                <h1 className="text-4xl bold">Quiz ended!</h1>
                <p>Result: {countResult()}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
          <Button><Link href="/app/quizzes/">Back to quizzes</Link></Button>
        </div>
      </>
      ) : (
        <>
          <div>Loading</div>
        </>
      ) }
    </>
  )
}