import React from 'react'

import { IQuestion } from "@/types/Question"

type Props = {
  step: number,
  question: IQuestion
  handleAnswerSelection: (answer: string) => void
  totalQuestion: number,
  timer: number
}


const QuestionCard: React.FC<Props> = ({ step, handleAnswerSelection, question, totalQuestion, timer }) => {
  return (
    <div className='w-full  xl-w-auto'>
      
      <div className='flex gap-1'>
        <p className='min-w-14'>{step + 1} / {totalQuestion} -   </p>
        <h3>{question?.body}</h3>
      </div>

      <div className='grid w-full grid-cols-12 gap-x-2 gap-y-12 xl:gap-12 py-12'  >
        {question?.answers?.map((answer, index) => (
          <button
            disabled={timer > 20}
            className={`col-span-12 cursor-pointer md:col-span-6 border border-white xl:col-span-3  p-4 rounded-md flex gap-2 items-center ${timer > 20 && 'opacity-50'}`} key={index} onClick={() => handleAnswerSelection(answer.text)}>
            <p className='px-4 py-1 rounded-full'>
              {answer.option} {`)`}
            </p>
            <p>{answer.text}</p>
          </button>
        ))}
      </div>
    </div>
  )
}



export default QuestionCard