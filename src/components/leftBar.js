import * as React from 'react';
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const menuItems = [
  { label: 'My tickets', icon: <InboxIcon />, key: 'myTickets' },
  { label: 'New Ticket', icon: <MailIcon />, key: 'myForm' },
  //{ label: 'Send email', icon: <MailIcon />, key: 'email' },
  { label: 'My Reports', icon: <InboxIcon />, key: 'reports' },
];

export default function LeftBar({ state, toggleDrawer, onMenuClick }) {
  const anchor = 'left';

  return (
    <Drawer
      anchor={anchor}
      open={state[anchor]}
      onClose={toggleDrawer(anchor, false)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton onClick={() => onMenuClick(item.key)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}
