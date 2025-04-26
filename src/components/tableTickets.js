import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, Box
} from '@mui/material';

import useAzureUser from './getUserDetails';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import TicketDashboard from './ticketDashboard'; // 👈 Importamos el dashboard nuevo

function TableTickets() {
  const { user, loading: loadingUser, error: errorUser } = useAzureUser();
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [errorTickets, setErrorTickets] = useState(null);

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Open':
        return <Tooltip title="Open"><FiberManualRecordIcon sx={{ color: 'green' }} /></Tooltip>;
      case 'New':
        return <Tooltip title="New"><NewReleasesIcon sx={{ color: 'blue' }} /></Tooltip>;
      case 'In Processing':
        return <Tooltip title="In Processing"><HourglassEmptyIcon sx={{ color: 'orange' }} /></Tooltip>;
      case 'Closed':
      case 'Resolved':
        return <Tooltip title="Closed"><CheckCircleIcon sx={{ color: 'gray' }} /></Tooltip>;
      default:
        return null;
    }
  };

  const getStatusChartData = () => {
    const counts = tickets.reduce((acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([status, count]) => ({
      name: status,
      value: count,
    }));
  };

  const getCategoryChartData = () => {
    const counts = tickets.reduce((acc, ticket) => {
      acc[ticket.category_name] = (acc[ticket.category_name] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([category, count]) => ({
      name: category,
      value: count,
    }));
  };

  useEffect(() => {
    if (user) {
      setLoadingTickets(true);

      fetch('https://prod-52.eastus2.logic.azure.com:443/workflows/01728280e2a64bc8ad6cbbae397ed709/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=1oRqfyk4UYY6Who3R9Kb966-gOaobOy0ojQbbOLgRY0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user.userDetails })
      })
        .then(res => {
          if (!res.ok) throw new Error('Error al recuperar tickets');
          return res.json();
        })
        .then(data => {
          setTickets(data['ResultSets']['Table1'] || []);
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
  if (!user) return <a href="/.auth/login/aad">Iniciar sesión con Office365</a>;

  return (
    <Box sx={{ display: 'flex' }}>
      
      {/* Tabla de Tickets */}
      <Box sx={{ flex: 3, p: 2 }}>
        <h3>Hi {user.userDetails} 👋</h3>
        <TableContainer component={Paper}>
          <Table sx={{ tableLayout: 'fixed' }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell sx={{ width: 30 }}>Status</TableCell>
                <TableCell>Category</TableCell>
                <TableCell sx={{ width: 60 }}>Assigned Agent</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.ticket_id}>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell sx={{ width: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ticket.description}</TableCell>
                  <TableCell>{renderStatusIcon(ticket.status)}</TableCell>
                  <TableCell>{ticket.category_name}</TableCell>
                  <TableCell>{ticket.aget_name}</TableCell>
                  <TableCell>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {tickets.length === 0 && <p>No tienes tickets registrados.</p>}
      </Box>

      {/* Dashboard de Gráficos */}
      <Box sx={{ flex: 2, p: 2 }}>
        <TicketDashboard 
          statusChartData={getStatusChartData()} 
          categoryChartData={getCategoryChartData()} 
        />
      </Box>

    </Box>
  );
}

export default TableTickets;
