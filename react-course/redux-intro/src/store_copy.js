import { combineReducers, createStore } from "redux";
import Customer from "./Customer";

const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

const initialStateCustomer = {
	fullName: "",
	nationalId: "",
	createdAt: "",
};

// Reducers are not allowed to modify existing state and not allowed for async logic and side effects
function accountReducer(state = initialStateAccount, action) {
	switch (action.type) {
		case "account/deposit":
			return { ...state, balance: state.balance + action.payload };
		case "account/withdraw":
			return { ...state, balance: state.balance + action.payload };
		case "account/requestLoan":
			if (state.loan > 0) return state;
			// TODO:
			return { ...state, balance: state.balance + action.payload };

		case "account/payLoan":
			return { ...state, balance: state.balance - action.loan };
		// In Redux don't throw error simply return the original state
		default:
			return state;
	}
}

function customerReducer(state = initialStateCustomer, action) {
	switch (action.type) {
		case "customer/createCustomer":
			return {
				...state,
				fullName: action.payload.fullName,
				nationalId: action.payload.nationalId,
				createdAt: action.payload.createdAt,
			};
		case "customer/updateName":
			return { ...state, fullName: action.payload };
		default:
			return initialStateCustomer;
	}
}

const rootReducer = combineReducers({
	account: accountReducer,
	customer: customerReducer,
});

const store = createStore(rootReducer);

function deposit(amount) {
	return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
	return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
	return { type: "account/requestLoan", payload: { amount, purpose } };
}
function createCustomer(fullName, nationalId) {
	return {
		type: "customer/createCustomer",
		payload: { fullName, nationalId, createdAt: new Date().toISOString() },
	};
}

function updateName(fullName) {
	return { type: "account/updateName", payload: fullName };
}

store.dispatch(createCustomer(createCustomer("Sanket Wagh", "1234")));
store.dispatch(deposit(1000));
store.dispatch(deposit(100));
console.log(store.getState());
