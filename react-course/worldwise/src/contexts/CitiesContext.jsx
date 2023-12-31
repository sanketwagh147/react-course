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
			const res = await fetch(apiUrl);
			const data = await res.json();

			setCurrentCity(data);
		} catch {
		} finally {
			setIsLoading(false);
		}
	}

	async function createCity(newCity) {
		try {
			setIsLoading(true);
			const apiUrl = `${BASE_URL}/cities/`;
			const res = await fetch(apiUrl, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			console.log(data);
			setCities((cities) => [...cities, data]);
		} catch {
		} finally {
			setIsLoading(false);
		}
	}

	async function deleteCity(id) {
		try {
			setIsLoading(true);
			const apiUrl = `${BASE_URL}/cities/${id}`;
			const res = await fetch(apiUrl, {
				method: "DELETE",
			});
			setCities((cities) => cities.filter((city) => city.id !== city));
		} catch {
			alert("There was an error deleting the city");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
				createCity,
				deleteCity,
			}}
		>
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
