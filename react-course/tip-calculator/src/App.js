import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
	return (
		<div className="container">
			<TipCalculator />
		</div>
	);
}

function TipCalculator() {
	const [bill, setBill] = useState("");
	const [selfPer, setSelfPer] = useState(0);
	const [friendPer, setFriendPer] = useState(0);

	const tip = (bill * ((selfPer + friendPer) / 2)) / 100;
	function handleReset() {
		setBill("");
		setFriendPer(0);
		setSelfPer(0);
	}
	return (
		<div>
			<BillInput bill={bill} onSetBill={setBill}></BillInput>
			<SelectPercentage percentage={selfPer} onSelect={setSelfPer}>
				How did you Like the service ?
			</SelectPercentage>
			<SelectPercentage percentage={friendPer} onSelect={setFriendPer}>
				How did your friend like this service ?
			</SelectPercentage>
			{bill > 0 && (
				<>
					<Output bill={bill} tip={tip}></Output>
					<Reset onReset={handleReset}></Reset>
				</>
			)}
		</div>
	);
}

function BillInput({ bill, onSetBill }) {
	return (
		<div className="alert alert-primary" style={{ marginTop: "10px" }}>
			<label>How much was the bill ? </label>
			<input
				className="form-control"
				type="text"
				value={bill}
				placeholder="please enter bill amount"
				onChange={(e) => onSetBill(Number(e.target.value))}
			/>
		</div>
	);
}
function SelectPercentage({ percentage, onSelect, children }) {
	return (
		<div className="alert alert-light">
			<label>{children}</label>
			<select
				className="form-select"
				value={percentage}
				onChange={(e) => onSelect(Number(e.target.value))}
			>
				<option value="0">Dissatisfied (0%)</option>
				<option value="5">Dissatisfied (5%)</option>
				<option value="10">Dissatisfied (10%)</option>
				<option value="20">Dissatisfied (20%)</option>
			</select>
		</div>
	);
}
function Output({ bill, tip }) {
	return (
		<div className="alert alert-dark">
			<h3>{`You pay ₹${bill + tip} [ ₹${bill} bill (₹${tip} tip)]`}</h3>
		</div>
	);
}
function Reset({ onReset }) {
	return (
		<button className="btn btn-danger" onClick={onReset}>
			Reset
		</button>
	);
}

export default App;
