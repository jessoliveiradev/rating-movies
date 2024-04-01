import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Input from '@mui/material/Input';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import AppBarTitle from '../components/AppBar';
import { fetchMovies, createMovie } from '../api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [shouldReloadMovies, setShouldReloadMovies] = useState(true);
  const [newMovieData, setNewMovieData] = useState({
    name: '',
    description: '',
    director: '',
    genre: '',
  });

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
        setShouldReloadMovies(false);
      } catch (error) {
        console.error('Erro ao carregar os filmes:', error);
      }
    };

    if (shouldReloadMovies) {
      loadMovies();
    }
  }, [shouldReloadMovies]);

  const handleCreateMovie = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovieData({ ...newMovieData, [name]: value });
  };

  const handleAddMovie = async () => {
    try {
      await createMovie(newMovieData);
      setOpenModal(false);
      setNewMovieData({
        name: '',
        description: '',
        director: '',
        genre: '',
      });
      setShouldReloadMovies(true);
    } catch (error) {
      console.error('Erro ao adicionar filme:', error);
    }
  };

  return (
    <div>
      <AppBarTitle/>
      <List>
        {movies.map(movie => (
          <ListItem
            key={movie.id}
          >
            <ListItemText primary={movie.name}/>
          </ListItem>
        ))}
      </List>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                  name="name"
                  placeholder="Nome"
                  value={newMovieData.name}
                  onChange={handleInputChange}
                />
                <Input
                  name="description"
                  placeholder="Descrição"
                  value={newMovieData.description}
                  onChange={handleInputChange}
                />
                <Input
                  name="director"
                  placeholder="Diretor"
                  value={newMovieData.director}
                  onChange={handleInputChange}
                />
                <Input
                  name="genre"
                  placeholder="Genero"
                  value={newMovieData.genre}
                  onChange={handleInputChange}
                />
              </Box>
            </CardContent>
            <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
              <CardActions>
                <Button size="small" onClick={handleAddMovie}>Adicionar</Button>
              </CardActions>
            </Box>
          </Card>
        </Box>
      </Modal>
      <Stack direction="row" spacing={2} justifyContent="end" paddingTop={5} paddingRight={5}>
        <Button variant="contained" onClick={handleCreateMovie}>Adicionar filme</Button>
      </Stack>
    </div>
  );
};
  
export default MoviePage;