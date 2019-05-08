import React, { useState, useEffect } from 'react'

const Request = (props) => {
    return (
        <div className="member-wrapper" key={props.request._id}>
            <div className="member">
                <div className="photo-wrapper">
                    <div className="photo"><img src="startup/common-files/img/crew/sergey-s.png" alt="" /></div>
                </div>
                <div className="info">
                    <div className="name">{props.request.city} - {props.request.area}</div>
                    <div>Roommates Needed: {props.request.numberOfRoommates}</div>
                    <div>Rent: Rs {props.request.rent}</div>
                    <button>Email</button>
                    <button>Call</button>
                </div>
            </div>
        </div>
    )
}
const Requests = () => {

    var [requests, setRequests] = useState([])

    const getAllRequests = () => {
        fetch('/api/roommaterequests')
            .then(response => response.json())
            .then((requests) => {
                setRequests(requests);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getAllRequests();
    })

    return (
        <section className="header-3-sub">
            <div className="background">&nbsp;</div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h3>All Requests</h3>
                        <div className="list-group">
                            {
                                requests.map((request) => {
                                    return <Request key={request._id} request={request} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Requests;