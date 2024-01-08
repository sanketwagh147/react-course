import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

export default function Header() {
  return (
    <header className="bg-yellow-500 uppercase">
      <Link to="/" className="tracking-widest">
        Fast Pizza Co.{" "}
      </Link>
      <SearchOrder />
      <p>Sanket</p>
    </header>
  );
}
