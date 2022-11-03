import { useState, useEffect } from "react";

import { getMatches } from "../../functions/users";
import { Input } from "antd";

import "./SearchDisplay.css"
import SearchDisplay from "./SearchDisplay";

const { Search } = Input;

const SearchBar = (props) => {
  const [data, setData] = useState([]);

  const [setError] = useState("");
  const [input, setInput] = useState(null)
  const [datInput,setDatInput] = useState("")
  const {filteredData,setFilteredData } = props;

  console.log(props,"Here")



  useEffect( () => {
    const token = localStorage.getItem("token");

    const fetcMatches = async()=>{
      try {
        const datum = {
          major: input
        };
        const {data} = await getMatches(token,datum);

        setData(data);
        setFilteredData(data);
      } catch (err) {
        console.log(err);
        setError(err);
      };
    }
    fetcMatches()

  },[input]);
  
  const handleFilter = (e) => {

    const searchInput = e.target.value;
    setInput(searchInput);
    const newFilter = data?.filter((value) => {
      return value?.first_name?.toLowerCase().includes(searchInput.toLowerCase());
    });
    if (searchInput === "") {
      setFilteredData([]);
      setInput(null)
    } else {
      setFilteredData(newFilter);
    }
  };
  return (
    <div>


    <div className="search">
      <div className="searchInputs">
        <Search
          placeholder="Search for majors..."
          value={input}
          onChange={(e) => handleFilter(e)}
          enterButton
        />
      </div>
    

    </div>
    
      </div>
  )
}
export default SearchBar;