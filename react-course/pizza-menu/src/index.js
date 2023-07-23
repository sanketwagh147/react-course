import React from "react";
import ReactDOM from "react-dom/client";
// including external css files to react app
import "./index.css";

const pizzaData = [
	{
		name: "Focaccia",
		ingredients: "Bread with italian olive oil and rosemary",
		price: 6,
		photoName: "pizzas/focaccia.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Margherita",
		ingredients: "Tomato and mozarella",
		price: 10,
		photoName: "pizzas/margherita.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Spinaci",
		ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
		price: 12,
		photoName: "pizzas/spinaci.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Funghi",
		ingredients: "Tomato, mozarella, mushrooms, and onion",
		price: 12,
		photoName: "pizzas/funghi.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Salamino",
		ingredients: "Tomato, mozarella, and pepperoni",
		price: 15,
		photoName: "pizzas/salamino.jpg",
		soldOut: true,
	},
	{
		name: "Pizza Prosciutto",
		ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
		price: 18,
		photoName: "pizzas/prosciutto.jpg",
		soldOut: false,
	},
];


function Header() {
	// const headerStyle = {
	// 	color: "red",
	// 	fontSize: "48px",
	// 	backgroundColor: "#ffbf00",
	// 	textTransform: "uppercase",
	// };
	const headerStyle = {};
	return (
		<header className="header">
			<h1 style={headerStyle}>Fast React Pizza Company</h1>
		</header>
	);
}

// //! creating element with create element not recommended
// function Footer() {
// return React.createElement("footer", null, "We are currently open!");
// }

function Footer() {
	const hour = new Date().getHours();

	const openHour = 10;
	const closeHour = 12;

	const isOpen = hour >= openHour && hour <= closeHour;
	console.log(isOpen);

	// if (hour >= openHour && hour <= closeHour) alert("We are Open");
	// else alert("Sorry, We are closed now!");
	return (
		<footer className="footer">
			{" "}
			{new Date().toLocaleTimeString()} We are currently open!
		</footer>
	);
}

function Menu() {
	const pizzaProps = {
		name: "Pizza Spinaachi veggies",
		ingredients: "Tomato , cheese, spinach etc",
		photoName: 'pizzas/spinaci.jpg',
		price : '₹ 500'
	}
	return (
		<main className="menu">
			<h2>Menu</h2>
			{pizzaData.map((each)=><Pizza {...each}/>)}
		</main>
	);
}

function Pizza(props) {
	return (
		<div className="pizza" >
			<img alt={props.name} src={props.photoName}></img>
			
			<div>
				<h3>{props.name}</h3>
				<p>{props.ingredients}</p>
				<span>Price : {props.price + 3}</span>
			</div>
		</div>
	);
}
function App() {
	return (
		<div className="container">
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
