import { useState, useEffect, useRef } from "react";

import { getMatches } from "../../functions/users";
import { Input } from "antd";
import "./SearchDisplay.css";

// Search Display
import User from "../../components/User/User";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory, withRouter } from "react-router-dom";
// end

const { Search } = Input;

const SearchBar = (props) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState(null);
  const { setError } = props;

  const history = useHistory();
  const searchRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchMatches = async () => {
      try {
        const datum = {
          name: input,
        };
        const { data } = await getMatches(token, datum);

        setData(data);
        setFilteredData(data);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };

    fetchMatches();
  }, [input, setError]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredData([]);
        setInput(null);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleFilter = (e) => {
    const searchInput = e.target.value;
    setInput(searchInput);
    const newFilter = data?.filter((value) => {
      return value?.first_name
        ?.toLowerCase()
        .includes(searchInput.toLowerCase());
    });
    if (searchInput === "") {
      setFilteredData([]);
      setInput(null);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleOnclick = (user) => {
    history.push({
      pathname: "/user/userView",
      state: user,
    });
    setFilteredData([]);
    console.log("sending user", user);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const seeAllData = filteredData?.length > 7;

  return (
    <div ref={searchRef}>
      <div className="search">
        <div className="searchInputs">
          <Search
            placeholder="Search for name..."
            value={input}
            onChange={handleFilter}
            enterButton
          />
        </div>

        {/* Start Searchdisplay */}
        <div className="forms">
          {filteredData?.length != 0 ? (
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
                        {capitalizeFirstLetter(value.major)}
                      </div>
                      <Badge bg="primary" pill className="ms-1 ms">
                        {capitalizeFirstLetter(value.role)}
                      </Badge>
                    </ListGroup.Item>
                  </div>
                );
              })}
            </ListGroup>
          ) : (
            input &&
            filteredData.length === 0 && (
              <div className="dataItem">
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  No user found
                </ListGroup.Item>
              </div>
            )
          )}
          {seeAllData == true && (
            <div className="seeAll">
              <div
                className="badge bg-primary text-wrap"
                style={{ width: "6rem" }}
              >
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
  );
};

export default SearchBar;
