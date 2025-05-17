// components/Popup.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import { Close } from '@mui/icons-material';

// Función auxiliar para asignar color según el estado
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'Open':
      return 'success';     // Verde
    case 'In Progress':
      return 'warning';     // Amarillo
    case 'Resolved':
      return 'default';     // Gris
    case 'Closed':
      return 'secondary';   // Violeta
    default:
      return 'error';       // Rojo para estados desconocidos
  }
};

const InfoRow = ({ label, value }) => (
  <Grid item xs={12}>
    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
      {label}
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: 500 }}>
      {value || '—'}
    </Typography>
  </Grid>
);

const Popup = ({ open, onClose, record }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 600,
          fontSize: '1.2rem',
          pb: 1
        }}
      >
        Detalles del Ticket
        <Button onClick={onClose} size="small" color="inherit">
          <Close />
        </Button>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 2 }}>
        {record ? (
          <Grid container spacing={2}>
            <InfoRow label="ID" value={record.id} />
            <InfoRow label="Título" value={record.title} />
            <InfoRow label="Agente" value={record.agent_name} />
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                Estado
              </Typography>
              <Chip
                label={record.status || '—'}
                size="small"
                color={getStatusColor(record.status)}
                variant="filled"
              />
            </Grid>
            <InfoRow label="Descripción" value={record.description} />
          </Grid>
        ) : (
          <Typography variant="body2">No hay datos disponibles.</Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
