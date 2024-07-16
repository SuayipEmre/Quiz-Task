import { IAnswer } from '@/types/Answers'
import Link from 'next/link'
import React from 'react'


type Props = {
  answers: IAnswer[]
}
const AnswersModal: React.FC<Props> = ({ answers }) => {

  return (
    <div className=' xl:p-20  w-full h-full text-white '>
      <h4 className='text-5xl my-4 text-center'>Cevaplarınız</h4>

      <table className='min-w-full'>
        <thead>
          <tr>
            <th>Soru Numarası</th>
            <th>Soru</th>
            <th>Cevabınız</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer, index) => (
            <tr key={index} className='text-center border-t'>
              <td>{answer.questionNumber}</td>
              <td>{answer.questionText}</td>
              <td>{answer.selectedAnswer}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex flex-col xl:flex-row p-10 gap-5'>
        <Link href='/' className='bg-secondary cursor-pointer py-2 px-5 rounded-xl max-w-[200px] '>Ana sayfaya dön</Link>
        <div className='bg-secondary py-2 max-w-[200px] px-5 cursor-pointer rounded-xl ' onClick={() => window.location.reload()}>Quiz'i yeniden çöz</div>
      </div>

    </div>
  )
}

export default AnswersModal