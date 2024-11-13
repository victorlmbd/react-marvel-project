import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom";

const Landing = () => {
  const refWolverine = useRef(null);
  const [btn, setBtn] = useState(false);


  useEffect(() => {
    refWolverine.current.classList.add("startingImg");
    setTimeout(() => {
        refWolverine.current.classList.remove("startingImg");
        setBtn(true)
    }, 1000);
  }, []);


  const setImg = (className) => {
    refWolverine.current.classList.add(className);
  };


  const clearImg = () => {
    if (refWolverine.current.classList.contains("leftImg")) {
      refWolverine.current.classList.remove("leftImg");
    } else if (refWolverine.current.classList.contains("rightImg")) {
      refWolverine.current.classList.remove("rightImg");
    }
  };


  const displayBtn = btn && (
    <>
      <div className="leftBox">
        <Link
          to="/signup"
          onMouseOver={() => setImg("leftImg")}
          onMouseOut={clearImg}
          className="btn-welcome"
        >
          Inscription
        </Link>
      </div>
      <div className="rightBox">
        <Link
          to="/login"
          onMouseOver={() => setImg("rightImg")}
          onMouseOut={clearImg}
          className="btn-welcome"
        >
          Connexion
        </Link>
      </div>
    </>
  );

  return (
    <main ref={refWolverine} className="welcomePage">
      {displayBtn}
    </main>
  );
};

export default Landing;
