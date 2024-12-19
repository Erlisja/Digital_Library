import { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState(""); // state to store the input value of the search bar

  const handleChange = (e) => {
    // function to handle the change event of the input field
    setInput(e.target.value); // set the input value to the state
  };

  const handleSubmit = (e) => {
    // function to handle the submit event of the form
    e.preventDefault(); // prevent the default behavior of the form submission
    if (input) {
      // check if the input value is not empty}
      onSearch(input); // call the onSearch function passed as a prop from the parent component with the input value as an argument
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search for books..."
        />

        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
