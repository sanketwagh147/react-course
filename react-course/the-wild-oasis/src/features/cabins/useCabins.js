import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export default function useCabins() {
	// /React  query
	const {
		isLoading,
		data: cabins,
		errors,
	} = useQuery({
		// ! must be array
		queryKey: ["cabins"],
		// must return a promise
		queryFn: getCabins,
	});

	return { isLoading, errors, cabins };
}
