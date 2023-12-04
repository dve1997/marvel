import { Component } from "react";

import "./errorMessage.scss";
import error from "./Error.png";

class ErrorMessage extends Component {
  state = {
    styleError: null,
  };

  componentDidMount() {
    this.setState({
      styleError: this.props.styleInf,
    });
  }

  render() {
    const styleImg = this.state.styleError ? { gridColumn: "2/2" } : null;

    return <img src={error} alt="Error loading" style={styleImg} />;
  }
}

export default ErrorMessage;
