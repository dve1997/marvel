import { useCallback, useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import useMarvelServices from "../../services/MarvelService";
import setContentWithoutSkeleton from "../../utils/setContentWithoutSkeleton";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
  const [char, setChar] = useState({});

  const character = useMarvelServices();
  const { process, setProcess, getCharacter } = character;
  let timerId = 0;
  const nodeRef = useRef(null);

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000 + 1)) + 1011000;
    getCharacter(id).then(changeCharState);
  };

  const changeCharState = (char) => {
    setChar(char);
    setProcess("show");
  };

  const onUpdateChar = () => {
    setProcess("loading");
    updateChar();
  };

  useEffect(() => {
    updateChar();
    setProcess("loading");
    // timerId = setInterval(updateChar, 5000);
  }, []);

  const clearInt = useCallback(() => {
    if (process === "error") {
      return clearInterval(timerId);
    }
  }, [process]);

  const view = !(Object.keys(char).length === 0) ? true : null;

  return (
    <div className="randomchar">
      <CSSTransition
        nodeRef={nodeRef}
        in={Boolean(view)}
        timeout={2000}
        classNames="char"
      >
        <div className="randomchar__block" ref={nodeRef}>
          {setContentWithoutSkeleton(View, process, char)}
          {clearInt()}
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

const View = ({ data: { name, description, thumbnail, detail, wiki } }) => {
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
