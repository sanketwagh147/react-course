import React from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";
// import "./index.css";
import "./textExpander.css";
import TextExpander from "./TextExpander";
// import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<TextExpander>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla porro
			beatae quo accusamus officiis ut sapiente incidunt, cum veniam saepe id.
			Libero quaerat quo fuga harum aliquid quos id deserunt doloremque
			consequuntur dignissimos. Qui assumenda blanditiis corrupti quas debitis
			consectetur! Reiciendis hic molestias unde sunt deleniti magni similique
			adipisci debitis, enim eaque porro dignissimos? Minus illo adipisci
			dolorum mollitia fugit, vitae impedit ut ipsam hic accusamus nostrum
			consectetur in fuga obcaecati voluptas odit soluta natus error, nisi
			corrupti odio tenetur aliquam reprehenderit! Cumque ducimus, in, earum
			labore dignissimos consectetur hic accusamus a odit vero at reiciendis
			debitis est dolor optio.
		</TextExpander>

		<TextExpander
			collapsedNumWords={20}
			expandButtonText="Show text"
			collapseButtonText="Collapse text"
			buttonColor="#ff6622"
		>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis atque
			explicabo ipsam deserunt harum modi minus aut voluptatibus. Tempore magnam
			harum inventore, odio odit totam iste facilis temporibus accusamus hic
			consequatur ipsa adipisci vel, nam sapiente cum unde quibusdam itaque
			expedita modi ea. Labore error exercitationem nobis accusamus tenetur, rem
			harum et eveniet, corporis, veniam sed eligendi animi at. Illum, soluta
			vero explicabo quam ducimus nemo neque deleniti accusantium aperiam
			molestiae deserunt, sint eum, ipsam sequi voluptatem possimus obcaecati
			perspiciatis?
		</TextExpander>

		<TextExpander expanded={true} className="box">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt sit
			dolor, maiores asperiores facere amet tempora quis? Doloremque ratione
			libero officia. Eos nihil sed natus reprehenderit maxime corrupti impedit
			iure et, voluptatem, quam facilis dicta quia fugit inventore enim harum?
		</TextExpander>
		{/* <App /> */}
		{/* <StarRating
			maxRating={5}
			messages={["Excellent", "Great", "Okay", "Bad", "Very Bad"].reverse()}
		/>
		<StarRating
			maxRating={15}
			color={"red"}
			size={24}
			className="test"
			defaultRating={4}
		/>
		<StarRating
			maxRating={3}
			color={"#333"}
			size={100}
			defaultRating={1}
			messages={["cool", "cooler", "coolest"]}
		/> */}
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
