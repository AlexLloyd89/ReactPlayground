import { Box, Button, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../hooks/UseAuth';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = (data: LoginForm) => {
    const role = data.username.includes('admin') ? 'admin' : 'user';
    login({id: +Date.now(), name:data.username, role});
    navigate('/users');
  };

  return (
    <div className='flex items-center justify-center min-h-screen '>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        className='bg-primary-dark p-8 rounded-md  w-full max-w-md'
        display='flex'
        flexDirection='column'
        gap={2}
        maxWidth={400}
        mx='auto'
        mt={5}
        style={{
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
        }}
      >
        <TextField
          required
          autoComplete='username'
          id='username'
          label='Username'
          variant='outlined'
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          required
          autoComplete='current-password'
          id='password'
          label='Password'
          type='password'
          variant='outlined'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button variant='contained' color='primary' type='submit'>
          Sign In
        </Button>
      </Box>
    </div>
  );
};
