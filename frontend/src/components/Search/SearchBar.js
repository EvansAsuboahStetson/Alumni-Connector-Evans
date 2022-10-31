import { useState, useEffect } from "react";
import axios from "axios";
import { getUser, updateUse, getMatches } from "../../functions/users";
import { Input } from "antd";

const { Search } = Input;
const SearchBar = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState("");
  const [input, setInput] = useState("");

  useEffect(async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await getMatches(token);
      console.log("I am the response",response)
      setData(response.data);
      setFilteredData(response.data);
    } catch (err) {
      console.log(err);
      setError(err);
    };
  }, []);
  const handleFilter = (e) => {
    console.log(e);
    const searchInput = e.target.value;
    setInput(searchInput);
    const newFilter = data.filter((value) => {
      return value.first_name.toLowerCase().includes(searchInput.toLowerCase());
    });
    if (searchInput === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  return (
    <div className="search">
      <div className="searchInputs">
        <Search
          placeholder="Search for majors..."
          value={input}
          onChange={(e) => handleFilter(e)}
          enterButton
        />
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 10).map((value, index) => {
            return (
              <div className="dataItem" key={value.id}>
                <p>{value.first_name} {value.last_name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}
export default SearchBar