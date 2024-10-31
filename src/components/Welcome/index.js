import Logout from "../Logout";
import Quiz from "../Quiz";
import { useState, useEffect } from "react";
import { auth } from "../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSession(user);
      } else if (!isLoggingOut) {
        navigate('/');
      }
      setIsLoading(false);
    });

    return () => listener();
  }, [navigate, isLoggingOut]);

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
        <Quiz />
      </div>
    </div>
  );
};

export default Welcome;
