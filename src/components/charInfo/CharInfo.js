import { Component } from "react";

import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelServices from "../../services/MarvelService";

import "./charInfo.scss";

class CharInfo extends Component {
  state = {
    char: {},
    skeleton: true,
    loading: false,
    error: false,
  };

  character = new MarvelServices();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProp) {
    if (this.props.idActiceCard !== prevProp.idActiceCard) {
      this.updateChar();
    }
  }

  onCharState = (char) => {
    this.setState({
      char: char,
      loading: false,
    });
  };

  onErrorMessage = (error) => {
    console.error(error);

    this.setState({
      error: true,
      loading: false,
    });
  };

  onUpdateChar = () => {
    this.setState({
      loading: true,
      skeleton: false,
    });
  };

  updateChar = () => {
    const { idActiceCard } = this.props;
    if (!idActiceCard) {
      return;
    } else {
      this.onUpdateChar();
      this.character
        .getCharacter(idActiceCard)
        .then(this.onCharState)
        .catch(this.onErrorMessage);
    }
  };

  render() {
    const { loading, char, error, skeleton } = this.state;
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
  }
}

class View extends Component {
  render() {
    const { name, description, thumbnail, detail, wiki, comics } =
      this.props.char;
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
  }
}

class ComicsItem extends Component {
  render() {
    const { name } = this.props;

    return <li className="char__comics-item">{name}</li>;
  }
}

export default CharInfo;
