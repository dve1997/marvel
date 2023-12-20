import React, { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelServices from "../../services/MarvelService";

import "./charList.scss";

const CharList = ({ changeIdAtiveCard }) => {
  const [char, setChar] = useState([]);
  const [charEnd, setCharEnd] = useState(false);
  const [charLoading, setCharLoading] = useState(false);
  const [count, setCount] = useState(215);

  const characters = useMarvelServices();
  const { loading, error, getAllCharacters } = characters;
  const styleInf = true;
  const nodeRef = useRef(null);

  const updateChar = () => {
    getAllCharacters(count).then(changeCharState).catch(changeErrorMessage);
    setCount((count) => {
      return count + 9;
    });
    setCharLoading(true);
  };

  const changeCharState = (charNew) => {
    if (charNew.length < 9) {
      setCharEnd(true);
    }

    let arr = [...char];
    arr.push(...charNew);
    setChar(arr);
    setCharLoading(false);
  };

  const changeErrorMessage = () => {
    setCharLoading(false);
  };

  useEffect(() => {
    updateChar();
    setCharLoading(false);
  }, []);

  const elements = char.map((item) => {
    return (
      <View
        char={item}
        key={item.id}
        changeIdAtiveCard={() => changeIdAtiveCard(item.id)}
      />
    );
  });
  const spinner = loading ? <Spinner styleInf={styleInf} /> : null;
  const view = !(Object.keys(char).length === 0) ? <View char={char} /> : null;
  const errorMessage = error ? <ErrorMessage styleInf={styleInf} /> : null;
  const content = spinner ? spinner : view ? elements : errorMessage;
  const button = charLoading ? (
    <Spinner styleInf={styleInf} />
  ) : (
    <Button updateChar={updateChar} charEnd={charEnd} />
  );

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={Boolean(view)}
      timeout={2000}
      classNames="char"
    >
      <div className="char__list" ref={nodeRef}>
        <ul className="char__grid">{content}</ul>
        {button}
      </div>
    </CSSTransition>
  );
};

const Button = ({ updateChar, charEnd }) => {
  return (
    <button
      className="button button__main button__long"
      onClick={updateChar}
      style={charEnd ? { display: "none" } : { display: "block" }}
    >
      <div className="inner">load more</div>
    </button>
  );
};

const View = ({ changeIdAtiveCard, char: { name, thumbnail } }) => {
  let styleImg =
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? { objectFit: "contain " }
      : { objectFit: "cover" };

  return (
    <li className="char__item" onClick={changeIdAtiveCard}>
      <img src={thumbnail} alt={name} style={styleImg} />
      <div className="char__name">{name}</div>
    </li>
  );
};

CharList.propTypes = {
  onIdAtiveCard: PropTypes.func,
};

export default CharList;
