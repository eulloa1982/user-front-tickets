import * as React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ScheduleIcon from '@mui/icons-material/Schedule';

const rows = [
  { id: 101, subject: 'Error al iniciar sesión', status: 'Abierto' },
  { id: 102, subject: 'Solicitud de acceso', status: 'Pendiente' },
  { id: 103, subject: 'Reinicio de contraseña', status: 'Cerrado' },
];

export default function TableTickets() {
    const renderStatusCell = (status) => {
        if (status === 'Cerrado') {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DoneIcon color="success" />
              <Typography variant="body2">Cerrado</Typography>
            </Box>
          );
        } else if (status === 'Abierto') {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ScheduleIcon color="warning" />
              <Typography variant="body2">Abierto</Typography>
            </Box>
          );
        } else {
          return (
            <Typography variant="body2">{status}</Typography>
          );
        }
      };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="tabla de tickets">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Asunto</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{renderStatusCell(row.status)}</TableCell>
              <TableCell>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
