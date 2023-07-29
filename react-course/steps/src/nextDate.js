import { useState } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// export function NextDate() {
// const [dateStep, setDateStep] = useState(1);
// let date = new Date();
// date.setDate(date.getDate());
// const [counter, setcounter] = useState(0);
// function handleIncreaseStep(dateStep) {
// 	setDateStep((step) => step + 1);
// }
// function handleIncreaseDate() {
// 	setdateDisplayed((curr) => {
// 		console.log(dateStep);
// 		let dt = new Date(curr.setDate(curr.getDate() + dateStep));
// 		console.log(dt);
// 		return dt;
// 	});
// }
// function handleDecreaseStep() {
// 	if (dateStep <= 1) return;
// 	setDateStep((step) => step - 1);
// }
// return (
// 	<div className="steps" style={{ width: "80%" }}>
// 		<div>
// 			<button className="btn btn-primary" onClick={handleIncreaseStep}>
// 				{" "}
// 				+{" "}
// 			</button>
// 			<span className="mx-2 p-2 alert alert-primary">STEP :{dateStep}</span>
// 			<button className="btn btn-primary" onClick={handleDecreaseStep}>
// 				{" "}
// 				-{" "}
// 			</button>
// 		</div>
// 		<div className="mt-4">
// 			<button className="btn btn-secondary" onClick={handleIncreaseDate}>
// 				+
// 			</button>
// 			<span className="mx-2 p-2 alert alert-secondary">
// 				COUNTER: {counter}
// 			</span>
// 			<button className="btn btn-secondary" onClick={handleDecreaseStep}>
// 				-
// 			</button>
// 			<h1 className="mt-4">
// 				from {dateStep} days will be {dateDisplayed.toDateString()}
// 			</h1>
// 		</div>
// 	</div>
// );
// }
export default function Counter() {
	const [counter, setCounter] = useState(0);
	const [step, setStep] = useState(1);
	const MIN = 0;
	const MAX = 10;
	function handleSlider(e) {
		setStep(Number(e.target.value));
	}

	const date = new Date();
	date.setDate(date.getDate() + counter);
	return (
		<div>
			<div className="steps">
				<div>
					<input
						type="range"
						class="form-range"
						min={MIN}
						max={MAX}
						value={step}
						onChange={(e) => handleSlider(e)}
					/>

					<span className="alert primary">Step: {step}</span>
				</div>
				<hr />
				<div className="test">
					<button
						className="btn btn-primary"
						onClick={() => setCounter((c) => c - step)}
					>
						-
					</button>
					<input
						type="input"
						class="form-control"
						min={MIN}
						max={MAX}
						value={counter}
						onChange={(e) => handleSlider(e)}
					/>

					<button
						className="btn btn-primary"
						onClick={() => setCounter((c) => c + step)}
					>
						+
					</button>
					<hr></hr>
				</div>
				<div class="badge bg-secondary fs-2 mt-4">
					{counter === 0
						? "Today is "
						: counter > 0
						? `${counter} days from today is `
						: `${Math.abs(counter)} days ago today was `}{" "}
					{date.toDateString()}
				</div>

				{counter !== 0 || step !== 1 ? <div className="mt-2"></div> : null}
			</div>
		</div>
	);
}

