import React from 'react';

export default function MyModal({message}){

    return(
        <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Well done!</h4>
            <p>{message}</p>
            
        </div>
    )
}