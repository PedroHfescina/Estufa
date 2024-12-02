import "./Config.scss";
import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar.jsx";

const Config = () => {

  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <>
      <Sidebar />

      <section className="config-section">
        <div className="text">Configuração</div>
        
      </section>
    </>
  );
};

export default Config;
