import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export default function useUpdateSetting() {
	const queryClient = useQueryClient();

	const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
		// mutationFn: (newCabin) => createCabin(newCabin),
		//Below line is same as above
		mutationFn: updateSettingApi,
		onSuccess: () => {
			toast.success("Settings updated");
			queryClient.invalidateQueries({ queryKey: ["setting"] });
			// reset();
		},
		onError: (err) => toast.error(err.message),
	});
	return { isUpdating, updateSetting };
}
