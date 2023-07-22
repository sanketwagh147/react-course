const data = [
	{
		id: 1,
		title: "The Lord of the Rings",
		publicationDate: "1954-07-29",
		author: "J. R. R. Tolkien",
		genres: [
			"fantasy",
			"high-fantasy",
			"adventure",
			"fiction",
			"novels",
			"literature",
		],
		hasMovieAdaptation: true,
		pages: 1216,
		translations: {
			spanish: "El señor de los anillos",
			chinese: "魔戒",
			french: "Le Seigneur des anneaux",
		},
		reviews: {
			goodreads: {
				rating: 4.52,
				ratingsCount: 630994,
				reviewsCount: 13417,
			},
			librarything: {
				rating: 4.53,
				ratingsCount: 47166,
				reviewsCount: 452,
			},
		},
	},
	{
		id: 2,
		title: "The Cyberiad",
		publicationDate: "1965-01-01",
		author: "Stanislaw Lem",
		genres: [
			"science fiction",
			"humor",
			"speculative fiction",
			"short stories",
			"fantasy",
		],
		hasMovieAdaptation: false,
		pages: 295,
		translations: {},
		reviews: {
			goodreads: {
				rating: 4.16,
				ratingsCount: 11663,
				reviewsCount: 812,
			},
			librarything: {
				rating: 4.13,
				ratingsCount: 2434,
				reviewsCount: 0,
			},
		},
	},
	{
		id: 3,
		title: "Dune",
		publicationDate: "1965-01-01",
		author: "Frank Herbert",
		genres: ["science fiction", "novel", "adventure"],
		hasMovieAdaptation: true,
		pages: 658,
		translations: {
			spanish: "",
		},
		reviews: {
			goodreads: {
				rating: 4.25,
				ratingsCount: 1142893,
				reviewsCount: 49701,
			},
		},
	},
	{
		id: 4,
		title: "Harry Potter and the Philosopher's Stone",
		publicationDate: "1997-06-26",
		author: "J. K. Rowling",
		genres: ["fantasy", "adventure"],
		hasMovieAdaptation: true,
		pages: 223,
		translations: {
			spanish: "Harry Potter y la piedra filosofal",
			korean: "해리 포터와 마법사의 돌",
			bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
			portuguese: "Harry Potter e a Pedra Filosofal",
		},
		reviews: {
			goodreads: {
				rating: 4.47,
				ratingsCount: 8910059,
				reviewsCount: 140625,
			},
			librarything: {
				rating: 4.29,
				ratingsCount: 120941,
				reviewsCount: 1960,
			},
		},
	},
	{
		id: 5,
		title: "A Game of Thrones",
		publicationDate: "1996-08-01",
		author: "George R. R. Martin",
		genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
		hasMovieAdaptation: true,
		pages: 835,
		translations: {
			korean: "왕좌의 게임",
			polish: "Gra o tron",
			portuguese: "A Guerra dos Tronos",
			spanish: "Juego de tronos",
		},
		reviews: {
			goodreads: {
				rating: 4.44,
				ratingsCount: 2295233,
				reviewsCount: 59058,
			},
			librarything: {
				rating: 4.36,
				ratingsCount: 38358,
				reviewsCount: 1095,
			},
		},
	},
];

function getBooks() {
	return data;
}

function getBook(id) {
	return data.find((d) => d.id === id);
}

const books = getBooks();
const book = getBook(2);

// const { title, genres } = book;
// console.log(title, genres);

// const [primaryGenre, secondaryGenre] = genres;
// console.log(primaryGenre, secondaryGenre);

const [x, y, z, _, gameOfThromes] = getBooks();
// console.log(gameOfThromes);
const { title, genres } = gameOfThromes;
// console.log(genres);
// ⚡ rest operator ins on left side of equal sign and used for destructuring
const [primaryGenre, secondaryGenre, ...otherGenres] = genres;

// ⚡ spread operator ins on righ side of equal sign
// console.log(primaryGenre, secondaryGenre);
// console.log(otherGenres);
// console.log([...otherGenres, "some  gener"]);
// const newGenres = [...otherGenres, "additional genres"];
const newGenres = ["some", ...otherGenres, "additional genres"];
// console.log(newGenres);

const newObject = { ...book.reviews, key: "value" };
// newObject;
// console.log(newObject);

const someObj = { kanda: 1, potata: 2 };

const someObj2 = {
	// de-spread existing object
	...someObj,
	// add new property

	key: "val",
	// overwrite existing property with new value
	kanda: 100,
};
// someObj2;

const someArr = ["one", "two"];

const newArr = [...someArr, "boo"];
// newArr;

// ⚡ Template literals
const template = `some string example ${newArr} all expressions can go here and no statements`;
// template;

// ⚡ Ternery operator
// condition ? result if true : result if false

const dumBool = false;

const ternaryOperator = dumBool ? "is dumBool" : "is not dumBool";
// ternaryOperator;

const arrFun = (someString) => someString + " something is added";

// ⚡ const arrFun2 = (parenthes) => some logic which is an expression and returns a value

const getOddEven = (someNumber) => (someNumber % 2 == 0 ? "Even" : "Odd");
// console.log(arrFun("great"));

console.log(getOddEven(100));

//  ⚡ short circuiting

// AND operator if first value is false it immediately returns the first value
console.log("true" && "great");
console.log("ok" && "");

// OR operator returns first truthy value

// console.log("" || "this");

//⚡ Nullish coalsce operator
// This only considers null or undefined as falsy values

const bookCount = 0;
// console.log(bookCount || "No Data");
// console.log(bookCount ?? "No Data");

// ⚡ Optional Chaining

// check the next qualifier (.) only if exists
// ex : here it check if someObject is not null and if it is evaluated as undefined

console.log(someObj?.kanda);

console.log(someObj?.ba);
console.log(someObj?.ba ?? "This is optional Chaining");

//⚡ adding to array use despread operator
//✅ const newAr = [...oldArr, newObj]

//⚡ To delete use filter method(conditios)
// filter only returns value to new array if the result is  true

// ⚡To update array use map as callback function will be appid to each element
// const booksAfterUpdate = booksAfterDelete.map((book) =>
// 	book.id === 1 ? {..book, pages:1000} : book // here we override the pages parameter hence updating and returning a new array
// );

// fetch function returns promises which has 3 states pending, fullfilled and rejected
