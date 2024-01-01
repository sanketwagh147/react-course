import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
const SECS_PER_QUESTION = 10;

const initialState = {
	questions: [],
	// Statuses : loading , error, steady, active ,finished
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsLeft: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "dateReceived":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, status: "error" };
		case "start":
			const st = {
				...state,
				status: "active",
				secondsLeft: state.questions.length * SECS_PER_QUESTION,
			};
			// console.error(st);

			return st;
		case "newAnswer":
			const question = state.questions.at(state.index);
			const points =
				action.payload === question.correctOption
					? state.points + question.points
					: state.points;
			return {
				...state,
				answer: action.payload,
				points: points,
			};
		case "nextQuestion":
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};
		case "finished":
			return {
				...state,
				status: "finished",
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};
		case "reset":
			return { ...initialState, questions: state.questions, status: "ready" };
		case "tick":
			return {
				...state,
				secondsLeft: state.secondsLeft - 1,
				status: state.secondsLeft <= 0 ? "finished" : state.status,
			};
		default:
			throw new Error("Action is unknown");
	}
}
function QuizProvider({ children }) {
	const [
		{ questions, status, index, answer, points, highscore, secondsLeft },
		dispatch,
	] = useReducer(reducer, initialState);

	const numQuestions = questions.length;
	const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

	useEffect(function () {
		fetch("http://localhost:8000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dateReceived", payload: data }))
			.catch((err) => dispatch({ type: "dataFailed" }));
	}, []);

	return (
		<QuizContext.Provider
			value={{
				questions,
				status,
				index,
				answer,
				points,
				highscore,
				secondsLeft,
				numQuestions,
				maxPoints,
				dispatch,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}

function useQuiz() {
	const context = useContext(QuizContext);
	if (context === undefined) throw new Error("Question Context out of scope");
	return context;
}

export { QuizProvider, useQuiz };
