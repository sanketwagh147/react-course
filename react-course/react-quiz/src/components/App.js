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
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const initialState = {
	questions: [],
	// Statuses : loading , error, steady, active ,finished
	status: "loading",
	currentQuestion: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsLeft: null,
};

const SECS_PER_QUESTION = 10;

function reducer(state, action) {
	switch (action.type) {
		case "dateReceived":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, status: "error" };
		case "start":
			return {
				...state,
				status: "active",
				secondsLeft: state.questions.length * SECS_PER_QUESTION,
			};
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

export default function App() {
	const [
		{
			questions,
			status,
			currentQuestion,
			answer,
			points,
			highscore,
			secondsLeft,
		},
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
						<Footer>
							<Timer secondsLeft={secondsLeft} dispatch={dispatch} />
							<NextButton
								dispatch={dispatch}
								answer={answer}
								currentQuestion={currentQuestion}
								numQuestions={numQuestions}
							/>
						</Footer>
					</>
				)}
				{status === "finished" && (
					<FinishedScreen
						points={points}
						maxPoints={maxPoints}
						highscore={highscore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}
