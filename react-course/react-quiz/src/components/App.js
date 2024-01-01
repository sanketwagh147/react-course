// import DateCounter from "./DateCounter";
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
import { useQuiz } from "../context/QuizContext";

export default function App() {
	// return <div>Hello</div>;

	const { status } = useQuiz();
	return (
		<div className="app">
			<Header />
			<Main className="main">
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && <StartScreen />}
				{status === "active" && (
					<>
						<Progress />
						<Questions />
						<Footer>
							<Timer />
							<NextButton />
						</Footer>
					</>
				)}
				{status === "finished" && <FinishedScreen />}
			</Main>
		</div>
	);
}
