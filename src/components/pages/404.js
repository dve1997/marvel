import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <h2 style={{ textAlign: "center", fontSize: "50px", margin: "0 0 30px" }}>
        Page doesn't exist
      </h2>
      <Link
        to="/"
        style={{
          display: "block",
          textAlign: "center",
          textDecoration: "underline",
        }}
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
