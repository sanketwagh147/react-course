import AccountOperations from "./features/accounts/AccountOperations";
import CreateCustomer from "./features/customers/CreateCustomer";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import Customer from "./features/customers/Customer";
import { useSelector } from "react-redux";

function App() {
	const fullName = useSelector((store) => {
		return store.customer.fullName;
	});
	console.log("fullname in app", fullName);

	return (
		<div>
			<h1>🏦 The React-Redux Bank ⚛️</h1>

			{fullName === "" ? (
				<CreateCustomer />
			) : (
				<>
					<Customer />
					<AccountOperations />
					<BalanceDisplay />
				</>
			)}

			{/* <CreateCustomer /> */}
			{/* <Customer /> */}
			{/* <AccountOperations /> */}
			{/* <BalanceDisplay /> */}
		</div>
	);
}

export default App;
