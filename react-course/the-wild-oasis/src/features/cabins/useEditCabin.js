import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
	const queryClient = useQueryClient();

	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		// mutationFn: (newCabin) => createCabin(newCabin),
		//Below line is same as above
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin edited successfully.");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			// reset();
		},
		onError: (err) => toast.error(err.message),
	});
	return { isEditing, editCabin };
}
