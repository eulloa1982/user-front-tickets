import * as React from 'react';
/*import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Typography
} from '@mui/material';*/
//import EditIcon from '@mui/icons-material/Edit';login
//import Login from '@mui/icons-material/Login';
//import DoneIcon from '@mui/icons-material/Done';
//import ScheduleIcon from '@mui/icons-material/Schedule';
import useAzureUser from './getUserDetails';
import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';



export default function TableTickets() {
    
  const { user, loading: loadingUser, error: errorUser } = useAzureUser();
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [errorTickets, setErrorTickets] = useState(null);

  useEffect(() => {
    if (user) {
      setLoadingTickets(true);
  
      fetch('https://prod-52.eastus2.logic.azure.com:443/workflows/01728280e2a64bc8ad6cbbae397ed709/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=1oRqfyk4UYY6Who3R9Kb966-gOaobOy0ojQbbOLgRY0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userEmail: user.userDetails })  // 👈 Mandamos el email en el body
      })
        .then(res => {
          if (!res.ok) throw new Error('Error al recuperar tickets');
          return res.json();
        })
        .then(data => {
          console.log(data['ResultSets']['Table1'])
          setTickets(data['ResultSets']['Table1'] || []); // Ajusta si tu respuesta tiene otra estructura
          setLoadingTickets(false);
        })
        .catch(err => {
          console.error('Error al cargar tickets:', err);
          setErrorTickets(err);
          setLoadingTickets(false);
        });
    }
  }, [user]);
  

  if (loadingUser || loadingTickets) return <p>Cargando...</p>;
  if (errorUser) return <p>Error usuario: {errorUser.message}</p>;
  if (errorTickets) return <p>Error tickets: {errorTickets.message}</p>;

  if (!user) {
    return <a href="/.auth/login/aad">Iniciar sesión con Office365</a>;
  }

  return (
    <div>
      <h1>Hola {user.userDetails} 👋</h1>

      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned Agent</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.ticket_id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell sx={{ width: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ticket.description}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>{ticket.name}</TableCell>
                <TableCell>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {tickets.length === 0 && <p>No tienes tickets registrados.</p>}
    </div>
  );
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

  /*return (
    <div>
      <a href="/.auth/login/aad">Iniciar sesión con Office365</a>
    <Login />
    
    <div>
    <h1>Hola {user?.user_claims?.find(claim => claim.typ === 'name')?.val}!</h1>
      <p>ID de usuario: {user?.id}</p>
    </div>
    </div>
  );*/
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