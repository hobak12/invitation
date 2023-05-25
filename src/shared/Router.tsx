import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Main } from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
