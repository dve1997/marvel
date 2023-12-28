import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

import Spinner from "../spinner/Spinner";
import useMarvelServices from "../../services/MarvelService";
import setContentList from "../../utils/setContentList";

import "./comicsList.scss";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [comicsEnd, setComicsEnd] = useState(false);
  const [comicsLoading, setComicsLoading] = useState(false);
  const [count, setCount] = useState(215);

  const comicse = useMarvelServices();
  const { process, setProcess, getComics } = comicse;
  const styleInf = true;
  const nodeRef = useRef(null);

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
    setProcess("show");
  };

  const changeErrorMessage = () => {
    setComicsLoading(false);
  };

  useEffect(() => {
    updateComics();
    setComicsLoading(false);
    setProcess("loading");
  }, []);

  const elements = comics.map((item) => {
    return <View comics={item} key={item.id} />;
  });
  const view = !(Object.keys(comics).length === 0) ? (
    <View comics={comics} />
  ) : null;
  const button = comicsLoading ? (
    <Spinner styleInf={styleInf} />
  ) : (
    <Button updateComics={updateComics} comicsEnd={comicsEnd} />
  );

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={Boolean(view)}
      timeout={2000}
      classNames="char"
    >
      <div className="comics__list" ref={nodeRef}>
        <ul className="comics__grid">
          {setContentList(elements, process, styleInf)}
        </ul>
        {button}
      </div>
    </CSSTransition>
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
