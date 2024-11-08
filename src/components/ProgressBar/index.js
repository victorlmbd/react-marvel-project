import React from 'react'

const ProgressBar = ({idQuestion, maxQuestions}) => {

  const calculateProgressPercentage = (TotalQuestions, IdQuestion) =>{
    return (IdQuestion / TotalQuestions) * 100
  };

  const currentQuestionNumber = idQuestion + 1;

  const progressPercentage = calculateProgressPercentage(maxQuestions, currentQuestionNumber);
  console.log(progressPercentage);
  return (
    <>
      <div className='percentage'>
        <div className='progressPercent'>{`Question: ${currentQuestionNumber}/${maxQuestions}`}</div>
        <div className='progressPercent'>{`Progression: ${progressPercentage}%`}</div>
      </div>
      <div className='progressBar'>
        <div className='progressBarChange' style={{width: `${progressPercentage}%`}}></div>
      </div>
    </>
  )
}

export default React.memo(ProgressBar);
