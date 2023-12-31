import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));

export default function CityItem({ city }) {
	const { cityName, emoji, date, id, position } = city;
	const { currentCity, deleteCity } = useCities();
	const handleDelete = function (e) {
		e.preventDefault();
		deleteCity(id);
		console.log("Deleting City");
	};
	return (
		<li>
			{/* adding / gets to root else simply adds to current url */}
			<Link
				className={`${styles.cityItem} ${
					id === currentCity.id ? styles["cityItem--active"] : ""
				}`}
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
			>
				<span className="styles.emoji">{emoji}</span>
				<h3 className="styles.name">{cityName}</h3>
				<time className="styles.date">({formatDate(date)})</time>
				<button className={styles.deleteBtn} onClick={handleDelete}>
					&times;
				</button>
			</Link>
		</li>
	);
}
