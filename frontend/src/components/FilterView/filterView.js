import React from 'react'
import "../ViewUser/ViewUser"


import { Row, Col } from "react-bootstrap";
import User from '../User/User';

function FilterView(props) {
    const user = props?.history?.location?.state

    console.log(user)
    return (
        <Row xs={1} md={3} className="g-5">
        {user?.map((use) => (
          <Col key={use._id}>
            <User
              user={use}

            />
          </Col>
        ))}
      </Row>
    )
}

export default FilterView