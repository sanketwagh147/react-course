/* eslint-disable react/prop-types */
import styled from "styled-components";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

function CreateCabinForm({ cabinToEdit = {} }) {
	const { id: editId, ...editValues } = cabinToEdit;

	const isEditingMode = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		// only set the form to default values if editing
		defaultValues: isEditingMode ? editValues : {},
	});
	const QueryClient = useQueryClient();
	const { errors } = formState;
	// console.log(errors);
	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		// mutationFn: (newCabin) => createCabin(newCabin),
		//Below line is same as above
		mutationFn: createEditCabin,
		onSuccess: () => {
			toast.success("New Cabin Created successfully.");
			QueryClient.invalidateQueries({ queryKey: ["cabins"] });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		// mutationFn: (newCabin) => createCabin(newCabin),
		//Below line is same as above
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin edited successfully.");
			QueryClient.invalidateQueries({ queryKey: ["cabins"] });
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	const isWorking = isCreating || isEditing;

	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];
		if (isEditingMode) {
			editCabin({ newCabinData: { ...data, image }, id: editId });
		} else {
			createCabin({ ...data, image: data.image[0] });
		}
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
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
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
					disabled={isWorking}
					id="description"
					defaultValue=""
					{...register("description", {
						required: "Description is a required field",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin Image" error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditingMode ? false : "Cabin rooms are required",
					})}
				/>
			</FormRow>

			<FormRow label="">
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditingMode ? "Update cabin" : "Create new cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
