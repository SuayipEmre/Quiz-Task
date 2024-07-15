import React from 'react'

import { IQuestion } from "@/types/Question"

type Props = {
    step : number,
    question : IQuestion
    handleChoice : (answer : string) => void
    totalQuestion : number
}


const QuestionCard : React.FC<Props> = ({step, handleChoice, question, totalQuestion}) => {
  return (
    <div>
        <div className='flex gap-1'>
          <p>{step + 1} / {totalQuestion} -   </p>
          <h3>{question?.title}</h3>
        </div>

        <div className='grid grid-cols-12 gap-y-12 xl:gap-12 py-12'  >
          {question?.answers?.map((answer, index) => (
            <button className='col-span-12 md:col-span-6 xl:col-span-3 bg-white/20 p-4 rounded-md flex gap-2 items-center' key={index} onClick={() => handleChoice(answer.text)}>
              <p className='bg-slate-400 px-4 py-1 rounded-full text-black  '>
                {answer.option}:
              </p>
              <p>{answer.text}</p>
            </button>
          ))}
        </div>
    </div>
  )
}

export default QuestionCard