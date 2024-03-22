import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function OverviewCharts({sales}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={sales}>
        <XAxis
          dataKey="month"
          stroke="#121212"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <CartesianGrid strokeDasharray="2 2" />
        <YAxis
          stroke="#121212"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value}`}
        />
        <Tooltip />
        <Bar dataKey="Sales" fill="#659986" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default OverviewCharts;
