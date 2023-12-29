import { createContext, useState, useEffect, useContext } from "react";
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const apiUrl = `${BASE_URL}/cities`;
				console.log(apiUrl);
				const res = await fetch(apiUrl);
				const data = await res.json();

				setCities(data);
			} catch {
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	async function getCity(id) {
		try {
			setIsLoading(true);
			const apiUrl = `${BASE_URL}/cities/${id}`;
			console.log(apiUrl);
			const res = await fetch(apiUrl);
			const data = await res.json();

			setCurrentCity(data);
		} catch {
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	if (context === undefined) throw new Error("Use cities imported outside");
	return context;
}

export { CitiesProvider, useCities };
