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
  const [isAnswersModalOpen, setIsAnswersModalOpen] = useState(false)
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
          selectedAnswer: 'Cevaplanmadı'
        }
        setAnswers(prev => [...prev, answer])
        setStep(step + 1)
        setTimer(30)
      } else if (step >= 10) {
        setIsAnswersModalOpen(true)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [timer])



  //create question options
  const parseBodyToAnswers = (body: string) => {
    const shuffledWords = body.split(' ').sort(() => 0.5 - Math.random())
    return [
      { option: 'A', text: shuffledWords[0] || '' },
      { option: 'B', text: shuffledWords[1] || '' },
      { option: 'C', text: shuffledWords[2] || '' },
      { option: 'D', text: shuffledWords[3] || '' },
    ];
  };

  const handleAnswerSelection = (choice: string) => {
    const answer = {
      questionNumber: step + 1,
      questionText: quizData[step].title,
      selectedAnswer: choice
    }

    if (step == 9) {
      setIsAnswersModalOpen(true)
      setAnswers(prev => [...prev, answer])
    } else {
      setStep(prev => prev + 1)
      setTimer(30)
      setAnswers(prev => [...prev, answer])

    }

  }



  const renderContent = () => {
    if (loading) return <div className='w-full h-full text-green-500'>
      <p>Quiz Soruları Yükleniyor...</p>
    </div>
    else if (error) return <div >
      <Link href='/' className='w-full h-full text-red-400'>Quiz soruları yüklenirken hata oluştu. Lütfen Ana sayfaya gidip tekrar deneyin.</Link>
    </div>
    return (
      <div className='text-white p-5 shadow-white-soft bg-[#2b3945] w-full xl:w-[90%] xl:p-20 xl:rounded-xl '>

        <div className='flex flex-col xl:flex-row items-start xl:items-center justify-between'>
          <p className='bg-third order-2 xl:order-1 text-white w-10 h-10 xl:w-14 xl:h-14 xl:text-xl flex items-center justify-center rounded-full my-4'>
            {timer}
          </p>
          <div className='flex order-1 xl:order-2 items-center gap-2 animate-bounce'>
            <WarningIcon />
            <p>İlk 10 saniye sorular yanıtlanamaz.</p>
          </div>

        </div>

        <QuestionCard
          handleAnswerSelection={handleAnswerSelection}
          question={quizData[step]}
          step={step}
          totalQuestion={quizData.length}
          timer={timer}
        />
      </div>
    )
  }

  return (
    <div className='bg-third  min-w-screen min-h-screen flex items-center justify-center'>
      {
        isAnswersModalOpen ? <AnswersModal answers={answers} /> : renderContent()
      }
    </div>
  );
};

export default Quiz;
