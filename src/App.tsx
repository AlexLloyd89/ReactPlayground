import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { LoginLayout } from './layouts/Login';
import { UsersLayout } from './layouts/Users';
import { AdminLayout } from './layouts/Admin';

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginLayout />} />
          <Route path='/users' element={<UsersLayout />} />
          <Route
            path='/admin'
            element={
              <ProtectedRoute requiredRole='admin'>
                <AdminLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
