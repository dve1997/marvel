import { Component } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelServices from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  state = {
    char: [],
    loading: true,
    error: false,
  };

  characters = new MarvelServices();
  styleInf = true;

  componentDidMount() {
    this.updateChar();
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

  updateChar = () => {
    this.characters
      .getAllCharacters()
      .then(this.onCharState)
      .catch(this.onErrorMessage);
  };

  render() {
    const { char, loading, error } = this.state;
    const { onIdAtiveCard } = this.props;
    const elements = char.map((item) => {
      return (
        <View
          char={item}
          key={item.id}
          onIdAtiveCard={() => onIdAtiveCard(item.id)}
        />
      );
    });
    const spinner = loading ? <Spinner styleInf={this.styleInf} /> : null;
    const view = !(Object.keys(char).length === 0) ? (
      <View char={char} />
    ) : null;
    const errorMessage = error ? (
      <ErrorMessage styleInf={this.styleInf} />
    ) : null;
    const content = spinner ? spinner : view ? elements : errorMessage;

    return (
      <div className="char__list">
        <ul className="char__grid">{content}</ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

class View extends Component {
  render() {
    const { name, thumbnail } = this.props.char;
    const { onIdAtiveCard } = this.props;
    let styleImg =
      thumbnail ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ? { objectFit: "contain " }
        : { objectFit: "cover" };

    return (
      <li className="char__item" onClick={onIdAtiveCard}>
        <img src={thumbnail} alt={name} style={styleImg} />
        <div className="char__name">{name}</div>
      </li>
    );
  }
}

export default CharList;
