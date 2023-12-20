import { useCallback, useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelServices from "../../services/MarvelService";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
  const [char, setChar] = useState({});

  const character = useMarvelServices();
  const { loading, error, setLoading, getCharacter } = character;
  let timerId = 0;
  const nodeRef = useRef(null);
  const styleInf = true;

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000 + 1)) + 1011000;
    getCharacter(id).then(changeCharState);
  };

  const changeCharState = (char) => {
    setChar(char);
  };

  const onUpdateChar = () => {
    setLoading(true);
    updateChar();
  };

  useEffect(() => {
    updateChar();
    // timerId = setInterval(updateChar, 5000);
  }, []);

  const clearInt = useCallback(() => {
    return clearInterval(timerId);
  }, [error]);

  const spinner = loading ? <Spinner /> : null;
  const view = !(Object.keys(char).length === 0) ? <View char={char} /> : null;
  const errorMessage = error ? <ErrorMessage clearInt={clearInt} /> : null;
  const content = spinner ? spinner : view ? view : errorMessage;

  return (
    <div className="randomchar">
      <CSSTransition
        nodeRef={nodeRef}
        in={Boolean(view)}
        timeout={2000}
        classNames="char"
      >
        <div className="randomchar__block" ref={nodeRef}>
          {content}
        </div>
      </CSSTransition>
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={() => onUpdateChar()}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char: { name, description, thumbnail, detail, wiki } }) => {
  let descr = description
    ? description.slice(0, 197) + "..."
    : "Description not found...";
  let styleImg =
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? { objectFit: "contain " }
      : { objectFit: "cover" };

  return (
    <>
      <img
        src={thumbnail}
        alt={name}
        className="randomchar__img"
        style={styleImg}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{descr}</p>
        <div className="randomchar__btns">
          <a href={detail} className="button button__main">
            <div className="inner">Detail</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </>
  );
};

export default RandomChar;
