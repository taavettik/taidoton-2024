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
import { Page } from './components/Page';

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

const routeTree = rootRoute.addChildren([homeRoute, taavettiRoute]);

const router = new Router({ routeTree });

export function App() {
  return <RouterProvider router={router} />;
}
