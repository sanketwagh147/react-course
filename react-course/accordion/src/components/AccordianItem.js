import { useState } from "react";
export default function AccordionItem({
	num,
	title,
	currOpen,
	onOpen,
	children,
}) {
	function handleToggleItem() {
		onOpen(currOpen ? null : num);
	}
	const accordionItemClasses = num === currOpen ? "item open" : "item";
	const isOpen = num === currOpen;
	return (
		<div className={accordionItemClasses} onClick={handleToggleItem}>
			<p className="number">{num < 9 ? `0${num}` : num}</p>
			<p className="title">{title}</p>
			<p className="icon">{isOpen ? "-" : "+"}</p>
			{isOpen && <p className="content-box">{children}</p>}
		</div>
	);
}
