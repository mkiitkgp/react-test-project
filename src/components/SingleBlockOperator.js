import React from 'react';
import { Link } from 'react-router-dom';

export default function SingleBlockOperator({value , bookSlot}){

    return (
        <div className="col-sm-3">
            <div className="card">
            <div className="card-body">
                <h5 className="card-title">{value.name}</h5>
                <p className="card-text">We Deliver services in {value.location}.</p>
                <Link to={`/operators/${value.id}`}>
                    <button onClick={()=>{bookSlot(value)}} className="btn btn-primary">Book Appointment</button>
                </Link>
            </div>
            </div>
        </div>
    );
}