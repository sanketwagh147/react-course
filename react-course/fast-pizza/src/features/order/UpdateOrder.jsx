/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
// eslint-disable-next-line no-unused-vars
import { updateOrder } from "../../services/apiRestaurant";
export default function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    // Will submit form and revalitate
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>;
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  console.log("update");
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
