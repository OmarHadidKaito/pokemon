import type { FC } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Card, CardContent, Typography, CircularProgress, Box, Link } from '@mui/material';

import axios from 'axios';

const fetchPokemonDetails = async (name: string) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return data;
};

export const PokemonDetail: FC = () => {
  const { name } = useParams<{ name: string }>();
  const { data, isLoading, error } = useQuery(['pokemon', name], () =>
    fetchPokemonDetails(name as any)
  );

  if (isLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <div>Error loading details</div>;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card
        sx={{
          width: 250,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CardContent>
          <Box>
            <Link component={RouterLink} to="/pokemon">
              back
            </Link>
            <Typography variant="h4" gutterBottom>
              {data.name}
            </Typography>
          </Box>
          <img
            src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${data.name}.gif`}
            alt={data.name}
            style={{ width: '150px', height: '150px' }}
          />
          <Typography variant="body1">Base experience: {data.base_experience}</Typography>
          <Typography variant="body1">ID: {data.id}</Typography>
          <Typography variant="body1">Height: {data.height}</Typography>
          <Typography variant="body1">Weight: {data.weight}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
