import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  const disabled = email === "";



  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget">
        </div>
        <div className="formBoxRight">
          <div className="formContent">

            {
              success && <span
                style={{
                border: "1px solid green",
                background: "green",
                color: "#ffffff"
              }}
              >
                  {success}
              </span>
            }

            {error && <span>{error.message}</span>}

            <h2>Mot de passe oublié?</h2>
            <form onSubmit={handleSubmit}>

              <div className="inputBox">
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" id="email" autoComplete="off" required />
                <label htmlFor="email">Email</label>
              </div>

              <button disabled={disabled}>Récupérer</button>

            </form>

            <div className="linkContainer">
              <Link className="simpleLink" to='/login'>Déjà inscrit ? Connectez-vous ici</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
