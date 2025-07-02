import { Box } from '@mui/material';
import { SideNav } from '../components/SideNav';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <Box display='flex' height='100vh' overflow='hidden'>
      <SideNav />

      <Box
        component='main'
        flexGrow={1}
        p={3}
        boxSizing='border-box'
        sx={{
          height: '100%',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
