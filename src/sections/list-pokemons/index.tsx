import { useQuery } from 'react-query';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
import {
  TextField,
  Container,
  Link,
  CircularProgress,
  Grid,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from 'src/store/favorites.slice';
import type { RootState } from 'src/store';

const fetchPokemon = async () => {
  const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon', {
    params: {
      limit: 100,
    },
  });
  return data.results;
};

export const PokemonList = () => {
  const { data, isLoading, error } = useQuery('pokemon', fetchPokemon);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading Pokémon</div>;

  const filteredPokemon = data.filter((pokemon: any) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ pt: 8, bgcolor: '#eee' }}>
      <Container maxWidth="md">
        <TextField
          sx={{
            backgroundColor: '#fff',
            mb: 4,
          }}
          label="Search Pokémon"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Grid container spacing={2}>
          {filteredPokemon.map((pokemon: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
              <Box
                key={pokemon.name}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  '&:hover': {
                    backgroundColor: 'gray',
                  },
                  border: '1px solid #000',
                  py: 2,
                }}
              >
                {favorites.includes(pokemon.name) ? (
                  <IconButton onClick={() => dispatch(removeFavorite(pokemon.name))}>
                    <FavoriteIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => dispatch(addFavorite(pokemon.name))}>
                    <FavoriteBorderIcon />
                  </IconButton>
                )}
                <Link
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  component={RouterLink}
                  to={`/pokemon/${pokemon.name}`}
                  underline="none"
                >
                  <img
                    src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name}.gif`}
                    alt={pokemon.name}
                    width="100px"
                    height="100px"
                  />
                  <Typography variant="body1">{pokemon.name}</Typography>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
