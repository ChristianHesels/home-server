import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import {Drawer, List, ListItem, ListItemText} from '@mui/material';

const navItems = [
  {name: 'Home', link: '/'},
  {name: 'VPN', link: '/vpn'},
  {name: 'IP-Tables', link: '/iptable'},
];

export default function AppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{display: 'flex'}}>
      <MuiAppBar position="sticky" component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {sm: 'none'}}}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{display: {xs: 'none', sm: 'block'}}}>
            {navItems.map(item => (
              <Link href={item.link}>
                <Button key={item.name} sx={{color: '#fff'}}>
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
            <List>
              {navItems.map(item => (
                <Link href={item.link}>
                  <ListItem button>
                    <ListItemText>{item.name}</ListItemText>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
