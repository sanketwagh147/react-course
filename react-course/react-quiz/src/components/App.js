// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";

const initialState = {
	questions: [],
	// Statuses : loading , error, steady, active ,finished
	status: "loading",
	currentQuestion: 0,
	answer: null,
	points: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case "dateReceived":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, status: "error" };
		case "start":
			return { ...state, status: "active" };
		case "newAnswer":
			const question = state.questions.at(state.currentQuestion);
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
				currentQuestion: state.currentQuestion + 1,
				answer: null,
			};
		default:
			throw new Error("Action is unknown");
	}
}

export default function App() {
	const [{ questions, status, currentQuestion, answer, points }, dispatch] =
		useReducer(reducer, initialState);

	const numQuestions = questions.length;
	const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

	useEffect(function () {
		fetch("http://localhost:8000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dateReceived", payload: data }))
			.catch((err) => dispatch({ type: "dataFailed" }));
	}, []);

	return (
		<div className="app">
			<Header numQuestions={numQuestions} currentQuestion={currentQuestion} />
			<Main className="main">
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}
				{status === "active" && (
					<>
						<Progress
							numQuestions={numQuestions}
							currentQuestion={currentQuestion}
							points={points}
							maxPoints={maxPoints}
							answer={answer}
						></Progress>
						<Questions
							question={questions[currentQuestion]}
							dispatch={dispatch}
							answer={answer}
						/>
						<NextButton dispatch={dispatch} answer={answer} />
					</>
				)}
			</Main>
		</div>
	);
}
