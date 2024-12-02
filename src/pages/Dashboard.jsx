import React from "react";
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

const data = [
  { name: "0", Umidade: 40, Temperatura: 10 },
  { name: "04:00", Umidade: 70, Temperatura: 30 },
  { name: "08:00", Umidade: 74, Temperatura: 44 },
  { name: "12:00", Umidade: 90, Temperatura: 85 },
  { name: "16:00", Umidade: 65, Temperatura: 70 },
  { name: "20:00", Umidade: 55, Temperatura: 80 },
  { name: "00:00", Umidade: 35, Temperatura: 87 },
];

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <section className="dashboard-section">
        <div className="text">Dashboard</div>

        <div className="container4">
          <div className="dashboardBar">
            <ResponsiveContainer width="80%" height={450}>
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  label={{ value: "Horas", position: "insideBottom", dy: 9 }}
                />
                <YAxis
                  domain={[0, 100]}
                  tickCount={5}
                  label={{
                    value: "Temperatura (°C)",
                    angle: -90,
                    position: "insideLeft",
                    dy: -10,
                    style: { textAnchor: "middle" },
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="Umidade" fill="#2196F3" />
                <Bar dataKey="Temperatura" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="home-overview">
          <div className="current-conditions">
            <h2>Condições Atuais</h2>
            <p>Temperatura: 22°C</p>
            <p>Umidade: 55%</p>
            <p>Status: Normal</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
