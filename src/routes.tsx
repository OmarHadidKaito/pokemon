import type { FC } from 'react';
import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';

const Loadable = (Component: FC) => (props: any) => (
  <Suspense fallback={<>loading...</>}>
    <Component {...props} />
  </Suspense>
);

const Pokemons = Loadable(lazy(() => import('src/pages/pokemons')));
const Pokemon = Loadable(lazy(() => import('src/pages/pokemon')));

export const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        path: 'pokemon',
        element: <Pokemons />,
      },
      {
        path: 'pokemon/:name',
        element: <Pokemon />,
      },
    ],
  },
  {
    path: '*',
    // element: <NotFound />,
  },
];
