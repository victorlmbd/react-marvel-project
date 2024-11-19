import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth, users } from "../Firebase/firebaseConfig";
import Loader from "../Loader";
import Logout from "../Logout";
import Quiz from "../Quiz";


const Welcome = () => {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let listener = null;

    if (!isLoggingOut) {
      listener = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserSession(user);
        } else {
          navigate('/');
        }
        setIsLoading(false);
      });
    }

    return () => {
      if (listener) listener();
    };
  }, [navigate, isLoggingOut]);

  useEffect(() => {
    if (userSession && !isLoggingOut) {
      const colRef = users(userSession.uid);
      getDoc(colRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.data());
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données:", error);
        });
    }
  }, [userSession, isLoggingOut]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setUserSession(null);
    setUserData({});
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  if (isLoading) {
    return (
      <Loader
        loadingMsg={"Authentification ..."}
        styling={{textAlign: 'center', color: '#FFFFFF'}}
     />
    );
  }

  return (
    <div className="quiz-bg">
      <div className="container">
        <Logout onLogout={handleLogout} />
        <Quiz userData={userData}/>
      </div>
    </div>
  );
};

export default Welcome;
