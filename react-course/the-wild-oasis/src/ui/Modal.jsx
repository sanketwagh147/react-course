import styled from "styled-components";

import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import {
	cloneElement,
	createContext,
	useContext,
	useRef,
	useState,
} from "react";
import useOutsideClick from "../hooks/useOutsideHook";
const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

// Creating a compound Component

// 1 Create a context
const ModalContext = createContext();

// eslint-disable-next-line react/prop-types
function Modal({ children }) {
	const [openName, setOpenName] = useState("");

	const close = () => setOpenName("");
	const open = setOpenName;

	return (
		<ModalContext.Provider value={{ openName, close, open }}>
			{children}
		</ModalContext.Provider>
	);
}

function Open({ children, opens }) {
	console.log(opens);

	const { open } = useContext(ModalContext);
	console.log("opening opne");

	return cloneElement(children, { onClick: () => open(opens) });
}

// eslint-disable-next-line react/prop-types
// eslint-disable-next-line react/prop-types
function Window({ children, opensWindowName }) {
	const { openName, close } = useContext(ModalContext);
	//React Portal good for modals tool tips
	//renders component anywhere while keeping it in the DOM
	// The main reason to use react portal is to avoid clashes with overflow hidden in the parent element i.e if it is in some component which has overflow which is hidden overflow may be cut off ch:367 react udemy
	console.log("window", openName);

	const ref = useOutsideClick(close);
	if (opensWindowName !== openName) return null;

	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={close}>
					<HiXMark />
				</Button>

				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		//Don node where we want to render
		document.body
	);
}
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
