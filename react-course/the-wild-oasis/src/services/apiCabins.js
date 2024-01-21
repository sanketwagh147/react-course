import toast from "react-hot-toast";
import { supabase, supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins failed to load");
	}
	return data;
}

export async function createCabin(newCabin) {
	const imageName = `${Math.random()}=${newCabin.image.name}`.replaceAll(
		"/",
		""
	);
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// Create a cabin
	const obj = { ...newCabin, image: imagePath };
	const { data, error } = await supabase.from("cabins").insert([obj]).select();
	if (error) {
		console.error(error);
		throw new Error("Inserting Cabin failed");
	}
	//Upload image
	const { error: storageError } = await supabase.storage
		.from("cabin-images") // bucket name
		.upload(imageName, newCabin.image, {
			cacheControl: "3600",
			upsert: false,
		});

	// Delete Cabin if image upload failed
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", newCabin.id);
		console.error(error);
		throw new Error("Cabin image failed and thus cabin was not created");
	}
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);
	if (error) {
		console.error(error);
		throw new Error("");
	}
	return data;
}
