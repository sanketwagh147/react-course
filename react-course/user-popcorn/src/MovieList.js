import { useState } from "react";
import { Movie } from "./Movie";
import { tempMovieData } from "./App";

export function MovieList({ movies, onSelectMovie }) {
	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<Movie
					movie={movie}
					key={movie.imdbID}
					showMovieDetails={onSelectMovie}
				/>
			))}
		</ul>
	);
}
