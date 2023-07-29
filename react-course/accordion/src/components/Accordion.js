import { useState } from "react";
import AccordionItem from "./AccordianItem";

export function Accordion({ data }) {
	const [currOpen, setCurrOpen] = useState(null);
	return (
		<>
			{data.map((item, index) => (
				<div>
					<AccordionItem
						title={item.title}
						num={index + 1}
						key={item.title}
						currOpen={currOpen}
						onOpen={setCurrOpen}
					>
						{item.text}
					</AccordionItem>
				</div>
			))}
			<AccordionItem
				title="Reusable item"
				num="8"
				currOpen={currOpen}
				onOpen={setCurrOpen}
			>
				Test
				<ul>
					<li>test</li>
					<li>test</li>
				</ul>
			</AccordionItem>
		</>
	);
}
