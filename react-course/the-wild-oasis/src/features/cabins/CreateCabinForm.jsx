import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
	const { register, handleSubmit, reset, getValues, formState } = useForm();
	const QueryClient = useQueryClient();
	const { errors } = formState;
	console.log(errors);
	const { mutate, isLoading: isCreating } = useMutation({
		// mutationFn: (newCabin) => createCabin(newCabin),
		//Below line is same as above
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success("New Cabin Created successfully.");
			QueryClient.invalidateQueries({ queryKey: ["cabins"] });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	function onSubmit(data) {
		console.log(data);
		mutate({ ...data, image: data.image[0] });
	}

	function onError(errors) {
		console.error(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					{...register("name", { required: "Name is a required field" })}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				{/* Uses use form hook  */}
				<Input
					type="number"
					id="maxCapacity"
					disabled={isCreating}
					{...register("maxCapacity", {
						required: "Max capacity is a required field",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					disabled={isCreating}
					id="regularPrice"
					{...register("regularPrice", {
						required: "Regular price is a required field",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					disabled={isCreating}
					id="discount"
					defaultValue={0}
					{...register("discount", {
						required: "Discount is a required field",
						//Custom validation
						validate: (value) =>
							value <= getValues().regularPrice ||
							"Discount should be less than actual price",
					})}
				/>
			</FormRow>

			<FormRow label="Description" error={errors?.description?.message}>
				<Textarea
					type="text"
					disabled={isCreating}
					id="description"
					defaultValue=""
					{...register("description", {
						required: "Description is a required field",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin Image" error={errors?.image?.message}>
				<FileInput id="image" accept="image/*" {...register("image")} />
			</FormRow>

			<FormRow label="">
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isCreating}>Add cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
