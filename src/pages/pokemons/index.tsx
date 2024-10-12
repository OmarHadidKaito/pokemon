import type { FC } from 'react';
import { Box } from '@mui/material';
import { PokemonList } from 'src/sections/list-pokemons';

const Pokemons: FC = () => (
  <Box>
    <PokemonList />
  </Box>
);

export default Pokemons;
