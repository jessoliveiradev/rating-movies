import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { loginUser } from '../api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      
      if (response) {
        navigate('/movies');
      } else {
        alert('Erro ao efetuar login. Por favor, tente novamente.');
      }
    } catch (error) {
      alert('Erro ao efetuar login. Por favor, tente novamente.');
      console.error('Erro ao efetuar login:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '250px',
      }}
    >
      <Card sx={{ minWidth: 100, minHeight: 250 }}>
        <CardContent sx={{ paddingTop: '30px' }}>
          <Box
            component="form"
            sx={{
              display: 'grid',
              gridTemplateColumns: { sm: '2fr' },
              gap: 3,
            }}
            noValidate
            autoComplete="off"
          >
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </CardContent>
        <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
          <CardActions>
            <Button size="small" onClick={handleLogin}>Login</Button>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginPage;
