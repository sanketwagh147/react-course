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
		soldOut: true,
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
	const closeHour = 22;

	const isOpen = hour >= openHour && hour <= closeHour;
	console.log(isOpen);

	// if (hour >= openHour && hour <= closeHour) alert("We are Open");
	// else alert("Sorry, We are closed now!");
	return (
		<footer className="footer">
			{isOpen && (
				<div className="order">
					<p>
						We are open until {openHour}:00. Come visit or can order online.
					</p>
					<button className="btn">Order</button>
				</div>
			)}
		</footer>
	);
}

function Menu() {
	const pizzas = pizzaData;
	// const pizzas = [];
	const numPizzas = pizzas.length;

	return (
		<>
			{numPizzas > 0 ? (
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
					veritatis tempore facilis laborum, assumenda ea odit ut quibusdam,
					facere dolore accusamus quia eaque. Fuga cum vero laboriosam similique
					tempore fugiat laudantium dolore illum quaerat eos, corrupti est ipsum
					fugit esse.
				</p>
			) : (
				<p>We don not have any pizzas</p>
			)}
			<main className="menu">
				<h2>Menu</h2>
				<ul className="pizzas">
					{pizzas.map((each) => (
						<Pizza {...each} key={each.name} />
					))}
				</ul>
			</main>
		</>
	);
}

function Pizza({ name, price, photoName, ingredients, soldOut }) {
	return (
		<li className={`pizza ${soldOut ? "sold-out" : ""}`}>
			<img alt={name} src={photoName}></img>

			<div>
				<h3>{name}</h3>
				<p>{ingredients}</p>
				<span>Price : {price}</span>
			</div>
		</li>
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
