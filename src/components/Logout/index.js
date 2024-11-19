import { useState } from "react";
import { signOut } from "firebase/auth";
import { Tooltip } from 'react-tooltip';
import { auth } from '../Firebase/firebaseConfig';

const Logout = ({ onLogout }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = async (e) => {
    setChecked(e.target.checked);

    if (e.target.checked) {
      try {
        onLogout();
        await signOut(auth);
      } catch (error) {
        console.log('Erreur lors de la déconnexion', error);
        setChecked(false);
      }
    }
  };

  return (
    <div className="logoutContainer">
      <label
        className="switch"
        data-tooltip-id="logout-tooltip"
        data-tooltip-content="Déconnexion"
        data-tooltip-place="left"
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <span className="slider round" />
      </label>
      <Tooltip id="logout-tooltip" />
    </div>
  );
};

export default Logout;
