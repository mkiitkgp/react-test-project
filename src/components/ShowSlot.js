import React from "react";


export default function ShowSlot(props){

    function handleSlotClick(e){
        props.clickSlot(e.target.innerText);
        //console.log(e.target.innerText);
    }
    //console.log(props.value);
    return(
        <div>
            { props.value.map(singleArray =>{
                if(singleArray[2]){
                    return <span className="badge bg-success" onClick={handleSlotClick}>{`${singleArray[0]} - ${singleArray[1]}`}</span>
                }
                else{
                    return <span className="badge bg-danger">{`${singleArray[0]} - ${singleArray[1]}`}</span>
                }
                
                //
            })}
        </div>
        
    );
}