import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

import Spinner from "../spinner/Spinner";
import useMarvelServices from "../../services/MarvelService";
import setContentList from "../../utils/setContentList";
import setButton from "../../utils/setButton";

import "./comicsList.scss";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [count, setCount] = useState(215);
  const [buttonLoad, setButtonLoad] = useState("loading");

  const comicse = useMarvelServices();
  const { process, setProcess, getComics } = comicse;
  const styleInf = true;
  const nodeRef = useRef(null);

  const updateComics = () => {
    getComics(count, 8).then(changeComicsState).catch(changeErrorMessage);
    setCount((count) => {
      return count + 8;
    });
    setButtonLoad("loading");
  };

  const changeComicsState = (comicsNew) => {
    if (comicsNew.length < 8) {
      setButtonLoad("load");
    }

    let arr = [...comics];
    arr.push(...comicsNew);
    setComics(arr);
    setButtonLoad("pending");
    setProcess("show");
  };

  const changeErrorMessage = () => {
    setButtonLoad("pending");
  };

  useEffect(() => {
    updateComics();
    setButtonLoad("load");
    setProcess("loading");
  }, []);

  const elements = comics.map((item) => {
    return <View comics={item} key={item.id} />;
  });

  const view = !(Object.keys(comics).length === 0) ? (
    <View comics={comics} />
  ) : null;

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
        {setButton(Button, Spinner, buttonLoad, updateComics)}
      </div>
    </CSSTransition>
  );
};

const Button = ({ update }) => {
  return (
    <button className="button button__main button__long" onClick={update}>
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
