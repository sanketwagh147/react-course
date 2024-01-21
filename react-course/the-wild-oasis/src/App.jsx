// // Main App module things start from index to here

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import styled from "styled-components";
// import GlobalStyles from "./styles/GlobalStyles";
// import Button from "./ui/Button";
// import Input from "./ui/Input";
// import Heading from "./ui/Heading";
// import Row from "./ui/Row";

// // const H1 = styled.h1`
// // 	font-size: 30px;
// // 	font-weight: 600;
// // `;

// const StyledApp = styled.main`
// 	padding: 20px;
// `;

// export default function App() {
// 	return (
// 		<>
// 			{/* Global styles imported for styled components must be siblings with Component */}
// 			<GlobalStyles />import Dashboard from './pages/Dashboard';
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 			<Row>
// 				<StyledApp>
// 					<Row type="horizontal">
// 						<Heading type="h1">The Wild Oasis</Heading>
// 						<div>
// 							<Heading as="h2">Check In and Out</Heading>
// 							<Button variation="primary" size="medium">
// 								Check In
// 							</Button>
// 							<Button variation="secondary" size="small">
// 								Check Check Out
// 							</Button>
// 						</div>
// 					</Row>
// 					<Row>
// 						<Heading as="h3">Form</Heading>
// 						<form action="">
// 							<Input type="number" placeholder="Number of guests" />
// 							<Input type="number" placeholder="Number of guests" />
// 						</form>
// 					</Row>
// 				</StyledApp>
// 			</Row>
// 		</>
// 	);
// }

// For react query library setup this and check Tanstack docs
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// if the state is tale then it will refetch after browser switching
			// staleTime: 60 * 1000,
			staleTime: 0,
		},
	},
});

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			{/* Used for react query devtools */}
			<ReactQueryDevtools initialIsOpen={false} />
			<GlobalStyles />

			<BrowserRouter>
				<Routes>
					{/* The app layout will be parent and will render for all child components  */}
					{/* //✅ Outlet Component must be passed for this AppLayout to work in individual components */}
					<Route element={<AppLayout />}>
						{/* The above route is layout path as it does not have the path prop */}
						<Route index element={<Navigate replace to="dashboard" />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="bookings" element={<Bookings />} />
						<Route path="cabins" element={<Cabins />} />
						<Route path="users" element={<NewUsers />} />
						<Route path="settings" element={<Settings />} />
						<Route path="account" element={<Account />} />
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
