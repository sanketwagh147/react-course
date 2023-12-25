import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import "./index.css";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:8000";
function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(function () {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const apiUrl = `${BASE_URL}/cities`;
				console.log(apiUrl);
				const res = await fetch(apiUrl);
				const data = await res.json();
				console.error(typeof data);
				console.warn(data);

				setCities(data);
			} catch {
				alert("There was error loading the data");
			} finally {
				setIsLoading(false);
			}
		}
		fetchCities();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				{/* This both lines do same */}
				{/* <Route path="/" element={<Homepage />} /> */}
				<Route index element={<Homepage />} />

				<Route path="/product" element={<Product />} />
				<Route path="/pricing" element={<Pricing />} />
				<Route path="/login" element={<Login />} />
				{/* Nested Routes */}
				<Route path="/app" element={<AppLayout />}>
					{/* defaul index route if nothing matches */}
					{/* Use <Navigate> to redirect */}
					{/* replace is used so that back button works (for history*/}
					<Route index element={<Navigate replace to="cities" />} />
					<Route
						path="cities"
						element={<CityList cities={cities} isLoading={isLoading} />}
					/>
					<Route path="cities/:id" element={<City />} />
					<Route
						path="countries"
						element={<CountryList cities={cities} isLoading={isLoading} />}
					/>
					<Route path="form" element={<Form />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
