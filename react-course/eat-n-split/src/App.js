import { useState } from "react";
const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

export default function App() {
	const [showAddFrnd, setShowAddFrnd] = useState(false);
	const [friends, setFriends] = useState(initialFriends);

	function handleToggleAddFrndForm() {
		setShowAddFrnd((showAddFrnd) => !showAddFrnd);
	}

	function handleAddFriend(friend) {
		setFriends((friends) => [...friends, friend]);
		setShowAddFrnd(false);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendList friends={friends} />
				{showAddFrnd && <FormAddFriend onAddFriend={handleAddFriend} />}
				<Button onClick={handleToggleAddFrndForm}>
					{showAddFrnd ? "Close" : "Add Friend"}
				</Button>
			</div>
			<FormSplitBill />
		</div>
	);
}

function FriendList({ friends }) {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend friend={friend} key={friend.id} />
			))}
		</ul>
	);
}

function Friend({ friend }) {
	return (
		<li>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name}</h3>
			{friend.balance < 0 && (
				<p className="red">
					You owe {friend.name} ₹ {Math.abs(friend.balance)}
				</p>
			)}
			{friend.balance > 0 && (
				<p className="green">
					Your friend {friend.name} owe you ₹ {Math.abs(friend.balance)}
				</p>
			)}
			{friend.balance === 0 && <p>Your and {friend.name} are even.</p>}
			<Button>Select</Button>
		</li>
	);
}
function Button({ onClick, children }) {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	);
}

function FormAddFriend({ onAddFriend }) {
	const [name, setName] = useState("");
	const [image, setImage] = useState("https://i.pravatar.cc/48");

	function handleSubmit(e) {
		e.preventDefault();
		if (!name && !image) return;

		const id = crypto.randomUUID();
		const newFriend = {
			name,
			image: `${image}?=${id}`,
			balance: 0,
			id,
		};
		console.log(newFriend);
		onAddFriend(newFriend);
		setName("");
		setImage("https://i.pravatar.cc/48");
	}

	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label>🙍 Friend name</label>
			<input
				type="text"
				onChange={(e) => setName(e.target.value)}
				value={name}
			/>

			<label>📷 Image Url</label>
			<input
				type="text"
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>
			<Button>Add</Button>
		</form>
	);
}

function FormSplitBill() {
	return (
		<form className="form-split-bill">
			<h2>Split a bill with $Friend</h2>
			<label> Bill Value</label>
			<input type="text" />

			<label>🧐 Your expenses</label>
			<input type="text" />

			<label>Friends expenses</label>
			<input type="text" disabled />

			<label>🧐 Who is paying the bill?</label>
			<select>
				<option value="user">You</option>
				<option value="friend">X</option>
			</select>
			<Button>Split Bill</Button>
		</form>
	);
}
