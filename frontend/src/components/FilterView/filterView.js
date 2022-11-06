import React, { useEffect, useState } from 'react'
import "../ViewUser/ViewUser"


import { Row, Col } from "react-bootstrap";
import User from '../User/User';

function FilterView(props) {
    const user = props?.history?.location?.state
    const [userFull, setUserFull] = useState(false)

    useEffect(() => {
        if (user.length > 0) {
            setUserFull(true)
        }


    }, [])

    console.log(user, "users.ksk")
    return (
        <div>
            {userFull ? <Row xs={3} md={3} className="g-5">
                {user?.map((use) => (
                    <Col key={use._id} >
                        <User
                            user={use}

                        />
                    </Col>
                ))}
            </Row> : <h1>
                
                No User matches description
                </h1>}


        </div>
    )
}

export default FilterView