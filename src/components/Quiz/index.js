import React, { Component } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { QuizMarvel } from '../quizMarvel';
import { ToastContainer, toast, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Quiz extends Component {

  state = {
    levelNames: ["debutant", "confirme", "expert"],
    quizLevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0,
    showWelcomeMsg: false
  }

  storedDataRef = React.createRef();

  loadQuestions = (level) => {
    const fetchedArray = QuizMarvel[0].quizz[level]
    if (fetchedArray.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArray;
      const newArray = fetchedArray.map(({answer, ...keepRest}) => keepRest)

      this.setState({
        storedQuestions: newArray
      })
    } else {
      console.log("Pas assez de questions !!!")
    }
  }

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
        this.setState({
          question: this.state.storedQuestions[this.state.idQuestion].question,
          options: this.state.storedQuestions[this.state.idQuestion].options
        })
    }
    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      })
    }
    if (this.props.userData.pseudo) {
      this.showWelcomeMsg(this.props.userData.pseudo)
    }
  }

  showWelcomeMsg = pseudo => {

    if (!this.state.showWelcomeMsg) {

      this.setState({
        showWelcomeMsg: true
      });

      toast(`Bienvenue ${pseudo} et bonne chance !`, {
      bodyClassName: "toastify-bg-color",  //To style
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Zoom
    });


    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false
    })
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      //end
    } else {
      this.setState(prevState => ({
        idQuestion: prevState.idQuestion + 1
      }))
    }

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1
      }))

      toast.success('Bravo +1', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
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
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });

    }
  }

  render() {

    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p key={index}
           className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
           onClick={() => this.submitAnswer(option)}
        >
           {option}
        </p>

      )
    })


    return (
      <div>
        <Levels />
        <ProgressBar />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button
          disabled={this.state.btnDisabled}
          className='btnSubmit'
          onClick={this.nextQuestion}
        >
          Suivant
        </button>
        <ToastContainer />
      </div>
    )
  }
}

export default Quiz
