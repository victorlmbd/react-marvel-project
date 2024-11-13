import { useState, useEffect } from "react";

import { auth } from '../Firebase/firebaseConfig';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;

    if (checked) {

      onLogout();

      signOut(auth)
        .then(() => {
          timeoutId = setTimeout(() => {
            navigate('/');
          }, 1000);
        })
        .catch((error) => {
          console.log('Erreur lors de la déconnexion', error);
        });
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [checked, navigate, onLogout]);

  const handleChange = e => {
    setChecked(e.target.checked);
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Logout;
