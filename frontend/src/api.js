import axios from 'axios';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      username: username,
      password: password
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMovies = async () => {
  try {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

    const response = await axios.get('http://localhost:3000/movies', config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMovie = async (movieData) => {
  try {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

    const response = await axios.post('http://localhost:3000/movies', movieData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
