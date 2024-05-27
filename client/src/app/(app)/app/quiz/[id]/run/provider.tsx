
"use client"

import { Dispatch, SetStateAction, createContext, useState } from "react";

export const QuizContext = createContext<{
  userAnswers: (string | undefined)[],
  setUserAnswers: Dispatch<SetStateAction<(string | undefined)[]>>
}>({
  userAnswers: [],
  setUserAnswers: () => {}
})
export default function QuizProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userAnswers, setUserAnswers] = useState<(string | undefined)[]>([])
  return(
    <QuizContext.Provider value={{ userAnswers, setUserAnswers }}>
      {children}
    </QuizContext.Provider>
  )
}