import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TicketsChart = ({ tickets }) => {
  const data = [
    { name: 'New', value: tickets.filter(t => t.status === 'New').length },
    { name: 'Open', value: tickets.filter(t => t.status === 'Open').length },
    { name: 'In Processing', value: tickets.filter(t => t.status === 'In Processing').length },
    { name: 'Closed', value: tickets.filter(t => t.status === 'Closed' || t.status === 'Resolved').length }
  ];

  return (
    <div>
      <h3>Tickets por Estado</h3>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TicketsChart;
