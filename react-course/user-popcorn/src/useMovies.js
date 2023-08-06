import { OMDB_KEY } from "./App";
import { useState, useEffect } from "react";

export function useMovies(query) {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
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
		// callback?.();
		fetchMovies();
		return () => controller.abort();
	}, [query]);
	return { movies, loading, error };
}
