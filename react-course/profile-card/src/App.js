import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

const profiles = [
	{
		name: "Sanket Wagh",
		designation: "Software Developer",
		skills: [
			{ skill: "python", color: "success", emoji: "💪" },
			{ skill: "javascript", color: "warning", emoji: "🧐" },
		],
	},
];

function SideRow() {
	const sideRowStyle = { width: "20vw", backgroundColor: "#ffbf00" };
	return <div style={sideRowStyle}></div>;
}
function Skill(props) {
	const className_ = `alert alert-${props.color}`;
	const skillStyle = {
		margin: "5px",
	};
	return (
		<span className={className_} style={skillStyle}>
			{props.skill} {props.emoji}
		</span>
	);
}

function ProfileName(props) {
	const profileNameStyle = { fontWeight: "600" };
	const imgStyle = {
		height: "400px",
		width: "400px",
	};
	console.log(props.skills);

	return (
		<div>
			<img
				className="card-img-top"
				style={imgStyle}
				alt="something"
				src="user2.jpg"
			></img>
			<h1 style={profileNameStyle}>{props.name}</h1>
			<h2>{props.designation}</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
				blanditiis deleniti incidunt dicta adipisci accusantium beatae alias ad
				nostrum a sint libero, quo corrupti hic voluptate soluta deserunt
				molestias atque eos officia, voluptatibus sunt. Ducimus iusto amet unde
				ipsa impedit, illum, obcaecati libero ipsam consequuntur quo, ullam
				blanditiis sapiente. Aperiam eveniet incidunt debitis, quos in
				cupiditate saepe sed dicta quod.{" "}
			</p>
			<div>
				{props.skills.map((each) => (
					<Skill {...each} />
				))}
			</div>
		</div>
	);
}

function CenterCard() {
	// const centerCardStyle = {
	// 	width: "60vw",
	// 	backgroundColor: "#eee;",
	// 	border: "2px solid black",
	// 	padding: "2rem",
	// };
	return (
		<div className="card">
			<ProfileName {...profiles[0]}></ProfileName>
		</div>
	);
}

function Container() {
	const containerStyle = {
		display: "flex",
		height: "100vh",
		width: "100vw",
	};
	return (
		<div style={containerStyle}>
			<SideRow></SideRow>
			<CenterCard></CenterCard>
			<SideRow></SideRow>
		</div>
	);
}

function App() {
	return <Container />;
}

export default App;
