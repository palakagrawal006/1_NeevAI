import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function RechartSetup({ charts }) {
  if (!charts || charts.length === 0) return null;
  const COLORS = ["#16325B", "#06b6d4", "#3b82f6", "#8b5cf6", "#f59e0b"];

  return (
    <div className="space-y-8">
      {/* multiple charts can be generated, array returned */}

      {charts.map((chart, index) => (
        <div
          key={index}
          className="border border-slate-100 rounded-2xl p-4 bg-slate-50"
        >
          <h4 className="font-semibold text-gray-800 mb-3">📊 {chart.title}</h4>

          <div style={{ width: "100%", height: 300 }}>

            <ResponsiveContainer width="100%" height="100%">
              
              {chart.type === "bar" ? (
                <BarChart data={chart.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              ) : chart.type === "line" ? (
                <LineChart data={chart.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    dataKey="value"
                    type="monotone"
                    stroke="#06b6d4"
                    strokeWidth={3}
                  />
                </LineChart>
              ) : (
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={chart.data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RechartSetup;
