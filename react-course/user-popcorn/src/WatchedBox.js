import { useState } from "react";
import { WatchedMoviesList } from "./WatchedMoviesList";
import { WatchedSummary } from "./WatchedSummary";
import { tempWatchedData } from "./App";

export function WatchedBox() {
	const [isOpen2, setIsOpen2] = useState(true);
	const [watched, setWatched] = useState(tempWatchedData);
	return (
		<div className="box">
			<button
				className="btn-toggle"
				onClick={() => setIsOpen2((open) => !open)}
			>
				{isOpen2 ? "–" : "+"}
			</button>
			{isOpen2 && (
				<>
					<WatchedSummary watched={watched} />
					<WatchedMoviesList watched={watched} />
				</>
			)}
		</div>
	);
}
