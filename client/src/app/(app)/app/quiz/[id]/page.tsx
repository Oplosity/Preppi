"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { useEffect, useState } from "react"



export default function Page ({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [quizData, setQuizData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);


  useEffect(() => {
    async function getQuiz(id: string) {
      try {
        const response = await axios.get(`http://localhost:3001/quiz?quiz_id=${id}`);
        setQuizData(response.data);
        
        const username = await axios.post(`http://localhost:3001/checkAuthentication`, null, {withCredentials: true});

        const response2 = await axios.get(`http://localhost:3001/scores/users?username=${username.data}`);

        if (response2.data === "User has no scores") {
          // no score exists for this quiz

        } else {
          for (let i in response2.data) {
            if (response2.data[i].quiz_id === id) {
              setUserData(response2.data[i].score);
            }
          }
        }

      } catch (error: any) {
        console.error("Error fetching quiz:", error);
        throw error;
      }
    }

    getQuiz(params.id);
  }, [params.id]);

  return(
    <div className="standard-app">
      <Button onClick={() => router.back()} className=""><FontAwesomeIcon icon={faChevronLeft} />&nbsp;&nbsp;Back</Button>
      <h1 className="text-3xl font-bold">{quizData?.[0]?.quiz_name || ""}</h1>
      <p>{quizData?.[0]?.quiz_desc || ""}</p>
      <p className="text-neutral-600 group-hover:text-neutral-900">{userData * 100}% completed</p>
      <Progress value={userData * 100} />
      <Button asChild><Link href={`/app/quiz/${params.id}/run/`}>Start quiz</Link></Button>
      <Button>Start group quiz</Button>
    </div>
  )
}