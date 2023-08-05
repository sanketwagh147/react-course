import { Navbar } from "./Navbar";
import { Main } from "./Main";
import { useEffect, useState } from "react";
import { NumResults } from "./NumResults";
import { Box } from "./Box";
import StarRating from "./StarRating";
import { Search } from "./Search";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedMoviesList } from "./WatchedMoviesList";
// import { WatchedBox } from "./WatchedBox";
import { MovieList } from "./MovieList";

export const tempMovieData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
	},
	{
		imdbID: "tt0133093",
		Title: "The Matrix",
		Year: "1999",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
	},
	{
		imdbID: "tt6751668",
		Title: "Parasite",
		Year: "2019",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
	},
	{
		imdbID: "tt0343660",
		Title: "50 First Dates",
		Year: "2004",
		Poster: "https://upload.wikimedia.org/wikipedia/en/9/9d/50FirstDates.jpg",
	},
];

export const tempWatchedData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: "tt0088763",
		Title: "Back to the Future",
		Year: "1985",
		Poster:
			"https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9,
	},
];

export const average = (arr) =>
	arr.reduce((acc, cur, i, arr) => acc + cur / arr?.length, 0);

const OMDB_KEY = "46c63686";
export default function App() {
	// const [movies, setMovies] = useState(tempMovieData);
	// const [watched, setWatched] = useState(tempWatchedData);

	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedMovieId, setSelectedMovieId] = useState();

	function handleSelectMovie(id) {
		setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
	}
	function handleCloseMovie(id) {
		console.log(id);
		setSelectedMovieId(id);
	}

	function handleWatchedMovie(movie) {
		setWatched((watched) => [...watched, movie]);
	}
	function handleDeleteWatched(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}
	useEffect(() => {
		async function fetchMovies(query) {
			try {
				setLoading(true);
				setError("");
				const res = await fetch(
					`https://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_KEY}&s=${query}`
				);

				if (!res.ok)
					throw new Error(
						"Something went wrong please check your internet connection"
					);
				const data = await res.json();
				if (data.Response === "False") throw new Error("No movies found");
				console.log(data);
				setMovies(data.Search);
			} catch (error) {
				console.error(error.message);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		}
		if (query.length < 3) {
			setMovies([]);
			setError("");
			return;
		}
		fetchMovies(query);
	}, [query]);

	return (
		<>
			<Navbar>
				<NumResults movies={movies} />
				<Search query={query} setQuery={setQuery} />
			</Navbar>
			<Main>
				{/* <Box>{loading ? <Loader /> : <MovieList movies={movies} />}</Box> */}
				<Box>
					{query.length < 3 && (
						<InfoMessage message={"Please at least type 3 characters."} />
					)}
					{loading && <Loader />}
					{!loading && !error && (
						<MovieList movies={movies} onSelectMovie={handleSelectMovie} />
					)}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedMovieId ? (
						<MovieDetails
							selectedMovieId={selectedMovieId}
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleWatchedMovie}
							watchedMovies={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMoviesList
								watched={watched}
								onDelete={handleDeleteWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

function Loader() {
	return <p className="loader">Loading.. </p>;
}
function ErrorMessage({ message }) {
	return <p className="error">❌{message}</p>;
}

function InfoMessage({ message }) {
	return <p className="error">⚡ {message}</p>;
}

function MovieDetails({
	selectedMovieId,
	onCloseMovie,
	onAddWatched,
	watchedMovies,
}) {
	const [movie, setMovie] = useState({});
	const [loading, setLoading] = useState(false);
	const [userRating, setUserRating] = useState("");

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
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span>
								<span>{imdbRating} IMBD ratings</span>
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
						<p>
							<em>{plot}</em>
							<p>Starring {actors}</p>
							<p>Directed by {director}</p>
						</p>
					</section>
				</>
			)}
		</div>
	);
}
