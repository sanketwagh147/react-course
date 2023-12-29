import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import "./index.css";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";

function App() {
	return (
		// Using Routes in react app
		<CitiesProvider>
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
						<Route path="cities" element={<CityList />} />
						<Route path="cities/:id" element={<City />} />
						<Route path="countries" element={<CountryList />} />
						<Route path="form" element={<Form />} />
					</Route>
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</CitiesProvider>
	);
}

export default App;
