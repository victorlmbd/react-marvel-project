import React, { forwardRef, useState, useEffect } from 'react'

const QuizOver = forwardRef((props, ref) => {

  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent
  } = props;

  const [askedQuestion, setAskedQuestion] = useState([]);

  useEffect(() => {
    setAskedQuestion(ref.current)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const averageGrade = maxQuestions / 2;

  const decision = score >= averageGrade ? (
    <>
      <div className='stepsBtnContainer'>
        {
          quizLevel < levelNames.lenght ? (
            <>
              <p className='successMsg'>Bravo, vous êtes un expert !</p>
              <button className='btnResult success'>Niveau Suivant</button>
            </>
          )
          :
          (
            <>
              <p className='successMsg'>Bravo, passez au niveau suivant !</p>
              <button className='btnResult gameOver'>Niveau Suivant</button>
            </>
          )
        }
      </div>
      <div className='percentage'>
          <div className='progressPercent'>Réussite: {percent} %</div>
          <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
      </div>
    </>
  )
  :
  (
    <>
      <div className='stepsBtnContainer'>
          <p className='failureMsg'>Vous avez échoué !</p>
      </div>

      <div className='percentage'>
          <div className='progressPercent'>Réussite: {percent} %</div>
          <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
      </div>
    </>
  )
  const questionAnswer = score >= averageGrade ? (
    askedQuestion.map((question) => {
      return (
        <tr key={question.id}>
          <td>{question.question}</td>
          <td>{question.answer}</td>
          <td>
            <button className='btnInfo'>Infos</button>
          </td>
        </tr>
      )
    })
  )
  :
  (
    <tr>
      <td colSpan="3">
        <p style={{textAlign: 'center', color: 'red'}}>
          Pas de réponses !
        </p>
      </td>
    </tr>
  )


  return (
    <>

     {decision}

      <hr />
      <p>Les réponses aux questions posées:</p>

      <div className='answerContainer'>
        <table className='answers'>
          <thead>
            <tr>
              <th>Questions</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>
            {questionAnswer}
          </tbody>
        </table>
      </div>
    </>
  )
})

export default React.memo(QuizOver);
