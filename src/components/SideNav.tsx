import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useAuth } from '../hooks/UseAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import { Logout, Person, Security } from '@mui/icons-material';

export const SideNav = () => {
  const currentPath = useLocation()?.pathname;
  const navigate = useNavigate();
  const { role } = useAuth();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className='min-h-screen flex items-stretch'>
      <Paper
        sx={{
          width: 320,
          maxWidth: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuList sx={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <MenuItem selected={currentPath === '/users'} onClick={() => navigate('/users')}>
            <ListItemIcon>
              <Person fontSize='small' />
            </ListItemIcon>
            <ListItemText>User</ListItemText>
          </MenuItem>

          <MenuItem
            disabled={role !== 'admin'}
            selected={currentPath === '/admin'}
            onClick={() => navigate('/admin')}
          >
            <ListItemIcon>
              <Security fontSize='small' />
            </ListItemIcon>
            <ListItemText>Admin</ListItemText>
          </MenuItem>

          <Box flexGrow={1} />
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            <ListItemText>Log Out</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
};
