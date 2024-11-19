import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

import { auth, users } from "../Firebase/firebaseConfig"

const Signup = () => {


  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [loginData, setLoginData] = useState(data);

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const {pseudo, email, password, confirmPassword} = loginData;;

  const handleChange = (e) => {
  setLoginData({...loginData, [e.target.id]: e.target.value});
  }

  const btn = pseudo === '' || email === '' || password === '' || confirmPassword !== password ?
  <button disabled >Inscription</button> :
  <button >Inscription</button>

  const handleSubmit = e => {
    e.preventDefault();
    const {email, password} = loginData;
    createUserWithEmailAndPassword(auth, email, password)
    .then ((authUser) => {
      return setDoc(users(authUser.user.uid), {
        pseudo,
        email
      })
    })
    .then(() => {
      setLoginData({...data});
      navigate('/Welcome')
    })
    .catch((error) => {
      setError(error)
      setLoginData({...data});
    });
  }

  const errorMsg = error !== '' && <span>{error.message}</span>;



  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup">
        </div>
        <div className="formBoxRight">
          <div className="formContent">
            <form onSubmit={handleSubmit}>
              {errorMsg}
              <h2>Inscription</h2>
              <div className="inputBox">
                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required />
                <label htmlFor="pseudo">Pseudo</label>
              </div>

              <div className="inputBox">
                <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
                <label htmlFor="emal">Email</label>
              </div>

              <div className="inputBox">
                <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
                <label htmlFor="password">Mot de passe</label>
              </div>

              <div className="inputBox">
                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                <label htmlFor="confirmPassword">Confirmer mot de passe</label>
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to='/login' >Déjà inscrit ? Connectez-vous ici</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
