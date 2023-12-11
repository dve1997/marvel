import React, { Component } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelServices from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  state = {
    char: [],
    charEnd: false,
    loading: true,
    charLoading: false,
    error: false,
  };

  characters = new MarvelServices();
  styleInf = true;
  count = 215;

  componentDidMount() {
    this.updateChar();
    this.setState({
      charLoading: false,
    });
  }

  onCharState = (char) => {
    if (char.length < 9) {
      this.setState({
        charEnd: true,
      });
    }

    let arr = [...this.state.char];
    arr.push(...char);
    this.setState({
      char: arr,
      loading: false,
      charLoading: false,
    });
  };

  onErrorMessage = (error) => {
    console.error(error);

    this.setState({
      error: true,
      loading: false,
      charLoading: false,
    });
  };

  updateChar = () => {
    this.characters
      .getAllCharacters(this.count)
      .then(this.onCharState)
      .catch(this.onErrorMessage);
    this.count += 9;
    this.setState({
      charLoading: true,
    });
  };

  render() {
    const { char, loading, error, charLoading, charEnd } = this.state;
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
    const button = charLoading ? (
      <Spinner styleInf={this.styleInf} />
    ) : (
      <Button updateChar={this.updateChar} charEnd={charEnd} />
    );

    return (
      <div className="char__list">
        <ul className="char__grid">{content}</ul>
        {button}
      </div>
    );
  }
}

class Button extends Component {
  render() {
    return (
      <button
        className="button button__main button__long"
        onClick={this.props.updateChar}
        style={this.props.charEnd ? { display: "none" } : { display: "block" }}
      >
        <div className="inner">load more</div>
      </button>
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

CharList.propTypes = {
  onIdAtiveCard: PropTypes.func,
};

export default CharList;
