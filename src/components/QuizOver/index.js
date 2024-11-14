import React, { forwardRef, useState, useEffect } from 'react'
import { GiTrophyCup } from "react-icons/gi";
import axios from 'axios';

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
  const hash = 'effa9c012a5c03bc5c1982044719b6b5';

  const [askedQuestion, setAskedQuestion] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [characterData, setCharacterData] = useState([]);
  const [Loading, setLoading] = useState(true);


  useEffect(() => {
    setAskedQuestion(ref.current)

    if (localStorage.getItem('marvelStorageDate')) {
      const date = localStorage.getItem('marvelStorageDate');
      checkDataAge(date);
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkDataAge = (date) => {
    const today = Date.now();
    const timeDifference = today - date;
    const daysDifference = timeDifference / (1000 * 3600 * 24)
    if (daysDifference >= 15) {
      localStorage.clear();
      localStorage.setItem('marvelStorageDate', Date.now())
    }
  }

  const showModal = (id) => {
    setOpenModal(true);

    if (localStorage.getItem(id)) {
      setCharacterData(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
    } else {
        axios
        .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
        .then(response => {
          setCharacterData(response.data);
          setLoading(false);

          localStorage.setItem(id, JSON.stringify(response.data));
          if (!localStorage.getItem('marvelStorageDate')) {
            localStorage.setItem('marvelStorageDate', Date.now());
          }
        })
        .catch(error => console.log(error));
    }
  }

  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
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

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const resultInModal = !Loading ? (
    <>
      <div className='modalHeader'>
        <h2>{characterData.data.results[0].name}</h2>
      </div>
      <div className='modalBody'>
        <div className='comicImage'>
          <img
            src={characterData.data.results[0].thumbnail.path+'.'+characterData.data.results[0].thumbnail.extension}
            alt={characterData.data.results[0].name}
          />
          <p>{characterData.attributionText}</p>
        </div>
        <div className='comicDetails'>
          <h3>Description</h3>
          {
            characterData.data.results[0].description ?
            <p>{characterData.data.results[0].description}</p>
            : <p>Description indisponible ...</p>
          }
          <h3>Plus d'infos</h3>
          {
            characterData.data.results[0].urls &&
            characterData.data.results[0].urls.map((url, index) => {
              return <a
                      key={index}
                      href={url.url}
                      target='_blank'
                      rel='neepenner noreferrer'
                     >
                      {capitalizeFirstLetter(url.type)}
                     </a>
            })

          }
        </div>
      </div>
      <div className='modalFooter'>
        <button className='modalBtn' onClick={hideModal}>Fermer</button>
      </div>
    </>
  ) : (
    <>
      <div className='modalHeader'>
        <h2>Réponse de Marvel</h2>
      </div>
      <div className='modalBody'>
        <Loader />
      </div>
    </>
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
      <Modal showModal={openModal} hideModal={hideModal}>
        {resultInModal}
      </Modal>
    </>
  );
});

export default React.memo(QuizOver);
