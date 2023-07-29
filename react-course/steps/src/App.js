import { useState } from "react";

const messages = [
	"Learn React ⚛️",
	"Apply for jobs 💼",
	"Invest your new income 🤑",
];

export default function App() {
	const [step, setStep] = useState(1);
	const [isOpen, setIsOpen] = useState(true);

	function handlePrevious(e) {
		if (step <= 1) return;

		// ⚡ Setter function should always be passed with callback function if the state is changed based on current state value else  not need for a  call back function
		setStep((s) => s - 1);
		// setStep = step + 1;
	}
	function handleNext(e) {
		if (step >= 3) return;
		setStep((s) => s + 1);
	}

	return (
		<>
			<button className="close" onClick={() => setIsOpen((is) => !is)}>
				{isOpen ? "X" : "O"}
			</button>
			{isOpen && (
				<div className="steps">
					<div className="numbers">
						<div className={step >= 1 ? "active" : ""}>1</div>
						<div className={step >= 2 ? "active" : ""}>2</div>
						<div className={step >= 3 ? "active" : ""}>3</div>
					</div>
					<StepMessage step={step}>{messages[step - 1]}</StepMessage>
					<div className="buttons">
						<Button textColor="#fff" bgColor="#7950f2" onClick={handlePrevious}>
							⬅️ Previous
						</Button>
						<Button textColor="#fff" bgColor="#7950f2" onClick={handleNext}>
							Next ➡️
						</Button>
					</div>
				</div>
			)}
		</>
	);
}

function StepMessage({ step, children }) {
	return (
		<div className="message">
			Step: {step}: {children}
		</div>
	);
}

function Button({ textColor, bgColor, onClick, children }) {
	return (
		<button
			style={{ backgroundColor: bgColor, color: textColor }}
			onClick={onClick}
		>
			{children}
		</button>
	);
}