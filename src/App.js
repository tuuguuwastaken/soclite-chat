import React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";
import HeaderMain from "./components/header";
import "./App.scss";
import MainBody from "./components/body";
import LoginPage from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <div className="App">
      <HeaderMain />

      <Routes>
        <Route path="/" element={<MainBody />}>
          
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
