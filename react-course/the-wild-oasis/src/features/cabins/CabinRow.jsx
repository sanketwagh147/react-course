/* eslint-disable react/prop-types */
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
	const {
		id: cabinId,
		name,
		maxCapacity,
		regularPrice,
		discount,
		image,
	} = cabin;

	// 📌 Hook that gets the query client from App.jsx to invalidate the cache
	const queryClient = useQueryClient();

	//uses react query to mutate data
	// mutate is cb fn which we can connect t
	const { isLoading: isDeleting, mutate } = useMutation({
		// Below both function does the same thing
		// mutationFn: (id) => deleteCabin(id),
		mutationFn: deleteCabin,
		// Onsuccess invalidate the cache so the data is fetched again
		onSuccess: () => {
			alert(`Cabin : ${name} is deleted`);
			queryClient.invalidateQueries({
				// Same query key when set using useQuery( react-query)
				queryKey: ["cabins"],
			});
		},
		// on Error Handler
		onError: (err) => alert(err.message),
	});
	return (
		<TableRow role="row">
			<Img src={image} />
			<Cabin>{name}</Cabin>
			<div>Fits up to {maxCapacity}</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			<Discount>{formatCurrency(discount)}</Discount>
			<button onClick={() => mutate(cabinId)} disabled={isDeleting}>
				Delete
			</button>
		</TableRow>
	);
}
