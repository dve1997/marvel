import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const setContentWithoutSkeleton = (Component, process, data) => {
  switch (process) {
    case "pending":
      return null;
    case "loading":
      return <Spinner />;
    case "show":
      return <Component data={data} />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Error");
  }
};

export default setContentWithoutSkeleton;
