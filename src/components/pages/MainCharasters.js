import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

const MainCharasters = () => {
  const [idActiveCard, setIdActiveCard] = useState(null);

  const changeIdAtiveCard = (id) => {
    setIdActiveCard(id);
  };

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList changeIdAtiveCard={changeIdAtiveCard} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo idActiceCard={idActiveCard} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainCharasters;
