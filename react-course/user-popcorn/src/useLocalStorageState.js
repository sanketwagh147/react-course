import { useState, useEffect } from "react";

export function useLocalStorage(initialState, key) {
	const [value, setValue] = useState(() => {
		const storedValues = localStorage.getItem(key);
		return storedValues ? JSON.parse(storedValues) : initialState;
	});

	useEffect(() => {
		localStorage.setItem("watched", JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
}
