import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import Login from "./pages/Login.jsx";
import Config from "./pages/Config.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Login" element={<Login />} />
          <Route path="Config" element={<Config />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
