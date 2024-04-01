import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AppBarTitle from '../components/AppBar';
import { fetchMovieById } from '../api';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  
  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, curr) => acc + curr.classify, 0);
    return sum / ratings.length;
  };

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieData = await fetchMovieById(id);
        setMovie(movieData);
      } catch (error) {
        console.error('Erro ao carregar o filme:', error);
      }
    };

    loadMovie();
  }, [id]);

  return (
    <div>
      <AppBarTitle />
      {movie && (
        <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ListItem key={movie.id} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <ListItemText primary={movie.name} />
            <ListItemText primary={movie.director} />
            <ListItemText primary={movie.genre} />
            <ListItemText primary={`Média de Classificação: ${calculateAverageRating(movie.Ratings)}`} />
          </ListItem>
        </List>
      )}
    </div>
  );
};

export default MovieDetailsPage;
