import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const navItems = ['Home', 'About', 'Contact'];

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
              <Button key={item} sx={{color: '#fff'}}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
