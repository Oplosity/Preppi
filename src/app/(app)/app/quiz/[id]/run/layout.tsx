"use client"

import { Dispatch, SetStateAction, createContext, useState } from "react";

export const QuizContext = createContext<{
  userAnswers: (string | undefined)[],
  setUserAnswers: Dispatch<SetStateAction<(string | undefined)[]>>
}>({
  userAnswers: [],
  setUserAnswers: () => {}
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userAnswers, setUserAnswers] = useState<(string | undefined)[]>([])
  return (
    <QuizContext.Provider value={{ userAnswers, setUserAnswers }}>
      <div className="bg-[url('/landing/landing-bg.svg')] bg-no-repeat bg-cover mt-[-74px] pt-[74px] h-screen flex flex-col text-white">
        <div className="standard-app standard-app-padding rounded-xl bg-gradient-to-t from-black/10 to-white/40 grow flex flex-col">
            {children}
        </div>
      </div>
    </QuizContext.Provider>
  )
}