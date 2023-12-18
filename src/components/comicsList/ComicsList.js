import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useMarvelServices from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./comicsList.scss";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [comicsEnd, setComicsEnd] = useState(false);
  const [comicsLoading, setComicsLoading] = useState(false);
  const [count, setCount] = useState(215);

  const comicse = useMarvelServices();
  const { loading, error, getComics } = comicse;
  const styleInf = true;

  const updateComics = () => {
    getComics(count, 8).then(changeComicsState).catch(changeErrorMessage);
    setCount((count) => {
      return count + 8;
    });
    setComicsLoading(true);
  };

  const changeComicsState = (comicsNew) => {
    if (comicsNew.length < 8) {
      setComicsEnd(true);
    }

    let arr = [...comics];
    arr.push(...comicsNew);
    setComics(arr);
    setComicsLoading(false);
  };

  const changeErrorMessage = () => {
    setComicsLoading(false);
  };

  useEffect(() => {
    updateComics();
    setComicsLoading(false);
  }, []);

  const elements = comics.map((item) => {
    return <View comics={item} key={item.id} />;
  });
  const spinner = loading ? <Spinner styleInf={styleInf} /> : null;
  const view = !(Object.keys(comics).length === 0) ? (
    <View comics={comics} />
  ) : null;
  const errorMessage = error ? <ErrorMessage styleInf={styleInf} /> : null;
  const content = spinner ? spinner : view ? elements : errorMessage;
  const button = comicsLoading ? (
    <Spinner styleInf={styleInf} />
  ) : (
    <Button updateComics={updateComics} comicsEnd={comicsEnd} />
  );

  return (
    <div className="comics__list">
      <ul className="comics__grid">{content}</ul>
      {button}
    </div>
  );
};

const Button = ({ updateComics, comicsEnd }) => {
  return (
    <button
      className="button button__main button__long"
      onClick={updateComics}
      style={comicsEnd ? { display: "none" } : { display: "block" }}
    >
      <div className="inner">load more</div>
    </button>
  );
};

const View = ({ comics: { id, thumbnail, title, price } }) => {
  return (
    <li className="comics__item">
      <Link to={`/comics/${id}`}>
        <img src={thumbnail} alt={title} className="comics__item-img" />
        <div className="comics__item-name">{title}</div>
        <div className="comics__item-price">{`${price}$`}</div>
      </Link>
    </li>
  );
};

export default ComicsList;
