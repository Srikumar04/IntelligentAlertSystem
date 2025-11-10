import { useEffect, useState } from "react";
import API from "../api/api";
import AlertsTable from "./AlertsTable";
import RulesPanel from "./RulesPanel";
import Charts from "./Charts";
import "./dashboard.css";

export default function Dashboard({ isAdmin }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    API.get("/alerts")
      .then(res => setAlerts(res.data))
      .catch(console.error);
  }, []);

  const open = alerts.filter(a => a.status === "OPEN").length;
  const esc = alerts.filter(a => a.status === "ESCALATED").length;
  const closed = alerts.filter(a => a.status === "AUTO-CLOSED").length;

  return (
    <div className="dash-wrapper">
      <h2 className="dash-title">
        {isAdmin ? "Admin Dashboard" : "User Dashboard"}
      </h2>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Open Alerts</h3>
          <span>{open}</span>
        </div>

        <div className="summary-card">
          <h3>Escalated</h3>
          <span>{esc}</span>
        </div>

        <div className="summary-card">
          <h3>Auto-Closed</h3>
          <span>{closed}</span>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-section">
        <Charts alerts={alerts} />
      </div>

      {/* Alerts table */}
      <div className="table-section">
        <AlertsTable />
      </div>

      {/* Admin Only */}
      {isAdmin && (
        <div className="rules-section">
          <RulesPanel />
        </div>
      )}
    </div>
  );
}
