import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelServices from "../../services/MarvelService";

import "./singleComicPage.scss";

const SingleComicPage = () => {
  const { comicId } = useParams();

  const [comic, setComic] = useState({});

  const comice = useMarvelServices();
  const { loading, error, getComic } = comice;

  const updateComic = () => {
    if (!comicId) {
      return;
    } else {
      getComic(comicId).then(changeCharState);
    }
  };

  const changeCharState = (comic) => {
    setComic(comic);
  };

  useEffect(() => {
    updateComic();
  }, []);

  const spinner = loading ? <Spinner /> : null;
  const view = Object.keys(comic).length !== 0 ? <View comic={comic} /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = spinner ? spinner : view ? view : errorMessage;

  return <div className="single-comic">{content}</div>;
};

const View = ({ comic: { thumbnail, title, description, pages, price } }) => {
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
