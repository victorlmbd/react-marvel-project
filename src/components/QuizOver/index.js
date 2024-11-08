import React, { forwardRef, useState, useEffect } from 'react'

const QuizOver = forwardRef((props, ref) => {

  const [askedQuestion, setAskedQuestion] = useState([]);

  useEffect(() => {
    setAskedQuestion(ref.current)
  }, [ref])

  const questionAnswer = askedQuestion.map((question) => {
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


  return (
    <>
      <div className='stepsBtnContainer'>
        <p className='successMsg'>Bravo, vous êtes un expert !</p>
        <button className='btnResult success'>Niveau Suivant</button>
      </div>

      <div className='percentage'>
        <div className='progressPercent'>Réussite: 10%</div>
        <div className='progressPercent'>Note: 10/10</div>
      </div>

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
