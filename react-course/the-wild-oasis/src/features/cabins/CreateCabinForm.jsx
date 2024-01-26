/* eslint-disable react/prop-types */
import styled from "styled-components";

import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { isCreating, createCabin } = useCreateCabin();
	const { isEditing, editCabin } = useEditCabin();
	const isWorking = isCreating || isEditing;

	const { id: editId, ...editValues } = cabinToEdit;
	const isEditingMode = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		// only set the form to default values if editing
		defaultValues: isEditingMode ? editValues : {},
	});
	const { errors } = formState;

	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];
		if (isEditingMode) {
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: (data) => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			// add reset function  which is second param

			createCabin(
				{ ...data, image: data.image[0] },
				{
					onSuccess: (data) => {
						reset();
						onCloseModal?.();
					},
				}
			);
		}
	}

	function onError(errors) {
		console.error(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}
		>
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
				<Button
					variation="secondary"
					type="reset"
					//Optional chaining if the func is undefined don't call it
					onClick={() => onCloseModal?.()}
				>
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
