import React, { useEffect, useState } from "react";
import "./SearchDisplay.css";
import User from "../../components/User/User";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory, withRouter } from "react-router-dom";

function SearchDisplay(props) {
  const { filteredData, setFilteredData } = props;

  let history = useHistory();

  const [seeAllData, setSeeAllData] = useState(false);
  const handleOnclick = (user) => {
    console.log("This is user", user);
    history.push({
      pathname: "/user/userView",
      state: user
    });
    setFilteredData([])
  };

  useEffect(() => {
    if (filteredData?.length > 7) {
      console.log("Yo you are in");
      setSeeAllData(true);
    } else {
      setSeeAllData(false);
    }
  }, [filteredData]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="forms">
      {filteredData?.length != 0 && (
        <ListGroup className="dataResult">
          {filteredData?.slice(0, 6).map((value, index) => {
            return (
              <div className="dataItem" key={value.id}>
                {console.log("value", value)}
                
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
  );
}

export default SearchDisplay;
