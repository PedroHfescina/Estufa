import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import estufaImage from "../assets/Estufa.jpg";
import "./Home.scss";
import { Sidebar } from "../components/Sidebar.jsx";

const Home = () => {
  const navigate = useNavigate();

  // Estados para os dados
  const [lampState, setLampState] = useState("off");
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [fanSpeed, setFanSpeed] = useState(0);

  // Configurar EventSource para consumir dados em tempo real
  useEffect(() => {
    const eventSource = new EventSource("http://127.0.0.1:5000/events");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setLampState(data.lightStatus ? "on" : "off");
      setTemperature(data.temperature);
      setHumidity(data.humidity);
      setFanSpeed(data.fanSpeed);
    };

    eventSource.onerror = (error) => {
      console.error("Erro no EventSource:", error);
      eventSource.close();
    };

    // Cleanup
    return () => {
      eventSource.close();
    };
  }, []);

  // Função para enviar atualizações à API
  const sendUpdate = async (endpoint, value) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/update/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [endpoint]: value }),
      });

      if (!response.ok) {
        console.error(`Erro ao atualizar ${endpoint}.`);
      }
    } catch (error) {
      console.error(`Erro ao enviar atualização para ${endpoint}:`, error);
    }
  };

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <div className="text">Home</div>
        <p className="intro-text">
          Bem-vindo ao Dashboard da Estufa! Aqui você pode monitorar e controlar
          aspectos críticos do ambiente da sua estufa.
        </p>
        <div className="container">
          <div className="estufa">
            <img src={estufaImage} alt="estufa" />
            <div className="lamp-container">
              <div className="lamp">Lâmpada:</div>
              <div className={`status-button ${lampState}`}>
                {lampState === "on" ? "Ligada" : "Desligada"}
              </div>
            </div>
          </div>

          <div className="info">
            <div className="status-cards">
              <div className="status-card">
                <label>Temperatura</label>
                <span>{temperature}°C</span>
              </div>
              <div className="status-card">
                <label>Umidade</label>
                <span>{humidity}%</span>
              </div>
              <div className="status-card">
                <label>Velocidade Fan</label>
                <span>{fanSpeed}%</span>
              </div>
            </div>

            <div className="upd">
              <div className="progress-card">
                <label>Temperatura</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={temperature}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setTemperature(value);
                    sendUpdate("temperature", value);
                  }}
                />
                <span>{temperature}°C</span>
              </div>
              <div className="progress-card">
                <label>Umidade</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={humidity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setHumidity(value);
                    sendUpdate("humidity", value);
                  }}
                />
                <span>{humidity}%</span>
              </div>
              <div className="progress-card">
                <label>Velocidade Fan</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fanSpeed}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setFanSpeed(value);
                    sendUpdate("fanSpeed", value);
                  }}
                />
                <span>{fanSpeed}%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-overview">
          <div className="alerts">
            <h2>Alertas Recentes</h2>
            <ul>
              <li>Temperatura excedeu o limite às 10:00</li>
              <li>Nível de umidade estável.</li>
            </ul>
          </div>
        </div>
        <div className="go-to-dashboard">
          <button onClick={() => navigate("/dashboard")}>Ver Gráfico</button>
        </div>
      </section>
    </>
  );
};

export default Home;
