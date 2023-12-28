import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Link, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import AppBanner from "../appBanner/AppBanner";
import useMarvelServices from "../../services/MarvelService";
import setContentWithoutSkeleton from "../../utils/setContentWithoutSkeleton";

import "./singlePage.scss";

const SingleComicPage = () => {
  const { comicId } = useParams();

  const [comic, setComic] = useState({});

  const comice = useMarvelServices();
  const { process, setProcess, getComic } = comice;
  const nodeRef = useRef(null);

  const updateComic = () => {
    if (!comicId) {
      return;
    } else {
      getComic(comicId).then(changeComicState);
    }
  };

  const changeComicState = (comic) => {
    setComic(comic);
    setProcess("show");
  };

  useEffect(() => {
    updateComic();
    setProcess("loading");
  }, []);

  const view = Object.keys(comic).length !== 0 ? true : null;

  return (
    <>
      <HelmetProvider>
        <meta name="description" content="Comic" />
        <title itemProp="name" lang="en">
          {comic.title}
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
            {setContentWithoutSkeleton(View, process, comic)}
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

const View = ({ data: { thumbnail, title, description, pages, price } }) => {
  return (
    <>
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{`${pages} pages`}</p>
        <p className="single-comic__descr">Language: en-us</p>
        <div className="single-comic__price">{`${price}$`}</div>
      </div>
      <Link to="/comics">Back to all</Link>
    </>
  );
};

export default SingleComicPage;
