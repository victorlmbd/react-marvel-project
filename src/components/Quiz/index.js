import React, { Component } from 'react';
import { Bounce, Flip, toast,ToastContainer , Zoom } from 'react-toastify';
import { FaChevronRight } from "react-icons/fa6";

import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import QuizMarvel from '../quizMarvel';
import QuizOver from '../QuizOver';

import 'react-toastify/dist/ReactToastify.css';


const initialState = {
  quizLevel: 0,
  maxQuestions: 10,
  storedQuestions: [],
  question: null,
  options: [],
  idQuestion: 0,
  btnDisabled: true,
  userAnswer: null,
  score: 0,
  showWelcomeMsg: false,
  quizEnd: false,
  percent: null
};

const levelNames = ["Debutant", "Confirme", "Expert"];

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.storedDataRef = React.createRef();
  }


  componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizLevel]);
  }


  componentDidUpdate(prevProps, prevState) {
    const {
      maxQuestions,
      storedQuestions,
      idQuestion,
      score,
      quizEnd,
    } = this.state;

    if (storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options
      });
    }

    if (idQuestion !== prevState.idQuestion) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }

    if (quizEnd !== prevState.quizEnd) {
      const  gradePercent = this.getPourcentage(maxQuestions, score);
      this.gameOver(gradePercent);
    }

    if (prevProps.userData.pseudo && !this.props.userData.pseudo) {
      this.setState({ showWelcomeMsg: false });
    }
    else if (this.props.userData.pseudo !== prevProps.userData.pseudo && this.props.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo);
    }
  }


  loadQuestions = (level) => {
    const fetchedArray = QuizMarvel.quizz[level]
    if (fetchedArray && fetchedArray.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArray;
      const newArray = fetchedArray.map(({answer, ...keepRest}) => keepRest);
      this.setState({ storedQuestions: newArray });
    } else {
      console.error("Pas de questions disponibles");
    }
  }

  showToastMsg = pseudo => {
    if (!this.state.showWelcomeMsg && pseudo !== '') {
      this.setState({ showWelcomeMsg: true });

      toast(`Bienvenue ${pseudo} et bonne chance !`, {
        bodyClassName: "toastify-bg-color",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        style: { backgroundColor: '#edb90c' },
        transition: Zoom
      });
    }
  }


  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false
    });
  }


  nextQuestion = () => {
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    const isLastQuestion = this.state.idQuestion === this.state.maxQuestions - 1;

    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({ score: prevState.score + 1 }));

      toast.success('Bravo +1', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    } else {
      toast.error('Raté', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    if (isLastQuestion) {
      setTimeout(() => {
        this.setState({ quizEnd: true });
      }, 1500);
    } else {
      this.setState(prevState => ({ idQuestion: prevState.idQuestion + 1 }));
    }
  }


  getPourcentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;


  gameOver = percent => {
    if (percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel +1,
        percent
      });
    } else {
      this.setState({percent});
    }
  }


  loadLevelQuestions = (param) => {
    this.setState({
      ...initialState,
      quizLevel: param,
      showWelcomeMsg: false
    });
    this.loadQuestions(levelNames[param]);
  }

  render() {

    const {
      quizLevel,
      maxQuestions,
      question,
      options,
      idQuestion,
      btnDisabled,
      userAnswer,
      score,
      quizEnd,
      percent
    } = this.state;

    const buttonLabel = idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer";

    const displayOptions = options.map((option, index) => (
        <p
          key={index}
          className={`answerOptions ${userAnswer === option ? "selected" : null}`}
          onClick={() => this.submitAnswer(option)}
        >
           <FaChevronRight /> {option}
        </p>
    ));

    return quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestions={this.loadLevelQuestions}
      />
    ) : (
      <>
        <Levels quizLevel={quizLevel} levelNames={levelNames} />
        <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions} />
        <h2>{question}</h2>

        {displayOptions}

        <button
          disabled={btnDisabled}
          className='btnSubmit'
          onClick={this.nextQuestion}
        >
          {buttonLabel}
        </button>

        <ToastContainer />
      </>
    );
  }
}

export default Quiz;
