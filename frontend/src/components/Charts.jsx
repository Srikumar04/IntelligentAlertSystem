import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export default function Charts({ alerts }) {
  const trendData = alerts.reduce((acc, alert) => {
    const day = new Date(alert.timestamp).toLocaleDateString();
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(trendData).map(([day, count]) => ({ day, count }));

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Alerts Trend</h3>
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="count" stroke="#007bff" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}
