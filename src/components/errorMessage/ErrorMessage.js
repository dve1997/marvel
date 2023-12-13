import { useEffect, useState } from "react";

import "./errorMessage.scss";
import error from "./Error.png";

const ErrorMessage = (props) => {
  const [styleError, setStyleError] = useState(null);

  useEffect(() => {
    setStyleError(props.styleInf);
    props.clearInt();
  }, [styleError]);

  const styleImg = styleError ? { gridColumn: "2/2" } : null;

  return <img src={error} alt="Error loading" style={styleImg} />;
};

export default ErrorMessage;
