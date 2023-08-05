export function Movie({ movie, showMovieDetails }) {
	return (
		<li onClick={() => showMovieDetails(movie.imdbID)}>
			<img src={movie.Poster} alt={`${movie.Title.slice(0, 5)} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
}
