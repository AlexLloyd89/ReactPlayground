import { useAuth } from '../hooks/UseAuth';

export const UsersLayout = () => {
  const { user } = useAuth();

  return <div className='min-h-screen flex items-stretch'>hello {user?.name || 'N/A'}</div>;
};
