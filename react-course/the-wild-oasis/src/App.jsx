// Main App module things start from index to here

import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
	font-size: 30px;
	font-weight: 600;
`;

const StyledApp = styled.main`
	background-color: orange;
	padding: 20px;
`;

export default function App() {
	return (
		<>
			{/* Global styles imported for styled components must be siblings with Component */}
			<GlobalStyles />
			<StyledApp>
				<H1>The Wild Oasis</H1>
				<Button>Check In</Button>
				<Button>Check Check Out</Button>
				<Input type="number" placeholder="Number of guests" />
				<Input type="number" placeholder="Number of guests" />
			</StyledApp>
		</>
	);
}
