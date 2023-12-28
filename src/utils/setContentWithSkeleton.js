import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const setContentWithSkeleton = (Component, process, data) => {
  switch (process) {
    case "pending":
      return <Skeleton />;
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

export default setContentWithSkeleton;
