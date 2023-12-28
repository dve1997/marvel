import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import useMarvelServices from "../../services/MarvelService";
import setContentWithSkeleton from "../../utils/setContentWithSkeleton";

import "./charInfo.scss";

const CharInfo = ({ idActiceCard }) => {
  const [char, setChar] = useState({});

  // static defaultProps = {
  //   res: "yes",
  // };

  const character = useMarvelServices();
  const { process, setProcess, getCharacter } = character;
  const nodeRef = useRef(null);

  const updateChar = () => {
    if (!idActiceCard) {
      return;
    } else {
      setProcess("loading");
      getCharacter(idActiceCard).then(changeCharState);
    }
  };

  const changeCharState = (char) => {
    setChar(char);
    setProcess("show");
  };

  useEffect(() => {
    updateChar();
  }, [idActiceCard]);

  // console.log(this.props.res);

  const view = Object.keys(char).length !== 0 ? true : null;

  return (
    <CSSTransition nodeRef={nodeRef} in={view} timeout={2000} classNames="char">
      <div ref={nodeRef} className="char__info">
        {setContentWithSkeleton(View, process, char)}
      </div>
    </CSSTransition>
  );
};

const View = ({
  data: { name, description, thumbnail, detail, wiki, comics },
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
