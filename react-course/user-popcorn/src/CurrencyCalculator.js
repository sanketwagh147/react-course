import { useEffect, useState } from "react";

export function CurrencyCalculator() {
	const [amount, setAmount] = useState(1);
	const [fromCurr, setFromCurr] = useState("INR");
	const [toCurr, setToCurr] = useState("EUR");
	const [converted, setConverted] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(
		function () {
			async function convertCurr() {
				if (amount <= 0) return;
				try {
					setLoading(true);
					const res = await fetch(
						`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
					);
					if (!res.ok) return;

					const data = await res.json();
					console.log(data);
					const converted = data?.rates[toCurr];
					console.log(converted);

					setConverted(converted);
				} catch (err) {
					console.log(err);
				} finally {
					setLoading(false);
				}
			}
			if (toCurr === fromCurr) return setConverted(amount);
			convertCurr();
		},
		[converted, amount, fromCurr, toCurr]
	);

	return (
		<div className="curr-calc">
			<input
				placeholder="Enter currency to be converted here"
				type="number"
				className="search"
				onChange={(e) => setAmount(Number(e.target.value))}
			/>

			<div className="sel-boxes">
				<select
					className="sel-box"
					value={fromCurr}
					onChange={(e) => setFromCurr(e.target.value)}
					disabled={loading}
				>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
					<option value="CAD">CAD</option>
					<option value="INR">INR</option>
				</select>
				<select
					className="sel-box"
					value={toCurr}
					onChange={(e) => setToCurr(e.target.value)}
					disabled={loading}
				>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
					<option value="CAD">CAD</option>
					<option value="INR">INR</option>
				</select>
			</div>
			<p>{loading ? "loading" : amount > 1 ? `${converted} ${toCurr}` : ""}</p>
		</div>
	);
}
