import supabase from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Failed to load cabins from table");
	}
	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);
	if (error) {
		console.error(error);
		throw new Error("Failed deleting the cabin");
	}
	return data;
}
