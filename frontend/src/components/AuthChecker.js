import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthChecker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      navigate('/movies');
    }
  }, [navigate]);

  return null;
};

export default AuthChecker;
