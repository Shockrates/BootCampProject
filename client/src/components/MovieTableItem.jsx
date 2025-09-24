import React from 'react'


export default function MovieTableItem({ movie }) {
const genres = (movie.genre || []).join(', ')


return (
<article className="movie-card">
<div className="poster-wrap">
<img src={movie.poster_url} alt={`${movie.title} poster`} />
</div>


<div className="card-body">
<h3 className="card-title">{movie.title} <small>({movie.year})</small></h3>
<div className="meta">{genres} • {movie.runtime} min • Directed by {movie.director}</div>
<p className="desc">{movie.description}</p>
</div>
</article>
)
}