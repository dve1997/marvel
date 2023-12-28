import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Link, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import AppBanner from "../appBanner/AppBanner";
import useMarvelServices from "../../services/MarvelService";
import setContentWithoutSkeleton from "../../utils/setContentWithoutSkeleton";

import "./singlePage.scss";

const SingleCharPage = () => {
  const { charName } = useParams();

  const [char, setChar] = useState({});

  const charater = useMarvelServices();
  const { process, setProcess, getCharacterForName } = charater;
  const nodeRef = useRef(null);

  const updateChar = () => {
    if (!charName) {
      return;
    } else {
      getCharacterForName(charName).then(changeCharState);
    }
  };

  const changeCharState = (char) => {
    setChar(char);
    setProcess("show");
  };

  useEffect(() => {
    updateChar();
    setProcess("loading");
  }, []);

  const view = Object.keys(char).length !== 0 ? true : null;

  return (
    <>
      <HelmetProvider>
        <meta name="description" content="Charaster" />
        <title itemProp="name" lang="en">
          {char.name}
        </title>
      </HelmetProvider>
      <CSSTransition
        nodeRef={nodeRef}
        in={view}
        timeout={2000}
        classNames="char"
      >
        <div ref={nodeRef}>
          <AppBanner />
          <div className="single-comic">
            {setContentWithoutSkeleton(View, process, char)}
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

const View = ({ data: { thumbnail, name, description } }) => {
  return (
    <>
      <img src={thumbnail} alt={name} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
      <Link to="/">Back to all</Link>
    </>
  );
};

export default SingleCharPage;
