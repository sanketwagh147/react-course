import { useState } from "react";

const initialItems = [
	{ id: 1, description: "Passports", quantity: 2, packed: false },
	{ id: 2, description: "Socks", quantity: 12, packed: false },
	{ id: 3, description: "Chips", quantity: 12, packed: true },
];
const MAX_ITEMS = 25;
export default function App() {
	return (
		<div className="app">
			<Logo />
			<Form />
			<PackingList />
			<Stats />
		</div>
	);
}
function Logo() {
	return <h1>✈️ FAR AWAY💼</h1>;
}
function Form() {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);

	function handleSubmit(e) {
		e.preventDefault();
		if (!description) return;
		const newItem = { description, quantity, packed: false, id: Date.now() };
		console.log(newItem);
		setDescription("");
		setQuantity(1);
		initialItems = [...initialItems, newItem];
	}
	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What you need for the trip ?</h3>
			<select
				name=""
				id=""
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}
			>
				{Array.from({ length: MAX_ITEMS }, (_, i) => i + 1).map((each) => (
					<option value={each} key={each}>
						{each}
					</option>
				))}
			</select>
			<input
				type="text"
				name=""
				id=""
				value={description}
				placeholder="Add item here.."
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}

function Item({ item }) {
	return (
		<l1>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button className="">❌</button>
		</l1>
	);
}
function PackingList() {
	return (
		<div className="list">
			<ul>
				{initialItems.map((each) => (
					<Item item={each} key={each.id} />
				))}
			</ul>
		</div>
	);
}
function Stats() {
	return (
		<footer className="stats">
			<em>🧳 You have x items on your list and your are packed x%</em>
		</footer>
	);
}
