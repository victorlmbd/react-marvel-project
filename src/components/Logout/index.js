import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';

import { auth } from '../Firebase/firebaseConfig';

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
        <span
          className="slider round"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Déconnexion"
          data-tooltip-place="left"
          data-tooltip-effect="solid"
        />
      </label>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default Logout;
