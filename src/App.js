import React, { useState } from 'react';
import './App.css';
import IframeForm from './components/iframeForm'; // <- nombre de componente en mayúscula
import TableTickets from './components/tableTickets';
import ButtonAppBar from './components/navbar';
import { Box } from '@mui/material';

function App() {
  const [seccion, setSeccion] = useState("myTickets");

  const renderContenido = () => {
    switch (seccion) {
      case "myForm":
        return <IframeForm />;
      case "myTickets":
        return <TableTickets />;
      case "email":
        return <div>Enviar correo</div>;
      case "reports":
        return <div>Mis reportes</div>;
      default:
        return <IframeForm />;
    }
  };

  return (
    <div>
      <ButtonAppBar onMenuClick={setSeccion} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {renderContenido()}
      </Box>
    </div>
  );
}

export default App;

