import { useState } from "react";

export default function TextExpander({
	collapsedNumWords = 20,
	expandButtonText = "Show more..",
	collapseButtonText = "Show less",
	buttonColor = "#1f09cd",
	expanded = false,
	className,
	children,
}) {
	const [isExpanded, setIsExpanded] = useState(expanded);
	const buttonStyle = {
		background: "none",
		font: "inherit",
		cursor: "pointer",
		border: "none",
		marginLeft: "6px",
		color: buttonColor,
	};

	const displayText = isExpanded
		? children
		: children.split(" ").slice(0, collapsedNumWords).join("") + "....";
	return (
		<div className={className}>
			<span>{displayText}</span>
			<button
				style={buttonStyle}
				onClick={() =>
					setIsExpanded((isExpanded) => setIsExpanded(!isExpanded))
				}
			>
				{isExpanded ? collapseButtonText : expandButtonText}
			</button>
		</div>
	);
}
