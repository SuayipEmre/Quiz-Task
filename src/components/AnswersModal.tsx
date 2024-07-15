import { IAnswer } from '@/types/Answers'
import React from 'react'


type Props = {
  answers : IAnswer[]
}
const AnswersModal : React.FC<Props> = ({answers}) => {
  
  return (
    <div className=' xl:p-20  w-full h-full text-white '>
      <h4 className='text-5xl my-4 text-center'>Cevaplarınız</h4>
      
      <table className='min-w-full'>
    <thead>
      <tr>
        <th className='py-2'>Soru Sayısı</th>
        <th className='py-2'>Soru</th>
        <th className='py-2'>Cevabınız</th>
      </tr>
    </thead>
    <tbody>
      {answers.map((answer, index) => (
        <tr key={index} className='text-center border-t'>
          <td className='py-2'>{answer.questionNumber}</td>
          <td className='py-2'>{answer.questionText}</td>
          <td className='py-2'>{answer.selectedAnswer}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  )
}

export default AnswersModal