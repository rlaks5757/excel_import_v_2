import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUpperForm from "./AddUpperForm/AddUpperForm";
import AddDetailForm from "./AddDetailForm/AddDetailForm";
import "@progress/kendo-theme-default/dist/all.css";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/upper" element={<AddUpperForm />} />
        <Route path="/lineitem" element={<AddDetailForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
