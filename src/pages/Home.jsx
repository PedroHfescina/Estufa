import { useState, useEffect } from "react";
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

  // Estados temporários para os controles deslizantes
  const [tempInput, setTempInput] = useState(0);
  const [humidityInput, setHumidityInput] = useState(0);
  const [fanSpeedInput, setFanSpeedInput] = useState(0);

  // Configurar EventSource para consumir dados em tempo real
  useEffect(() => {
    const eventSource = new EventSource("http://127.0.0.1:5000/events");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      if (data.status === "completed" && data.message === "Process finished!") {
        window.alert("Processo concluído com sucesso!");

        setTempInput(0);

        setHumidityInput(0);

        setFanSpeedInput(0);
      }
        
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
  const sendUpdate = async (jsonData) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      if (!response.ok) {
        console.error(`Erro ao atualizar ${jsonData}.`);
      }
    } catch (error) {
      console.error(`Erro ao enviar atualização para ${jsonData}:`, error);
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
                <label>Temperatura (Atual)</label>
                <span>{temperature}°C</span>
              </div>
              <div className="status-card">
                <label>Umidade (Atual)</label>
                <span>{humidity}%</span>
              </div>
              <div className="status-card">
                <label>Velocidade Fan (Atual)</label>
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
                  value={tempInput}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setTempInput(value);
                    sendUpdate(JSON.stringify({ "temperature": value }));
                  }}
                />
                <span>{tempInput}°C</span>
              </div>
              <div className="progress-card">
                <label>Umidade</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={humidityInput}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setHumidityInput(value);
                    sendUpdate(JSON.stringify({ "humidity": value }));
                  }}
                />
                <span>{humidityInput}%</span>
              </div>
              <div className="progress-card">
                <label>Velocidade Fan</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fanSpeedInput}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setFanSpeedInput(value);
                    sendUpdate(JSON.stringify({ "fanSpeed": value }));
                  }}
                />
                <span>{fanSpeedInput}%</span>
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
            <p>Versão 0.1.0</p>
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
