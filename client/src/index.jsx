import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import { Walkers } from "./Walkers";
import { AvailableDogs } from "./AvailableDogs";
import { Cities } from "./Cities";
import { EditWalker } from "./EditWalker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/walkers" element={<Walkers />} />
        <Route path="/walkers/:walkerId/dogs" element={<AvailableDogs />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/walkers/:walkerId/edit" element={<EditWalker />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
