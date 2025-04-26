import * as React from 'react';
/*import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Typography
} from '@mui/material';*/
//import EditIcon from '@mui/icons-material/Edit';login
import Login from '@mui/icons-material/Login';
//import DoneIcon from '@mui/icons-material/Done';
//import ScheduleIcon from '@mui/icons-material/Schedule';
import useAzureUser from './getUserDetails';
/*import { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
  } from '@mui/material';*/

/*const rows = [
  { id: 101, subject: 'Error al iniciar sesión', status: 'Abierto' },
  { id: 102, subject: 'Solicitud de acceso', status: 'Pendiente' },
  { id: 103, subject: 'Reinicio de contraseña', status: 'Cerrado' },
];*/

export default function TableTickets() {
    
  const { user, loading, error } = useAzureUser();
  if (loading) return <p>Cargando usuario...</p>;
  if (error) return <p>Error: {error.message}</p>;
    //const user = 'esteban'
    //const {data, loading, error} = useAzureUser(url);
    //const user = useAzureUser();
    //console.log(JSON.stringify(user));
    //const [tickets, setTickets] = useState([]);
   // console.log(JSON.stringify(data, null, 2))
   /* useEffect(() => {
      if (!user) return;
  
      fetch('https://<TU_LOGICAPP_URL>', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user.userDetails })
      })
        .then(res => res.json())
        .then(setTickets)
        .catch(err => console.error('Error al cargar tickets:', err));
    }, [user]);*/
  


    /*const renderStatusCell = (status) => {
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
      };*/

  return (
    <div>
      <a href="/.auth/login/aad">Iniciar sesión con Office365</a>
    <Login />
    
    <div>
    <h1>Hola {user?.user_claims?.find(claim => claim.typ === 'name')?.val}!</h1>
      <p>ID de usuario: {user?.id}</p>
    </div>
    </div>
  );
}
/*
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
        
        </TableBody>
      </Table>
    </TableContainer>
{tickets.map((ticket) => (
          <TableRow key={ticket.Id}>
            <TableCell>{ticket.Id}</TableCell>
            <TableCell>{ticket.Subject}</TableCell>
            <TableCell>{ticket.Status}</TableCell>
          </TableRow>
        ))}

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
          ))}*/