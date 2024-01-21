import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
	const QueryClient = useQueryClient();
	// console.log(errors);
	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		// mutationFn: (newCabin) => createCabin(newCabin),
		//Below line is same as above
		mutationFn: createEditCabin,
		onSuccess: () => {
			toast.success("New Cabin Created successfully.");
			QueryClient.invalidateQueries({ queryKey: ["cabins"] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createCabin };
}
