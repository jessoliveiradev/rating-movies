import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
        console.log({ fteft: 'jdhs' })
      try {
        await logoutUser();
        navigate('/login');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default LogoutPage;
