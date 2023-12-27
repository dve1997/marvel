import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelServices from "../../services/MarvelService";
import AppBanner from "../appBanner/AppBanner";

import "./singlePage.scss";

const SingleCharPage = () => {
  const { charName } = useParams();

  const [char, setChar] = useState({});

  const charater = useMarvelServices();
  const { loading, error, getCharacterForName } = charater;

  const updateChar = () => {
    if (!charName) {
      return;
    } else {
      getCharacterForName(charName).then(changeCharState);
    }
  };

  const changeCharState = (char) => {
    setChar(char);
  };

  useEffect(() => {
    updateChar();
  }, []);

  const spinner = loading ? <Spinner /> : null;
  const view = Object.keys(char).length !== 0 ? <View char={char} /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = spinner ? spinner : view ? view : errorMessage;

  return (
    <>
      <HelmetProvider>
        <meta name="description" content="Charaster" />
        <title itemProp="name" lang="en">
          {char.name}
        </title>
      </HelmetProvider>
      <AppBanner />
      <div className="single-comic">{content}</div>
    </>
  );
};

const View = ({ char: { thumbnail, name, description } }) => {
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
