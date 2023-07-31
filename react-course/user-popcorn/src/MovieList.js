import { useState } from "react";
import { Movie } from "./Movie";
import { tempMovieData } from "./App";

export function MovieList({ movies }) {
	return (
		<ul className="list">
			{movies?.map((movie) => (
				<Movie movie={movie} key={movie.imdbID} />
			))}
		</ul>
	);
}
