import React, { forwardRef, useState, useEffect } from 'react'
import { GiTrophyCup } from "react-icons/gi";

import Loader from '../Loader';
import Modal from '../Modal';


const QuizOver = forwardRef((props, ref) => {
  const {
    levelNames,
    score,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions
  } = props;

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;

  console.log(API_PUBLIC_KEY);

  const hash = 'effa9c012a5c03bc5c1982044719b6b5';

  const [askedQuestion, setAskedQuestion] = useState([]);

  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    setAskedQuestion(ref.current)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showModal = (id) => {
    setOpenModal(true);
  }

  const hideModal = () => {
    setOpenModal(false);
  }


  const averageGrade = maxQuestions / 2;


  if (score < averageGrade) {
    setTimeout(() => loadLevelQuestions(0), 5000);
  }


  const decision = score >= averageGrade ? (
    <>
      <div className='stepsBtnContainer'>
        {
          quizLevel < levelNames.length ? (
            <>
              <p className='successMsg'>Bravo, passez au niveau suivant !</p>
              <button
                className='btnResult success'
                onClick={() => loadLevelQuestions(quizLevel)}
              >
                Niveau Suivant
              </button>
            </>
          ) : (
            <>
              <p className='successMsg'>
              <GiTrophyCup size='60px' /> Bravo, vous êtes un expert !
              </p>
              <button
                className='btnResult gameOver'
                onClick={() =>loadLevelQuestions(0)}
              >
                Accueil
              </button>
            </>
          )
        }
      </div>
      <div className='percentage'>
          <div className='progressPercent'>Réussite: {percent} %</div>
          <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
      </div>
    </>
  ) : (
    <>
      <div className='stepsBtnContainer'>
          <p className='failureMsg'>Vous avez échoué !</p>
      </div>

      <div className='percentage'>
          <div className='progressPercent'>Réussite: {percent} %</div>
          <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
      </div>
    </>
  );


  const questionAnswer = score >= averageGrade ? (
    askedQuestion.map((question) => {
      return (
        <tr key={question.id}>
          <td>{question.question}</td>
          <td>{question.answer}</td>
          <td>
            <button
              className='btnInfo'
              onClick={() => showModal(question.heroId)}
            >
              Infos
            </button>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="3">
       <Loader
        styling={{textAlign: 'center', color: 'red'}}
        loadingMsg={"Pas de réponses !"}
       />
      </td>
    </tr>
  );


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
      <Modal showModal={openModal} hideModal={hideModal}>
        <div className='modalHeader'>
          <h2>Titre</h2>
        </div>
        <div className='modalBody'>
          <h3>Titre 2</h3>
        </div>
        <div className='modalFooter'>
          <button className='modalBtn'>Fermer</button>
        </div>
      </Modal>
    </>
  );
});

export default React.memo(QuizOver);
