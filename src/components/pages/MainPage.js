import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharSearch from "../charSearch/CharSearch";

import decoration from "../../resources/img/vision.png";

const MainPage = () => {
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
        <div className="char__bar">
          <ErrorBoundary>
            <CharInfo idActiceCard={idActiveCard} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearch />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
