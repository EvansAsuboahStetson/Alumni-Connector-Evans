import { useState, useEffect } from "react";

import { getMatches } from "../../functions/users";
import { Input } from "antd";
import User from "../../components/User/User";

const { Search } = Input;

const SearchBar = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [setError] = useState("");
  const [input, setInput] = useState(null)
  const [datInput,setDatInput] = useState("")

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
                {console.log("value",value)}
                <User user={value}/>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}
export default SearchBar;