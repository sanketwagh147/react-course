import {
	createContext,
	useEffect,
	useContext,
	useReducer,
	useCallback,
} from "react";
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();
const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};

// Should handle all business logic and state transitions
// Reducers needs to be pure
function reducer(state, action) {
	switch (action.type) {
		// Model this actions as events and not as setters
		case "loading":
			return { ...state, isLoading: true };
		case "cities/loaded":
			return {
				...state,
				isLoading: false,
				cities: action.payload,
			};
		case "city/loaded":
			return { ...state, isLoading: false, currentCity: action.payload };
		case "city/created":
			return {
				...state,
				isLoading: false,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};

		case "city/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter((city) => city.id !== action.payload),
				currentCity: {},
			};
		// return { ...state, isLoading: false, error: action.payload };
		default:
			throw new Error("Unknown action type");
	}
}

function CitiesProvider({ children }) {
	// const [cities, setCities] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [currentCity, setCurrentCity] = useState({});

	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(function () {
		async function fetchCities() {
			dispatch({ type: "loading" });
			try {
				const apiUrl = `${BASE_URL}/cities`;
				const res = await fetch(apiUrl);
				const data = await res.json();

				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({
					type: "rejected",
					payload: "There was an error loading the cities data",
				});
			}
		}
		fetchCities();
	}, []);

	const getCity = useCallback(
		async function getCity(id) {
			if (Number(id) === currentCity.id) return;
			dispatch({ type: "loading" });
			try {
				// setIsLoading(true);
				const apiUrl = `${BASE_URL}/cities/${id}`;
				const res = await fetch(apiUrl);
				const data = await res.json();

				// setCurrentCity(data);
				dispatch({ type: "city/loaded", payload: data });
			} catch {
				dispatch({
					type: "rejected",
					payload: "There was an error getting city by id",
				});
			}
		},
		[currentCity.id]
	);

	async function createCity(newCity) {
		dispatch({ type: "loading" });
		try {
			// setIsLoading(true);
			const apiUrl = `${BASE_URL}/cities/`;
			const res = await fetch(apiUrl, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			console.log(data);
			// setCities((cities) => [...cities, data]);
			dispatch({ type: "city/created", payload: data });
		} catch {
			dispatch({ type: "rejected", payload: "There was an adding new city" });
		}
	}

	async function deleteCity(id) {
		dispatch({ type: "loading" });
		try {
			const apiUrl = `${BASE_URL}/cities/${id}`;
			const res = await fetch(apiUrl, {
				method: "DELETE",
			});
			// setCities((cities) => cities.filter((city) => city.id !== city));
			dispatch({ type: "city/deleted", payload: id });
		} catch {
			dispatch({ type: "rejected", payload: "There was an adding new city" });
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
				error,
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
