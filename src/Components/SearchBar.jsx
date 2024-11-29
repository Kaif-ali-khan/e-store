import { useDispatch } from "react-redux";
import { setSearchQuery } from "../features/Actions/productsSlice";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const input = e.target.value;
    dispatch(setSearchQuery(input));
  };

  return (
    <form className="w-96 max-w-md mx-auto">
      <input
        type="search"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-lg bg-gray-50"
        placeholder="Search..."
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SearchBar;
