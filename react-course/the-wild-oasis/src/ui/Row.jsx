import styled, { css } from "styled-components";

const Row = styled.div`
	display: flex;

	${(props) =>
		props.type === "horizontal" &&
		css`
			justify-content: space-between;
			align-items: center;
		`}
	${(props) =>
		props.type === "vertical" &&
		css`
			justify-content: space-between;
			align-items: center;
			flex-direction: column;
			gap: 1.6rem;
		`}
`;

// Setting defaul props for react components
Row.defaultProps = {
	type: "vertical",
};
export default Row;
