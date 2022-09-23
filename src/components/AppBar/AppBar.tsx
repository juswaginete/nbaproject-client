import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

interface NavItemProps {
  name: string;
  link: string;
};

interface TopNavBarProps {
  navItems: NavItemProps[];
};

const TopNavBar = ({ navItems }: TopNavBarProps) => {
  const history = useHistory();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.name} onClick={() => history.push(`${item.link}`)} sx={{ color: '#fff' }}>
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default TopNavBar;
