import React, { useState } from 'react';
import {
  Button, Tooltip, Box, CircularProgress, Dialog, DialogTitle,
  DialogContent, DialogActions, Typography
} from '@mui/material';

const ActionButton = ({
  label = 'Action',
  icon = null,
  tooltip = '',
  onClick = () => {},
  loadingText = null,
  variant = 'contained',
  size = 'small',
  color = 'primary',
  sx = {},
  confirmBeforeAction = false,
  confirmTitle = '¿Estás seguro?',
  confirmText = 'Esta acción no se puede deshacer.',
  confirmAcceptText = 'Sí',
  confirmCancelText = 'Cancelar'
}) => {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmedClick = async () => {
    setLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const handleClick = () => {
    if (confirmBeforeAction) {
      setShowConfirm(true);
    } else {
      handleConfirmedClick();
    }
  };

  const buttonContent = loading
    ? loadingText || <CircularProgress size={16} color="inherit" />
    : label;

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon && tooltip ? (
          <Tooltip title={tooltip}>
            {icon}
          </Tooltip>
        ) : (
          icon
        )}
        <Button
          size={size}
          variant={variant}
          onClick={handleClick}
          disabled={loading}
          color={color}
          sx={{ borderRadius: '50px', padding: '0 12px', fontSize: '0.75rem', ...sx }}
        >
          {buttonContent}
        </Button>
      </Box>

      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
        <DialogTitle>{confirmTitle}</DialogTitle>
        <DialogContent>
          <Typography>{confirmText}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirm(false)}>{confirmCancelText}</Button>
          <Button onClick={handleConfirmedClick} autoFocus variant="contained" color="primary">
            {confirmAcceptText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionButton;
