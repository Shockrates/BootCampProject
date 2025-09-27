import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import MoviePage from './pages/MoviePage'

// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Dashboard</Link>
        <Link to="/about">About</Link>
      </nav>

      <main className="main">

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
