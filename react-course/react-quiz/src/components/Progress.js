function Progress({
	currentQuestion,
	numQuestions,
	points,
	maxPoints,
	answer,
}) {
	return (
		<header className="progress">
			<progress
				max={numQuestions}
				value={currentQuestion + Number(answer !== null)}
			/>
			<p>
				Question: <strong>{currentQuestion + 1}</strong> / {numQuestions}
			</p>
			<p>
				<strong>{points}</strong> / {maxPoints}
			</p>
		</header>
	);
}

export default Progress;
