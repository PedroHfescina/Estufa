import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar o hook para navegação
import estufaImage from "../assets/Estufa.jpg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import "./Home.scss";
import { Sidebar } from "../components/Sidebar.jsx";

const data = [
  { name: "0", uv: 40, pv: 10 },
  { name: "04:00", uv: 70, pv: 30 },
  { name: "08:00", uv: 45, pv: 60 },
  { name: "12:00", uv: 90, pv: 85 },
  { name: "16:00", uv: 50, pv: 40 },
  { name: "20:00", uv: 80, pv: 60 },
  { name: "00:00", uv: 20, pv: 70 },
];

const Home = () => {
  const [fan, setFan] = useState(false);
  const [heat, setHeat] = useState(false);
  const [powerOff, setPowerOff] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <div className="text">Home</div>

        <p className="intro-text">
          Bem-vindo ao Dashboard da Estufa! Aqui você pode monitorar e controlar
          aspectos críticos do ambiente da sua estufa. Use os gráficos abaixo
          para observar tendências de temperatura, ajustar as configurações de
          ventilação e aquecimento, e manter tudo otimizado para o crescimento
          saudável das plantas.
        </p>

        <div className="container">
          <div className="estufa">
            <img src={estufaImage} alt="estufa" />
          </div>
          <div className="info">
            <div className="progress-bars">
              <div className="progress-bar">
                <label>Temperatura: 70%</label>
                <progress value="70" max="100"></progress>
              </div>
              <div className="progress-bar">
                <label>Umidade: 50%</label>
                <progress value="50" max="100"></progress>
              </div>
            </div>
            <div className="controls">
              <div className="control-box">
                <label>Ventilador</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={fan}
                    onChange={() => setFan(!fan)}
                  />
                  <span className="slider"></span>
                </label>
                <span>{fan ? "Ligado" : "Desligado"}</span>
              </div>
              <div className="control-box">
                <label>Esquentar</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={heat}
                    onChange={() => setHeat(!heat)}
                  />
                  <span className="slider"></span>
                </label>
                <span>{heat ? "Ligado" : "Desligado"}</span>
              </div>
              <div className="control-box">
                <label>Desligar</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={powerOff}
                    onChange={() => setPowerOff(!powerOff)}
                  />
                  <span className="slider"></span>
                </label>
                <span>{powerOff ? "Ligado" : "Desligado"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="home-overview">
          {/* Alertas Recentes */}
          <div className="alerts">
            <h2>Alertas Recentes</h2>
            <ul>
              <li>Temperatura excedeu o limite às 10:00</li>
              <li>Nível de umidade estável.</li>
            </ul>
          </div>
        </div>

        {/* Botão para ir ao Dashboard */}
        <div className="go-to-dashboard">
          <button onClick={() => navigate("/dashboard")}>Ver Gráfico</button>
        </div>
      </section>
    </>
  );
};

export default Home;
