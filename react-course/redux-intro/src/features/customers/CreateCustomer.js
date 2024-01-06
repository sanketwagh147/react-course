import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

function Customer() {
	const [fullName, setFullName] = useState("");
	const [nationalId, setNationalId] = useState("");
	// const {fullName} = useSelector((state) => state.account);

	const dispatch = useDispatch();

	function handleClick() {
		console.log("handle click customer working");
		if (!fullName || !nationalId) return;
		dispatch(createCustomer(fullName, nationalId));
	}

	return (
		<div>
			<h2>Create New customer</h2>
			<div className="inputs">
				<div>
					<label>Customer full name</label>
					<input
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
					/>
				</div>
				<div>
					<label>National ID</label>
					<input
						value={nationalId}
						onChange={(e) => setNationalId(e.target.value)}
					/>
				</div>
				<button onClick={handleClick}>Create new customer</button>
			</div>
		</div>
	);
}

export default Customer;
