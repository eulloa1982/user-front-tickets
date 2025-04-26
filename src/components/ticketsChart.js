import * as React from 'react';
import {
  Drawer, List, ListItem, ListItemButton, ListItemText,
  Divider, Box, Typography
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useState } from 'react';

// Paleta de colores
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

export default function TicketsDrawer({ tickets }) {
  const [selectedChart, setSelectedChart] = useState('status');

  // Agrupar tickets por status
  const ticketsByStatus = tickets.reduce((acc, ticket) => {
    const status = ticket.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const statusChartData = Object.entries(ticketsByStatus).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  // Agrupar tickets por categoría
  const ticketsByCategory = tickets.reduce((acc, ticket) => {
    const category = ticket.category_name || 'Sin Categoría';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.entries(ticketsByCategory).map(([category, count]) => ({
    name: category,
    value: count,
  }));

  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 300, flexShrink: 0 }}>
      <Box sx={{ width: 300, padding: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Reportes
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemButton selected={selectedChart === 'status'} onClick={() => setSelectedChart('status')}>
              <ListItemText primary="Tickets por Estado" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={selectedChart === 'category'} onClick={() => setSelectedChart('category')}>
              <ListItemText primary="Tickets por Categoría" />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Gráfico dinámico */}
        {selectedChart === 'status' && (
          <PieChart width={250} height={250}>
            <Pie
              data={statusChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {statusChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}

        {selectedChart === 'category' && (
          <PieChart width={250} height={250}>
            <Pie
              data={categoryChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {categoryChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </Box>
    </Drawer>
  );
}
