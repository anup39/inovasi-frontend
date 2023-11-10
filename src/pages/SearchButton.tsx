function SearchButton() {
  return (
    <div>
      <input
        className='relative rounded-2xl py-2 px-4 placeholder:text-black  focus:outline-none curs'
        type='search'
        placeholder='Search'
      ></input>
      <img
        className='absolute right-5 bottom-3 cursor-pointer'
        src='src\assets\SearchIcon.svg'
        alt=''
      />
    </div>
  );
}
export default SearchButton;
