import { useMutation, useQueryClient } from "@tanstack/react-query";

import React from "react";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export default function useDeleteCabin() {
	// 📌 Hook that gets the query client from App.jsx to invalidate the cache
	const queryClient = useQueryClient();

	//uses react query to mutate data
	// mutate is cb fn which we can connect t
	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		// Below both function does the same thing
		// mutationFn: (id) => deleteCabin(id),
		mutationFn: deleteCabinApi,
		// Onsuccess invalidate the cache so the data is fetched again
		onSuccess: () => {
			toast.success(`Cabin : ${name} is deleted`);
			queryClient.invalidateQueries({
				// Same query key when set using useQuery( react-query)
				queryKey: ["cabins"],
			});
		},
		// on Error Handler
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteCabin };
}
