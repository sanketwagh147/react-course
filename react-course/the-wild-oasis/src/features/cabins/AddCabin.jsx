import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

// export default function AddCabin() {
// 	const [isOpenModal, setIsOpenModal] = useState(false);
// 	return (
// 		<div>
// 			<Button onClick={() => setIsOpenModal((show) => !show)}>
// 				Add new cabin
// 			</Button>
// 			{isOpenModal && (
// 				<Modal onClose={() => setIsOpenModal(false)}>
// 					<CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
// 				</Modal>
// 			)}
// 		</div>
// 	);
// }

export default function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens="cabin-form">
					<Button>Add new cabin</Button>
				</Modal.Open>
				<Modal.Window opensWindowName="cabin-form">
					<CreateCabinForm />
				</Modal.Window>

				{/* <Modal.Open opens="table">
				<Button>Show table</Button>
				</Modal.Open>
				<Modal.Window opensWindowName="table">
				<CabinTable />
			</Modal.Window> */}
			</Modal>
		</div>
	);
}
