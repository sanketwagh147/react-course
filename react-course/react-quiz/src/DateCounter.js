import { useReducer, useState } from "react";

const initialState = { count: 0, step: 1 };
function reducer(currState, action) {
	console.log(currState, action);
	// if (action.type === "set") {
	// 	return action.payload;
	// }
	// if (action.type === "inc") {
	// 	return currState + 1;
	// }
	// if (action.type === "dec") {
	// 	return currState - 1;
	// }
	switch (action.type) {
		case "inc":
			return { ...currState, count: currState.count + currState.step };
		case "dec":
			return { ...currState, count: currState.count - currState.step };
		case "set":
			return { ...currState, count: action.payload };
		case "setStep":
			return { ...currState, step: action.payload };
		case "reset":
			return initialState;
		default:
			throw new Error("Unknown Error");
	}
}

function DateCounter() {
	// const [count, setCount] = useState(0);

	const [count, dispatch] = useReducer(reducer, initialState);

	// const [step, setStep] = useState(1);

	// This mutates the date object.
	const date = new Date("june 21 2027");
	date.setDate(date.getDate() + count.count);

	const dec = function () {
		// setCount((count) => count - 1);
		// setCount((count) => count - step);
		dispatch({ type: "dec" });
	};

	const inc = function () {
		// setCount((count) => count + 1);
		// setCount((count) => count + step);
		dispatch({ type: "inc" });
	};

	const defineCount = function (e) {
		// setCount(Number(e.target.value));
		dispatch({ payload: Number(e.target.value), type: "set" });
	};

	const defineStep = function (e) {
		// setStep(Number(e.target.value));
		dispatch({ type: "setStep", payload: Number(e.target.value) });
	};

	const reset = function () {
		// setStep(1);
		dispatch({ type: "reset" });
	};

	return (
		<div className="counter">
			<div>
				<input
					type="range"
					min="0"
					max="10"
					value={count.step}
					onChange={defineStep}
				/>
				<span>{count.step}</span>
			</div>

			<div>
				<button onClick={dec}>-</button>
				<input value={count.count} onChange={defineCount} />
				<button onClick={inc}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	);
}
export default DateCounter;
