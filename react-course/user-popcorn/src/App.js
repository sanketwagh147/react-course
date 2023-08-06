import { Navbar } from "./Navbar";
import { Main } from "./Main";
import { useRef, useState } from "react";
import { NumResults } from "./NumResults";
import { Box } from "./Box";
import { Search } from "./Search";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedMoviesList } from "./WatchedMoviesList";
// import { WatchedBox } from "./WatchedBox";
import { MovieList } from "./MovieList";
import { MovieDetails } from "./MovieDetails";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorageState";
import { CurrencyCalculator } from "./CurrencyCalculator";

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

export const OMDB_KEY = "46c63686";
export default function App() {
	// const [movies, setMovies] = useState(tempMovieData);
	// const [watched, setWatched] = useState(tempWatchedData);
	const [showConverter, setShowConverter] = useState(true);

	const [query, setQuery] = useState("");
	const [selectedMovieId, setSelectedMovieId] = useState();
	// const [watched, setWatched] = useState([]);
	//using callback function

	const { movies, loading, error } = useMovies(query);

	const [watched, setWatched] = useLocalStorage([], "watched");

	function handleSelectMovie(id) {
		setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
	}
	function handleCloseMovie(id) {
		console.log(id);
		setSelectedMovieId(id);
	}

	function handleWatchedMovie(movie) {
		setWatched((watched) => [...watched, movie]);

		// localStorage.setItem("watched", JSON.stringify([...watched, movie]));
	}
	function handleDeleteWatched(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}
	function handleToggleCurrConverter() {
		console.log("toggling currency converter");

		setShowConverter((toggle) => !showConverter);
	}

	//using useEffect
	// useEffect(() => {
	// 	localStorage.setItem("watched", JSON.stringify(watched));
	// }, [watched]);

	return (
		<>
			<Navbar>
				<NumResults movies={movies} />
				<Search query={query} setQuery={setQuery} />
				<button className="btn-toggle" onClick={handleToggleCurrConverter}>
					₹
				</button>
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
				{showConverter && (
					<Box>
						<CurrencyCalculator></CurrencyCalculator>
					</Box>
				)}
			</Main>
		</>
	);
}

export function Loader() {
	return <p className="loader">Loading.. </p>;
}
function ErrorMessage({ message }) {
	return <p className="error">❌{message}</p>;
}

function InfoMessage({ message }) {
	return <p className="error">⚡ {message}</p>;
}


