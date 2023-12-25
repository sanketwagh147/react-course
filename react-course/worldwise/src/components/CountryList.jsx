import React from "react";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

export default function CountryList({ cities, isLoading }) {
	console.error(typeof cities);
	console.error("IsLoading", isLoading);
	if (isLoading) return <Spinner />;

	// No cities
	if (!cities.length) {
		return (
			<Message message="Add your first city by clicking on any city on the map" />
		);
	}

	const countries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country)) {
			return [...arr, { country: city.country, emoji: city.emoji }];
		}
		return arr;
	}, []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country.country} />
			))}
		</ul>
	);
}
