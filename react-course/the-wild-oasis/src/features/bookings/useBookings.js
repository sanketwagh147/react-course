import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export default function useBookings() {
	// /React  query
	const {
		isLoading,
		data: bookings,
		errors,
	} = useQuery({
		// ! must be array
		queryKey: ["bookings"],
		// must return a promise
		queryFn: getBookings,
	});

	return { isLoading, errors, bookings };
}
