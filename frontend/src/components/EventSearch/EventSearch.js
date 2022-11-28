import { useState, useEffect } from "react";
import { getMatches } from "../../functions/users";
import { Input } from "antd";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory} from "react-router-dom";

const { Search } = Input;

const EventSearch = (props) => {
  const [data, setData] = useState([]);

  const [setError] = useState("");
  const [input, setInput] = useState(null)
  const {filteredData,setFilteredData } = props;

  useEffect( () => {
    const token = localStorage.getItem("token");

    const fetchMatches = async()=>{
      try {
        const datum = {
          name: input
        };
        //change getMatches since we arent searching for those matches anymore
        const {data} = await getMatches(token,datum);

        setData(data);
        setFilteredData(data);
      } catch (err) {
        console.log(err);
        setError(err);
      };
    }
    fetchMatches()

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

  let history = useHistory();

  const [seeAllData, setSeeAllData] = useState(false);
  const handleOnclick = (user) => {
    history.push({
      pathname: "/user/userView",
      state: user
    });
    setFilteredData([])
    console.log("sending user", user)
  };

  useEffect(() => {
    if (filteredData?.length > 7) {
      
      setSeeAllData(true);
    } else {
      setSeeAllData(false);
    }
  }, [filteredData]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div>
      <div className="search">
        <div className="searchInputs">
          <Search
            placeholder="Search for Event..."
            value={input}
            onChange={(e) => handleFilter(e)}
            enterButton
          />
        </div>
        
        {/*
        Start Searchdisplay
        */}
        <div className="forms">
      {filteredData?.length != 0 && (
        <ListGroup className="dataResult">
          {filteredData?.slice(0, 6).map((value, index) => {
            return (
              <div className="dataItem" key={value.id}>
            
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                  onClick={() => handleOnclick(value)}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">
                      {capitalizeFirstLetter(value.name)}
                    </div>
                  </div>
                  <Badge bg="primary" pill className="ms-1 ms-auto">
                    {capitalizeFirstLetter(value.role)}
                  </Badge>
                </ListGroup.Item>
              </div>
            );
          })}
        </ListGroup>
      )}
      {seeAllData == true && (
        <div className="seeAll">
          <div className="badge bg-primary text-wrap" style={{ width: "6rem" }}>
            See More
          </div>
        </div>
      )}
    </div>
    {/*
    end
    */}
      </div>
    </div>
  )
}
export default EventSearch;