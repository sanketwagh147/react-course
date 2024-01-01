import { useQuiz } from "../context/QuizContext";

function StartScreen() {
	const { numQuestions, dispatch } = useQuiz();
	return (
		<div className="start">
			<h2>React Quiz</h2>
			<h3>{numQuestions} questions to test your react mastery</h3>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "start" })}
			>
				Lets Start
			</button>
		</div>
	);
}

export default StartScreen;
