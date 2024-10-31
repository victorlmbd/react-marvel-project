import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"


const Login = () => {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [btn, setBtn] = useState(false);

  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if(email !== '' && password.length > 5){
      setBtn(true)
    } else if (btn)
      setBtn(false)
  }, [email, password, btn])

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    setEmail('');
    setPassword('');
    navigate('/welcome', {replace: true});
  })
  .catch((error) => {
    setError(error.message);
    setEmail('');
    setPassword('');
  });
  }

  const errorMsg = error !== '' && <span>{error}</span>;



  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
      <div className="formBoxLeftLogin">
        </div>
        <div className="formBoxRight">
          <div className="formContent">

            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
              {errorMsg}
              <div className="inputBox">
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" id="email" autoComplete="off" required />
                <label htmlFor="emal">Email</label>
              </div>

              <div className="inputBox">
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" id="password" autoComplete="off" required />
                <label htmlFor="password">Mot de passe</label>
              </div>

              {<button disabled={btn ? false : true} >Connexion</button>}
            </form>

            <div className="linkContainer">
              <Link className="simpleLink" to='/Signup' >Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
