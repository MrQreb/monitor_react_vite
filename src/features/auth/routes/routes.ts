import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '@/app/router/__root'
import LoginPage from '../ui/pages/LoginPage'

/** Routa del login */
export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LoginPage, 
})