import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const setContentList = (components, process, styleInf) => {
  switch (process) {
    case "pending":
      return null;
    case "loading":
      return <Spinner styleInf={styleInf} />;
    case "show":
      return components;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Error");
  }
};

export default setContentList;
