import { useState } from "react";
const MAX_ITEMS = 25;
export default function Form({ onAddItems }) {
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState(1);

	function handleSubmit(e) {
		e.preventDefault();
		if (!description) return;

		const newItem = { description, quantity, packed: false, id: Date.now() };
		console.log(newItem);
		setDescription("");
		setQuantity(1);
		// initialItems = [...initialItems, newItem];
		onAddItems(newItem);
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
