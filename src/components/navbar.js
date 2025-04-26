import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LeftBar from './leftBar';
//import useAzureFullUser from './useAzureFullUser';

export default function ButtonAppBar({ onMenuClick }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  //const { user, loading, error } = useAzureFullUser();
  //if (loading) return <p>Cargando datos del usuario...</p>;
  //if (error) return <p>Error: {error.message}</p>;
  //console.log(user.officePhone);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Las Mercedes Medical Centers
          </Typography>
          <Button color="inherit">Tickets System</Button>
        </Toolbar>
      </AppBar>

      <LeftBar
        state={state}
        toggleDrawer={toggleDrawer}
        onMenuClick={(key) => {
          setState({ ...state, left: false }); // cerrar el drawer al hacer clic
          onMenuClick(key); // comunicar al padre la opción seleccionada
        }}
      />
    </Box>
  );
}