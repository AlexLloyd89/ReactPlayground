import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { LoginLayout } from './layouts/Login';
import { UsersLayout } from './layouts/Users';
import { AdminLayout } from './layouts/Admin';
import { MainLayout } from './layouts/MainLayout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginLayout />} />
        <Route element={<MainLayout />}>
          <Route path='/users' element={<UsersLayout />} />
          <Route
            path='/admin'
            element={
              <ProtectedRoute requiredRole='admin'>
                <AdminLayout />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
