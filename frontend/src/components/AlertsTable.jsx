import { useEffect, useState } from "react";
import API from "../api/api";
import { formatDate } from "../utils/formatter";

export default function AlertsTable() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    API.get("/alerts").then(res => setAlerts(res.data)).catch(console.error);
  }, []);

  return (
    <div className="table-container">
      <h3>All Alerts</h3>
      <table>
        <thead>
          <tr><th>ID</th><th>Type</th><th>Status</th><th>Severity</th><th>Timestamp</th></tr>
        </thead>
        <tbody>
          {alerts.map(a => (
            <tr key={a._id}>
              <td>{a.alertId}</td>
              <td>{a.sourceType}</td>
              <td>{a.status}</td>
              <td>{a.severity}</td>
              <td>{formatDate(a.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
