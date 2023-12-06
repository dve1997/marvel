import { Component } from "react";

import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: true,
    });
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <h2 style={{ textAlign: "center" }}>Component error</h2>
          <ErrorMessage />
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
