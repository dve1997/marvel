const setButton = (CompBut, Spinner, buttonLoad, update) => {
  switch (buttonLoad) {
    case "load":
      return null;
    case "pending":
      return <CompBut update={update} />;
    case "loading":
      return <Spinner />;
    default:
      throw new Error("Error");
  }
};

export default setButton;
