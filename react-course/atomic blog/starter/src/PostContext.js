import React, { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";

const PostContext = createContext();

function createRandomPost() {
	return {
		title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
		body: faker.hacker.phrase(),
	};
}

// Provider which has all the state
function PostProvider({ children }) {
	const [posts, setPosts] = useState(() =>
		Array.from({ length: 30 }, () => createRandomPost())
	);
	const [searchQuery, setSearchQuery] = useState("");

	// Derived state. These are the posts that will actually be displayed
	const searchedPosts =
		searchQuery.length > 0
			? posts.filter((post) =>
					`${post.title} ${post.body}`
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
			  )
			: posts;

	function handleAddPost(post) {
		setPosts((posts) => [post, ...posts]);
	}

	function handleClearPosts() {
		setPosts([]);
	}

	return (
		<PostContext.Provider
			value={{
				posts: searchedPosts,
				onClearPosts: handleClearPosts,
				onAddPost: handleAddPost,
				searchQuery,
				setSearchQuery,
			}}
		>
			{children}
		</PostContext.Provider>
	);
}

// Custom hook for context

function usePosts() {
	const context = useContext(PostContext);
	// To avoid bugs add this
	if (context === undefined)
		throw new Error("usPosts Context was accessed from outside of the context");
	return context;
}

export { usePosts, PostProvider };
