import React from "react";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

export default function CityList({ cities, isLoading }) {
	console.error(typeof cities);
	console.error("IsLoading", isLoading);
	if (isLoading) return <Spinner />;

	// No cities
	if (!cities.length) {
		return (
			<Message message="Add your first city by clicking on any city on the map" />
		);
	}
	return (
		<ul className={styles.cityList}>
			{cities.map((city) => (
				<CityItem city={city} key={city.id} />
			))}
		</ul>
	);
}
