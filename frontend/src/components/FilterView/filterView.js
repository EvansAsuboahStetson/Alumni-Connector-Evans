import React, { useEffect, useState } from 'react'
import "../ViewUser/ViewUser"


import { Row, Col, Button } from "react-bootstrap";
import User from '../User/User';
import "./filterView.css"
import Connect from '../Connect/Connect';

function FilterView(props) {
    const user = props?.history?.location?.state
    const [userFull, setUserFull] = useState(false)


    const addContact = (name) => {
        alert(`You sent a follower request to ${name}`);
      }

    useEffect(() => {
        if (user.length > 0) {
            setUserFull(true)
        }
        

    }, [])


    return (
        <div className='filterView'>
            {userFull ? <Row xs={1} md={2} lg={3} className="g-5">
                
                {user?.map((use) => (
                    <Col key={use._id} >

                        <User
                            user={use}

                        />
                       <Connect name={use.name} id={use._id} />
                        <Button onClick={() => addContact(use._id)} variant="primary">Add to Contact</Button>
                    </Col>
                ))}
                
            </Row> : <h1>
                
                No User matches description
                </h1>}


        </div>
    )
}

export default FilterView