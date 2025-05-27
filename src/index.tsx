import React from 'react';

import { createRoot } from "react-dom/client";
import { routes } from "./system/routes";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

// import "./styles/reset.css";
// import "./styles/styles.css";
// import "./styles/tiny5/tiny5-regular.ttf";

const root = createRoot(document.body);
root.render(
  <Router>
    <Routes>
      {routes.map((route: any, index: number) => {
        return <Route key={index} path={route.path} element={route.element} />;
      })}
    </Routes>
  </Router>
);