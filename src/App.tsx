import React from "react";
import "./main.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Detail from "./pages/detail/Detail";


function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/details/:id" element={<Detail />} />
      </Routes>
      
    </Router>
  );
}

export default App;
