import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelServices from "../../services/MarvelService";

import "./charInfo.scss";

const CharInfo = ({ idActiceCard }) => {
  const [char, setChar] = useState({});
  const [skeleton, setSkeleton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // static defaultProps = {
  //   res: "yes",
  // };

  const character = new MarvelServices();

  const updateChar = () => {
    if (!idActiceCard) {
      return;
    } else {
      changeUpdateChar();
      character
        .getCharacter(idActiceCard)
        .then(changeCharState)
        .catch(changeErrorMessage);
    }
  };

  const changeUpdateChar = () => {
    setLoading(true);
    setSkeleton(false);
  };

  const changeCharState = (char) => {
    setChar(char);
    setLoading(false);
  };

  const changeErrorMessage = (error) => {
    setError(true);
    setLoading(false);

    console.error(error);
  };

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    updateChar();
  }, [idActiceCard]);

  // console.log(this.props.res);

  const skeletonStart = skeleton ? <Skeleton /> : null;
  const spinner = loading ? <Spinner /> : null;
  const view = Object.keys(char).length !== 0 ? <View char={char} /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = skeletonStart
    ? skeletonStart
    : spinner
    ? spinner
    : view
    ? view
    : errorMessage;

  return <div className="char__info">{content}</div>;
};

const View = ({
  char: { name, description, thumbnail, detail, wiki, comics },
}) => {
  let descr = description
    ? description.slice(0, 297) + "..."
    : "Description not found...";
  let id = 0;
  let styleImg =
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? { objectFit: "contain " }
      : { objectFit: "cover" };
  const comicsItem =
    comics.length !== 0 ? (
      comics.map((item, i) => {
        if (i < 10) {
          return <ComicsItem name={item.name} key={id++} />;
        }
      })
    ) : (
      <li className="char__comics-item">{"Commics not found..."}</li>
    );

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={styleImg} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={detail} className="button button__main">
              <div className="inner">detail</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{descr}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{comicsItem}</ul>
    </>
  );
};

const ComicsItem = ({ name }) => {
  return <li className="char__comics-item">{name}</li>;
};

CharInfo.propTypes = {
  idActiceCard: PropTypes.number,
};

// CharInfo.defaultProps = {
//   res: "yes",
// };

export default CharInfo;
