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
	const [selectedFriend, setSelectedFriend] = useState(null);

	function handleToggleAddFrndForm() {
		setShowAddFrnd((showAddFrnd) => !showAddFrnd);
	}

	function handleAddFriend(friend) {
		setFriends((friends) => [...friends, friend]);
		setShowAddFrnd(false);
	}

	function handleSelectFriend(friend) {
		setSelectedFriend(friend.id === selectedFriend?.id ? null : friend);

		setShowAddFrnd(false);
	}

	function handleSplitBill(value) {
		setFriends((friends) =>
			friends.map((friend) =>
				friend.id === selectedFriend?.id
					? { ...friend, balance: friend.balance + value }
					: friend
			)
		);
		selectedFriend.balance = selectedFriend.balance + value;
		setSelectedFriend(null);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendList
					friends={friends}
					onSelect={handleSelectFriend}
					selectedFriend={selectedFriend}
				/>
				{showAddFrnd && <FormAddFriend onAddFriend={handleAddFriend} />}
				<Button onClick={handleToggleAddFrndForm}>
					{showAddFrnd ? "Close" : "Add Friend"}
				</Button>
			</div>
			{selectedFriend && (
				<FormSplitBill
					selectedFriend={selectedFriend}
					onSplitBill={handleSplitBill}
				/>
			)}
		</div>
	);
}

function FriendList({ friends, onSelect, selectedFriend }) {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend
					friend={friend}
					key={friend.id}
					onSelect={onSelect}
					isSelected={selectedFriend}
				/>
			))}
		</ul>
	);
}

function Friend({ friend, onSelect, isSelected }) {
	const isCurrentlySelected = friend.id === isSelected?.id;
	return (
		<li className={isCurrentlySelected ? "selected" : ""}>
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
			<Button onClick={() => onSelect(friend)}>
				{isCurrentlySelected ? "Close" : "Select"}
			</Button>
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

function FormAddFriend({ onAddFriend, isSelected }) {
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
	const [bill, setBill] = useState("");
	const [paidByUser, setPaidByUser] = useState("");
	const [whoIsPaying, setWhoIsPaying] = useState("user");
	const friendsExpense = bill ? bill - paidByUser : "";

	function handleSubmit(e) {
		e.preventDefault();

		if (!bill && !paidByUser) return;
		onSplitBill(whoIsPaying === "user" ? friendsExpense : -paidByUser);
	}
	return (
		<form className="form-split-bill" onSubmit={handleSubmit}>
			<h2>Split a bill with {selectedFriend.name}</h2>
			<label>💵 Bill Value</label>
			<input
				type="text"
				value={bill}
				onChange={(e) => setBill(Number(e.target.value))}
			/>

			<label>🧐 Your expenses</label>
			<input
				type="text"
				value={paidByUser}
				onChange={(e) =>
					setPaidByUser(
						Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
					)
				}
			/>

			<label>🙍 {selectedFriend.name}'s expenses</label>
			<input
				type="text"
				value={friendsExpense}
				onChange={(e) =>
					setPaidByUser(
						Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
					)
				}
				disabled
			/>

			<label>🧐 Who is paying the bill?</label>
			<select onChange={(e) => setWhoIsPaying(e.target.value)}>
				<option value="user">You</option>
				<option value="friend">{selectedFriend.name}</option>
			</select>
			<Button>Split Bill</Button>
		</form>
	);
}
