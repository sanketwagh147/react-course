import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { OMDB_KEY, Loader } from "./App";
import { useKey } from "./useKey";

export function MovieDetails({
	selectedMovieId,
	onCloseMovie,
	onAddWatched,
	watchedMovies,
}) {
	const [movie, setMovie] = useState({});
	const [loading, setLoading] = useState(false);
	const [userRating, setUserRating] = useState("");

	const countRated = useRef(0);
	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	const isWatched = watchedMovies
		.map((movie) => movie.imdbID)
		.includes(selectedMovieId);
	const watchedUserRating = watchedMovies.find(
		(movie) => movie.imdbID === selectedMovieId
	)?.userRating;
	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedMovieId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			userRating: Number(userRating),
			runtime: Number(runtime.split(" ").at(0)),
			count: countRated.current,
		};
		onAddWatched(newWatchedMovie);
		onCloseMovie();
	}

	useEffect(() => {
		async function getMovieDetails() {
			try {
				setLoading(true);
				const res = await fetch(
					`https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${selectedMovieId}`
				);

				if (!res.ok)
					throw new Error(
						"Something went wrong please check your internet connection"
					);
				const data = await res.json();
				if (data.Response === "False") throw new Error("No movies found");
				console.log(data);
				setMovie(data);
			} catch (error) {
				console.error(error.message);
			} finally {
				setLoading(false);
			}
		}
		getMovieDetails();
	}, [selectedMovieId]);

	useKey("Escape", onCloseMovie);

	useEffect(
		function () {
			if (!title) return;
			document.title = title;
			return () => (document.title = "MovieDb");
		},
		[title]
	);

	useEffect(() => {
		if (userRating) countRated.current++;
	}, [userRating]);
	return (
		<div className="details">
			{loading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className="btn-back" onClick={() => onCloseMovie()}>
							&larr;
						</button>
						<img src={poster} alt={title} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{" "}
								{released} &bull; {runtime}{" "}
							</p>
							<p>{genre}</p>
							<p>
								{" "}
								<span>⭐</span> <span>{imdbRating} IMBD ratings</span>{" "}
							</p>
						</div>
					</header>

					<section>
						<div className="rating">
							{!isWatched ? (
								<>
									<StarRating
										maxRating={10}
										size={24}
										onSetRating={setUserRating}
									/>
									{userRating > 0 && (
										<button className="btn-add" onClick={handleAdd}>
											Add to watch list
										</button>
									)}{" "}
								</>
							) : (
								<p>You have already rated this movie {watchedUserRating}⭐.</p>
							)}
						</div>
						<div>
							<em>{plot}</em>
							<p>Starring {actors}</p>
							<p>Directed by {director}</p>
						</div>
					</section>
				</>
			)}
		</div>
	);
}
