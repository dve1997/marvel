import { HelmetProvider } from "react-helmet-async";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {
  return (
    <>
      <HelmetProvider>
        <meta name="description" content="Page whith list comics" />
        <title itemProp="name" lang="en">
          Page whith list comics
        </title>
      </HelmetProvider>
      <AppBanner />
      <ComicsList />
    </>
  );
};

export default ComicsPage;
