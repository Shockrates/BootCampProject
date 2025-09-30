import { Routes, Route, Link, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import About from './components/About/About'
import MoviePage from './components/MoviePage/MoviePage'
import Auth from './components/Auth/Auth'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import NotFoundPage from './components/ErrorPage/NotFoundPage'
import RootLayout from './layouts/RootLayout'

// import './App.css'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" element={<RootLayout />} errorElement={<NotFoundPage />}>
        <Route index element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="movie/:id" element={<MoviePage />} />
        <Route path="auth" element={<Auth />} >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
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
