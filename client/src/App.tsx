import React from 'react';
import {
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from '@tanstack/react-router';
import { TaavettiPage } from './pages/taavetti/TaavettiPage';
import { HomePage } from './pages/home/HomePage';
import { SandraPage } from './pages/sandra/SandraPage';

const rootRoute = new RootRoute({
  component: () => <Outlet />,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const taavettiRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/taavetti',
  component: TaavettiPage,
});

const sandraRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/sandra',
  component: SandraPage,
});
const routeTree = rootRoute.addChildren([
  homeRoute,
  sandraRoute,
  taavettiRoute,
]);

const router = new Router({ routeTree });

export function App() {
  return <RouterProvider router={router} />;
}
