import { useState, useEffect } from "react";
import { auth, user } from "../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import Logout from "../Logout";
import Quiz from "../Quiz";

const Welcome = () => {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSession(user);
      } else if (!isLoggingOut) {
        navigate('/');
      }
      setIsLoading(false);
    });

    if (userSession) {
      const colRef = user(userSession.uid);
      getDoc(colRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const docData = snapshot.data();
            setUserData(docData);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données:", error);
        });
    }

    return () => listener();
  }, [navigate, isLoggingOut, userSession]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <>
        <div className="loader"></div>
        <p className="loaderText">Loading...</p>
      </>
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
