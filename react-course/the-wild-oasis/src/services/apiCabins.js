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

export async function createEditCabin(newCabin, id) {
	console.log(newCabin);

	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
	console.warn("hasImgPath", hasImagePath);

	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		""
	);
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// Create a cabin
	let query = supabase.from("cabins");

	// When adding new cabin
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
	// When Editing
	if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error("Inserting Cabin failed");
	}
	//Upload image

	if (hasImagePath) return data;
	const { error: storageError } = await supabase.storage
		.from("cabin-images") // bucket name
		.upload(imageName, newCabin.image, {
			cacheControl: "3600",
			upsert: false,
		});

	// Delete Cabin if image upload failed
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
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
