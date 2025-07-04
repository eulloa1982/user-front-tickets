// TicketDashboard.js
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, CardContent, Typography } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#FF6F91', '#FFC75F'];

export default function TicketDashboard({ statusChartData, categoryChartData }) {
  const [selectedChart, setSelectedChart] = useState('status');

  if (!statusChartData.length && !categoryChartData.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center h-full"
      >
        <Typography variant="h6">No tienes tickets aún 🎉</Typography>
      </motion.div>
    );
  }

  return (
    <Card sx={{ width: 500, boxShadow: 6, borderRadius: 4, p: 2 }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Typography variant="h6">Resumen de Tickets</Typography>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant={selectedChart === 'status' ? 'contained' : 'outlined'} onClick={() => setSelectedChart('status')}>Status</Button>
            <Button variant={selectedChart === 'category' ? 'contained' : 'outlined'} onClick={() => setSelectedChart('category')}>Categoría</Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedChart === 'status' && (
            <motion.div
              key="status"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <PieChart width={450} height={400}>
                <Pie
                  data={statusChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={120}
                  label
                >
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-status-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <PieTooltip />
                <Legend layout="horizontal" align="center" verticalAlign="bottom" />
              </PieChart>
            </motion.div>
          )}

          {selectedChart === 'category' && (
            <motion.div
              key="category"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <PieChart width={450} height={400}>
                <Pie
                  data={categoryChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={120}
                  label
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-cat-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <PieTooltip />
                <Legend layout="horizontal" align="center" verticalAlign="bottom" />
              </PieChart>
            </motion.div>
          )}
        </AnimatePresence>

      </CardContent>
    </Card>
  );
}