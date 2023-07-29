import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import { Stats } from "./Stats";

export default function App() {
	const [items, setItems] = useState([]);

	function handleAddItems(item) {
		setItems((items) => [...items, item]);
	}

	function handleDeleteItem(id) {
		console.log(`deleting item with id ${id}`);

		setItems((items) => items.filter((item) => item.id !== id));
	}
	function handleChecked(id) {
		console.log(`Marking item as checked for id : ${id}`);

		const checkedItem = items.filter((item) => item.id === id);
		console.log(checkedItem);
		const updatedItems = items.map((item) =>
			item.id === id ? { ...item, packed: !item.packed } : item
		);
		setItems(updatedItems);

		// setItems((items) => {
		// 	const checkedItem = items.filter((item) => item.id === id);
		// 	console.log(checkedItem);
		// });
	}

	function handleClearItems() {
		if (!items.length) {
			window.alert("Please add some items to clear");
			return;
		}
		const confirm = window.confirm(
			"Are you sure you want to delete the items?"
		);
		if (confirm) setItems([]);
	}

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItems} />
			<PackingList
				items={items}
				onDeleteItem={handleDeleteItem}
				onTogglePacked={handleChecked}
				onClearItems={handleClearItems}
			/>
			<Stats items={items} />
		</div>
	);
}


