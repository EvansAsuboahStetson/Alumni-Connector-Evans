import React from 'react'
import "./SearchDisplay.css"
import User from "../../components/User/User";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

function SearchDisplay(props) {
    const {filteredData,setFilteredData } = props;


    
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="forms">
              {filteredData?.length != 0 && (
        
        <ListGroup className="dataResult" >
           
          {filteredData?.slice(0, 10).map((value, index) => {
            return (
              
              <div className="dataItem" key={value.id}>
                {console.log("value",value)}
                <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{capitalizeFirstLetter(value.name)}</div>
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
    </div>
  )
}

export default SearchDisplay