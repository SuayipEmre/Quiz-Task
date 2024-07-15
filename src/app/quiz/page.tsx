'use client';

import AnswersModal from '@/components/AnswersModal';
import QuestionCard from '@/components/QuestionCard';
import { useApiCall } from '@/hooks/useApiCall';
import WarningIcon from '@/icons/WarningIcon';
import { IAnswer } from '@/types/Answers';
import { IQuestion } from '@/types/Question';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';





const Quiz = () => {
  const [quizData, setQuizData] = useState<IQuestion[]>([]);
  const [answersModal, setAnswersModal] = useState(false)
  const [answers, setAnswers] = useState<IAnswer[]>([])
  const [timer, setTimer] = useState(30)
  const [step, setStep] = useState(0);
  const { apiCall, loading, error } = useApiCall();


  const fetchData = async () => {
    const data = await apiCall('/posts');
    if (data) {
      const parsedData = data.slice(0, 10).map((item: IQuestion) => ({
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
      if (timer > 0) {
        setTimer(prev => prev - 1)
      }

      if (timer == 0 && step < 10) {
        const answer = {
          questionNumber: step + 1,
          questionText: quizData[step].title,
          selectedAnswer: ''
        }
        setAnswers(prev => [...prev, answer])
        setStep(step + 1)
        setTimer(30)
      } else if (step >= 10) {
        setAnswersModal(true)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [timer])



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
    const answer = {
      questionNumber: step + 1,
      questionText: quizData[step].title,
      selectedAnswer: choice
    }

    if (step == 9) {
      setAnswersModal(true)
      setAnswers(prev => [...prev, answer])
    } else {
      setStep(prev => prev + 1)
      setTimer(30)
      setAnswers(prev => [...prev, answer])

    }

  }



  const renderContent = () => {
    if (loading) return <div className='w-full h-full text-green-500'>Quiz Soruları Yükleniyor...</div>
    else if (error) return <div className=''>
      <Link href='/' className='w-full h-full text-red-400'>Quiz soruları yüklenirken hata oluştu. Lütfen Anasayfaya gidip tekrar deneyin.</Link>
    </div>
    return (
      <div className='text-white bg-[#2b3945]  xl:p-20 xl:rounded-xl '>
        <div className='flex items-center gap-2 animate-bounce'>
          <WarningIcon />
          <p>İlk 10 saniye sorular yanıtlanamaz!</p>
        </div>
        <div className='bg-black w-10 h-10 flex items-center justify-center rounded-full my-4'>
          {timer}
        </div>

        <QuestionCard
          handleChoice={handleChoice}
          question={quizData[step]}
          step={step}
          totalQuestion={quizData.length}
          timer={timer}
        />
      </div>
    )
  }

  return (
    <div className='bg-[#202c37]  min-w-screen min-h-screen flex items-center justify-center'>
      {
        answersModal ? <AnswersModal answers={answers} /> : renderContent()
      }
    </div>
  );
};

export default Quiz;
