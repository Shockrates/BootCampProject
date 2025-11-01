import { Routes, Route, Link, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import About from './components/About/About'
import MoviePage from './components/MoviePage/MoviePage'
import Profile from './components/Profile/Profile'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import NotFoundPage from './components/ErrorPage/NotFoundPage'
import RootLayout from './layouts/RootLayout'
import PrivateRoute from './layouts/PrivateRoute'
import PublicRoute from './layouts/PublicRoute'
import AuthRoute from './layouts/AuthRoute'
import CommunityFeed from './components/CommunityFeed/CommunityFeed'
import TestProfile from './components/Profile/TestProfile'
import Home from './components/Home/Home'

/**
 * Main application component.
 * Configures routing for the app using react-router-dom:
 * - Wraps pages in <RootLayout>
 * - Protects authenticated pages with <PrivateRoute>
 * - Restricts login/register pages with <PublicRoute>
 * - Handles 404 errors with <NotFoundPage>
 * The RouterProvider renders all routes based on this configuration.
 */


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" element={<RootLayout />} errorElement={<NotFoundPage />}>

        <Route element={<PrivateRoute />} >
          <Route path="imdb-top-movies" element={<Dashboard />} />
          <Route path="community" element={<CommunityFeed />} />
          <Route path="about" element={<About />} />
          <Route path="movie/:id" element={<MoviePage />} />
          {/* <Route path='profile' element={<Profile />} /> */}
          <Route path='profile/:id' element={<Profile />} />
          {/* <Route path='profile/:id' element={<TestProfile />} /> */}
        </Route>
        <Route element={<PublicRoute />} >
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route element={<AuthRoute />} >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

        </Route>

      </Route>

    )
  )

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
