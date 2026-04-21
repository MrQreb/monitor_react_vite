import { createRoute } from '@tanstack/react-router'
import LoginPage from '../pages/LoginPage'
import { rootRoute } from '@/app/router/__root'

/** Routa del login */
export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LoginPage, 
})