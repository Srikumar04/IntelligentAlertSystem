import { useState, useEffect } from "react";
import API from "../api/api";

export default function RulesPanel() {
  const [rules, setRules] = useState([]);
  const [type, setType] = useState("");
  const [config, setConfig] = useState("{}");

  const fetchRules = async () => {
    const res = await API.get("/rules");
    setRules(res.data);
  };

  useEffect(() => { fetchRules(); }, []);

  const addRule = async (e) => {
    e.preventDefault();
    try {
      await API.post("/rules", { type, config: JSON.parse(config) });
      fetchRules();
      alert("Rule updated");
    } catch (err) {
      alert("Invalid JSON or error saving rule");
    }
  };

  return (
    <div className="rules-container">
      <h3>Manage Rules</h3>
      <form onSubmit={addRule}>
        <input placeholder="Rule Type (e.g., overspeed)" onChange={(e) => setType(e.target.value)} />
        <textarea placeholder='Config JSON {"escalate_if_count":3,"window_mins":60}' onChange={(e) => setConfig(e.target.value)} />
        <button type="submit">Save Rule</button>
      </form>

      <h4>Existing Rules</h4>
      <ul>
        {rules.map(r => (
          <li key={r._id}>
            <strong>{r.type}:</strong> {JSON.stringify(r.config)}
          </li>
        ))}
      </ul>
    </div>
  );
}
