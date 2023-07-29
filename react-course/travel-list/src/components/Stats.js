export function Stats({ items }) {
	const numItems = items.length;
	if (!numItems) {
		return (
			<footer className="stats">
				<em>Please add some items to packing list</em>
			</footer>
		);
	}

	const packed = items.filter((item) => item.packed === true).length;
	const packedPercentage = Math.round((packed / numItems) * 100);
	return (
		<footer className="stats">
			{packedPercentage === 100 ? (
				"All ready to go"
			) : numItems ? (
				<em>
					🧳 You have {numItems} items on your list and your are packed:{packed}{" "}
					and Percentage is ({packedPercentage} %)
				</em>
			) : (
				""
			)}
		</footer>
	);
}
