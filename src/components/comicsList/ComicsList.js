import { useState, useEffect } from "react";

import useMarvelServices from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./comicsList.scss";

const ComicsList = () => {
  const [char, setChar] = useState([]);
  const [charEnd, setCharEnd] = useState(false);
  const [charLoading, setCharLoading] = useState(false);
  const [count, setCount] = useState(215);

  const characters = useMarvelServices();
  const { loading, error, getAllCharacters } = characters;
  const styleInf = true;

  const updateChar = () => {
    getAllCharacters(count, 8).then(changeCharState).catch(changeErrorMessage);
    setCount((count) => {
      return count + 8;
    });
    setCharLoading(true);
  };

  const changeCharState = (charNew) => {
    if (charNew.length < 8) {
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
    return <View char={item} key={item.id} />;
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
    <div className="comics__list">
      <ul className="comics__grid">{content}</ul>
      {button}
    </div>
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

const View = ({ char: { detail, thumbnail, name, description } }) => {
  let descr = description
    ? description.slice(0, 47) + "..."
    : "Description not found...";

  return (
    <li className="comics__item">
      <a href={detail}>
        <img src={thumbnail} alt={name} className="comics__item-img" />
        <div className="comics__item-name">{name}</div>
        <div className="comics__item-description">{descr}</div>
      </a>
    </li>
  );
};

export default ComicsList;
