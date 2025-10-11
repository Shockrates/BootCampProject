import React from 'react'
import MoviesTable from '../../Dashboard/MoviesTable'
import { useState, useEffect } from 'react'
import { searchMovies } from '../../../utils/api'


const MovieSearch = ({ isOpen, onClose, maxResults = 6 }) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // Debounce timeout
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setError("");
      return;
    }

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        // const res = await fetch(
        //  `http://localhost:3000/searchMovies?searchTerm=${encodeURIComponent(query)}`
        // );
        // if (!res.ok) throw new Error("Server error");

        // const data = await res.json();

        const data = await searchMovies(query);

        if (!data || data.length === 0) {
          setMovies([]);
          setError("No results found")
        } else {
          const updatedMovies = data.slice(0, maxResults).map((m) => ({
            ...m,
            index: m._id, //reassign index prop attempt (fail)
          }));

          setMovies(updatedMovies);
          setError("");
        }
      } catch (err) {
        console.error(err);
        setError("Search failed. Try again later");
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce

    setDebounceTimeout(debounceTimeout);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="modal-container fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="modal bg-slate-800 rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-white relative">
        {/* Header */}
        <div className="modal-header flex justify-between items-center border-b border-slate-700 pb-3">
          <h3 className="text-xl font-bold">Search Movies</h3>
          <p
            className="close cursor-pointer text-2xl hover:text-indigo-400 transition"
            onClick={() => {
              onClose();
              setQuery("");
              setMovies([]);
              setError("");
            }}
          >
            &times;
          </p>
        </div>


        {/*Content*/}
        <div className="modal bg-slate-800 rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-white relative max-h-[85vh] overflow-y-auto">
          <div className="modal-content mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search movies..."
              className="form-input w-full mb-4"
              autoFocus
            />

            {error && <p className="form-error mb-4">{error}</p>}
            {loading && <p className="text-gray-400 italic mb-4">Searching movies...</p>}

            {movies.length > 0 && <MoviesTable movies={movies} message="Search Results" />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieSearch


