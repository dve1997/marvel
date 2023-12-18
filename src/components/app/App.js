import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainCharasters, Comics, Page404 } from "../pages";

const App = () => {
  return (
    <Router basename="/marvel">
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainCharasters />} />
            <Route path="/comics" element={<Comics />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
