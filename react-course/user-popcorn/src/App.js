import { Navbar } from "./Navbar";
import { Main } from "./Main";
import { useEffect, useState } from "react";
import { NumResults } from "./NumResults";
import { Box } from "./Box";
import { Search } from "./Search";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedMoviesList } from "./WatchedMoviesList";
// import { WatchedBox } from "./WatchedBox";
import { MovieList } from "./MovieList";
import { MovieDetails } from "./MovieDetails";

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
		const controller = new AbortController();
		async function fetchMovies() {
			try {
				setLoading(true);
				setError("");
				const res = await fetch(
					`https://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_KEY}&s=${query}`,
					{ signal: controller.signal }
				);

				if (!res.ok)
					throw new Error(
						"Something went wrong please check your internet connection"
					);
				const data = await res.json();
				if (data.Response === "False") throw new Error("No movies found");
				console.log(data);
				setMovies(data.Search);
				setError("");
			} catch (error) {
				if (error.name !== "AbortError") {
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		}
		if (query.length < 3) {
			setMovies([]);
			setError("");
			return;
		}
		handleCloseMovie();
		fetchMovies();
		return () => controller.abort();
	}, [query]);
	function handleToggleCurrConverter() {
		console.log("toggling currency converter");

		setShowConverter((toggle) => !showConverter);
	}

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

function CurrencyCalculator() {
	const [amount, setAmount] = useState(1);
	const [fromCurr, setFromCurr] = useState("INR");
	const [toCurr, setToCurr] = useState("EUR");
	const [converted, setConverted] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(
		function () {
			async function convertCurr() {
				if (amount <= 0) return;
				try {
					setLoading(true);
					const res = await fetch(
						`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
					);
					if (!res.ok) return;

					const data = await res.json();
					console.log(data);
					const converted = data?.rates[toCurr];
					console.log(converted);

					setConverted(converted);
				} catch (err) {
					console.log(err);
				} finally {
					setLoading(false);
				}
			}
			if (toCurr === fromCurr) return setConverted(amount);
			convertCurr();
		},
		[converted, amount, fromCurr, toCurr]
	);

	return (
		<div className="curr-calc">
			<input
				placeholder="Enter currency to be converted here"
				type="number"
				className="search"
				onChange={(e) => setAmount(Number(e.target.value))}
			/>

			<div className="sel-boxes">
				<select
					className="sel-box"
					value={fromCurr}
					onChange={(e) => setFromCurr(e.target.value)}
					disabled={loading}
				>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
					<option value="CAD">CAD</option>
					<option value="INR">INR</option>
				</select>
				<select
					className="sel-box"
					value={toCurr}
					onChange={(e) => setToCurr(e.target.value)}
					disabled={loading}
				>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
					<option value="CAD">CAD</option>
					<option value="INR">INR</option>
				</select>
			</div>
			<p>{loading ? "loading" : amount > 1 ? `${converted} ${toCurr}` : ""}</p>
		</div>
	);
}
