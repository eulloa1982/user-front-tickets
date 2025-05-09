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
} from '@mui/material';

const Popup = ({ open, onClose, record }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalles del Ticket</DialogTitle>
      <DialogContent dividers>
        {record ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>ID:</strong> {record.id}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Título:</strong> {record.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Estado:</strong> {record.status}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Asignado a:</strong> {record.agent}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Descripción:</strong> {record.description}</Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body2">No hay datos disponibles.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
