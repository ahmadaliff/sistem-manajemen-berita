const SearchBar = ({ handleSearch, message }) => {
  return (
    <div className="flex flex-col w-full">
      <input
        type="text"
        placeholder="Cari berita..."
        className="w-full p-3 border rounded-md"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <p className="font-semibold text-red-500 text-sm">{message}</p>
    </div>
  );
};
export default SearchBar;
