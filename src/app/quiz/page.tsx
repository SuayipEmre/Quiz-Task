'use client';

import { useApiCall } from '@/hooks/useApiCall';
import { count } from 'console';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {
  userId: number;
  id: number;
  title: string;
  body: string;
  answers?: { option: string; text: string }[];
};

const Quiz = () => {
  const [quizData, setQuizData] = useState<Props[]>([]);
  const [answersModal, setAnswersModal] = useState(false)
  const [timer, setTimer] = useState(30)
  const [step, setStep] = useState(0);
  const { apiCall, loading, error } = useApiCall();
  
  
  const fetchData = async () => {
    const data = await apiCall('/posts');
    if (data) {
      const parsedData = data.slice(0, 10).map((item: Props) => ({
        ...item,
        answers: parseBodyToAnswers(item.body),
      }));
      setQuizData(parsedData);
    }
  };

  useEffect(() => {
    fetchData()

  }, [])


  useEffect(() => {
    
    const interval = setInterval(() => {
      if(timer > 0 ){
        setTimer(prev => prev -1)
      }

      if(timer == 0 && step < 10){
        setStep(step + 1)
        setTimer(30)
      } else if( step >= 10){
          setAnswersModal(true)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  },[timer])



  const parseBodyToAnswers = (body: string) => {
    const words = body.split(' ');
    const shuffledWords = words.sort(() => 0.5 - Math.random());
    return [
      { option: 'A', text: shuffledWords[0] || '' },
      { option: 'B', text: shuffledWords[1] || '' },
      { option: 'C', text: shuffledWords[2] || '' },
      { option: 'D', text: shuffledWords[3] || '' },
    ];
  };

  const handleChoice = (choice: string) => {
    console.log(' soru : ' + quizData[step].body, ' - cevap :  ' + choice);

    if (step == 9) {
      setAnswersModal(true)
    } else {
      setStep(prev => prev + 1)
      setTimer(30)
    }

  }


  const renderContent = () => {
    if (loading) return <div className='w-full h-full text-green-500'>Quiz Soruları Yükleniyor...</div>
    else if (error) return <div className=''>
      <Link href='/' className='w-full h-full text-red-400'>Quiz soruları yüklenirken hata oluştu. Lütfen Anasayfaya gidip tekrar deneyin.</Link>
    </div>
    return (
      <div className='text-white bg-white/40  xl:p-20 xl:rounded-xl '>
        <div className='bg-black w-10 h-10 flex items-center justify-center rounded-full my-4'>
          {timer}
        </div>

        <div className='flex gap-1'>
          <p>{step + 1} / {quizData.length} - </p>
          <h3>{quizData[step]?.title}</h3>
        </div>
        <div className='grid grid-cols-12 gap-y-12 xl:gap-12 py-12'  >
          {quizData[step]?.answers?.map((answer, index) => (
            <div className='col-span-12 md:col-span-6 xl:col-span-3 bg-white/20 p-4 rounded-md flex gap-2 items-center' key={index} onClick={() => handleChoice(answer.text)}>
              <div className='bg-slate-400 px-4 py-1 rounded-full text-black  '>
                {answer.option}:
              </div>
              <p>{answer.text}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='bg-black  min-w-screen min-h-screen flex items-center justify-center'>
      {
        answersModal ? <></> : renderContent()
      }
    </div>
  );
};

export default Quiz;
