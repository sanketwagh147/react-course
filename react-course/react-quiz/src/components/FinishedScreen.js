function FinishedScreen({ points, maxPoints, highscore, dispatch }) {
	const percentage = (points / maxPoints) * 100;

	let emoji;
	if (percentage == 100) emoji = "🥇";
	if (percentage >= 80 && percentage < 100) emoji = "🥈";
	if (percentage >= 60 && percentage < 80) emoji = "🥉";
	if (percentage >= 50 && percentage < 60) emoji = "🥇";
	if (percentage >= 40 && percentage < 50) emoji = "�";
	if (percentage >= 0 && percentage < 40) emoji = "😞";
	if (percentage === 0) emoji = "💩";
	return (
		<>
			<p className="result">
				<span>{emoji}</span> You Scored <strong>{points}</strong> out of{" "}
				{maxPoints} ({Math.ceil(percentage)} %)
			</p>
			<p className="highscore">(High score : {highscore} points)</p>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "reset" })}
			>
				Restart
			</button>
		</>
	);
}

export default FinishedScreen;
