import React, { useState } from 'react';
import { Button, Tooltip, Box, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { reopenTicket } from '../utils/reopenTicket';

const ReopenButton = ({ userEmail, ticketId, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await reopenTicket(userEmail, ticketId);
      onSuccess(); // notificar al componente padre que se reabrió con éxito
    } catch (error) {
      console.error('Error al reabrir ticket:', error);
      alert('Error al reabrir el ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title="Closed">
        <CheckCircleIcon sx={{ color: 'gray' }} />
      </Tooltip>
      <Button
        size="small"
        variant="contained"
        onClick={handleClick}
        disabled={loading}
        sx={{
          borderRadius: '50px',
          minWidth: '32px',
          height: '32px',
          padding: '0 12px',
          fontSize: '0.75rem'
        }}
      >
        {loading ? <CircularProgress size={16} color="inherit" /> : 'Reopen'}
      </Button>
    </Box>
  );
};

export default ReopenButton;
