import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import About from './components/About/About'
import MoviePage from './components/MoviePage/MoviePage'

// import './App.css'

function App() {


  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-left">
            <Link to="/">Dashboard</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="nav-right">
            <Link to="/profile">Profile</Link>
          </div>
        </div>
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
