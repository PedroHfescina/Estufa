import { useState, useEffect } from "react";
import "./Dashboard.scss";
import { Sidebar } from "../components/Sidebar.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [chartData, setChartData] = useState([]); 
  const [lampState, setLampState] = useState("Desligada");
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [fanSpeed, setFanSpeed] = useState(0);
  const [status, setStatus] = useState("Normal");


  const fetchChartData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:7766/get_graph_data/");
      const jsonData = await response.json();

      const transformedData = jsonData.map((item) => ({
        timestamp: item.timestamp, 
        Temperatura: parseInt(item.temperature), 
        Umidade: parseInt(item.humidity), 
      }));

      if (jsonData.length > 0) {
        const latestData = jsonData[0];
        setLampState(latestData.light_status ? "Ligada" : "Desligada");
        setTemperature(parseInt(latestData.temperature));
        setHumidity(parseInt(latestData.humidity));
        setFanSpeed(parseInt(latestData.fan_speed));

        if (
          latestData.temperature >= 0 &&
          latestData.temperature <= 50 &&
          latestData.humidity >= 0 &&
          latestData.humidity <= 100 &&
          latestData.fan_speed >= 0 &&
          latestData.fan_speed <= 100
        ) {
          setStatus("Normal");
        } else {
          setStatus("Incomum");
        }
      }

      setChartData(transformedData); 
    } catch (error) {
      console.error("Erro ao buscar dados do gráfico:", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <>
      <Sidebar />
      <section className="dashboard-section">
        <div className="text">Dashboard</div>

        <div className="container4">
          <div className="dashboardBar">
            <ResponsiveContainer width="80%" height={450}>
              <BarChart
                data={chartData} 
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  label={{ value: "Horário", position: "insideBottom", dy: 9 }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tickCount={5}
                  label={{
                    value: "Valores",
                    angle: -90,
                    position: "insideLeft",
                    dy: -10,
                    style: { textAnchor: "middle" },
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="Temperatura" fill="#F44336" name="Temperatura" />
                <Bar dataKey="Umidade" fill="#2196F3" name="Umidade" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="home-overview">
          <div className="current-conditions">
            <h2>Condições Atuais</h2>
            <p>Temperatura: {temperature}°C</p>
            <p>Umidade: {humidity}%</p>
            <p>Velocidade do Fan: {fanSpeed}%</p>
            <p>Status Luz: {lampState}</p>
            <p>Status: {status}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;