import { Component } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelServices from "../../services/MarvelService";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.updateChar();
  }

  state = {
    char: {},
    loading: true,
    error: false,
  };

  character = new MarvelServices();

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

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000 + 1)) + 1011000;
    this.character
      .getCharacter(id)
      .then(this.onCharState)
      .catch(this.onErrorMessage);
  };

  render() {
    const { loading, char, error } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const view = !(Object.keys(char).length == 0) ? <View char={char} /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = spinner ? spinner : view ? view : errorMessage;

    return (
      <div className="randomchar">
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, detail, wiki } = char;
  let descr = description
    ? description.slice(0, 197) + "..."
    : "Description not found...";

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{descr}</p>
        <div className="randomchar__btns">
          <a href={detail} className="button button__main">
            <div className="inner">Detail</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;