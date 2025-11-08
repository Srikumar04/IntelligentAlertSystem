import { useEffect, useState } from "react";
import API from "../api/api";
import AlertsTable from "./AlertsTable";
import RulesPanel from "./RulesPanel";
import Charts from "./Charts";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    API.get("/alerts").then(res => setAlerts(res.data)).catch(console.error);
  }, []);

  const open = alerts.filter(a => a.status === "OPEN").length;
  const esc = alerts.filter(a => a.status === "ESCALATED").length;
  const closed = alerts.filter(a => a.status === "AUTO-CLOSED").length;

  return (
    <div className="dashboard-container">
      <h2>Intelligent Alert Dashboard</h2>

      <div className="summary-cards">
        <div className="card">Open Alerts: {open}</div>
        <div className="card">Escalated: {esc}</div>
        <div className="card">Auto-Closed: {closed}</div>
      </div>

      <Charts alerts={alerts} />
      <AlertsTable />
      <RulesPanel />
    </div>
  );
}
