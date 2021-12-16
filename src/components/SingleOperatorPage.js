import React, { useState } from 'react';
import axios from 'axios';
import ShowSlot from './ShowSlot';

let slotDetailsURL = "http://localhost:5000/v1/openslot";

let slotStructure = [['00:00','01:00',true] ,['01:00' ,'02:00' , true ], ['02:00','03:00' , true], ['03:00' , '04:00' , true] ,
    ['04:00','05:00' , true] ,['05:00','06:00' , true] ,['06:00','07:00' , true],['07:00','08:00',true], ['08:00','09:00',true], 
['09:00','10:00',true], ['10:00','11:00',true] ,['11:00','12:00',true] ,['12:00','13:00' , true] ,['13:00','14:00',true] ,['14:00','15:00' , true] ,
['15:00','16:00' , true] ,['16:00','17:00',true] ,['17:00','18:00' , true],['18:00','19:00',true] ,['19:00','20:00' , true] ,
['20:00' , '21:00' , true] ,['21:00' , '22:00' , true],['22:00','23:00' , true] ,['23:00','24:00' , true]]

async function getSlotDetails(operatorID , date ){
    console.log(`Fetching slot data`);
    const bodyObj = {'operator_id' : operatorID , 'date' : date};
    try{
        let returnData = await axios.post(slotDetailsURL , bodyObj);
        console.log(returnData);
        return returnData.data;
    }
    catch(error){
        console.log(error);
    }
}

function changeSlotStructure(slotObj){
    let emptyArray = [];
    slotObj.map( slot => {
        const { start_time , end_time } = slot;
        let array_temp = [start_time , end_time , false];
        emptyArray.push(array_temp);
        return slot;
        
    })
    console.log(`Booked slot array`);
    console.log(emptyArray);
    
    const tempArraySlots = [...slotStructure];
    const changedStructure = tempArraySlots.map( slot => {
        let tempArray = slot ;
        
        for(let i = 0; i < emptyArray.length ; i++){

            if(slot[0] === emptyArray[i][0] && slot[1] === emptyArray[i][1])
                {
                    tempArray = [slot[0] , slot[1] , false];
                }
            
        }
        
        return tempArray;
    })

    console.log(changedStructure);
    return changedStructure;
}

export default function SingleOperatorPage({operator_id = 1}){

    const [dateObj , setDate ] = useState('2021-12-15');
    const [showSlot , setShowSlot] = useState(false);   
    const [slotStructureWhole , setSlotStructure] = useState([]);
    const [clickSlotdetails , setClickSlot ] = useState("");
    function handleDateChange(e){
        //2021-12-16 YYYY-MM-DD
        console.log(e.target.value);
        setDate(e.target.value);
        //checkSlot();
    }

    function checkSlot(){
        setSlotStructure([]);
        getSlotDetails(operator_id , dateObj ).then( r =>{
            console.log(r.booked_slot);
            setSlotStructure( changeSlotStructure(r.booked_slot));
            setShowSlot(true);
        })
    }

    function getClickSlot(clickText){
        console.log(clickText);
        setClickSlot(clickText);
    }

    return (
        

        <div className="m-4">
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Select Date to check slot :</label>
                    <div className="col-sm-6">
                        <input type="date" className="form-control" value={dateObj} onChange={ handleDateChange}/>
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-primary" onClick={checkSlot}>Check Slot</button>
                    </div>
                </div>
                <div className="row mb-3">
                    {showSlot ?  <ShowSlot value={slotStructureWhole} clickSlot={getClickSlot} /> : null }
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label" style={{margin:'10px'}}>Selected Slots is : </label>
                    <div className="col-sm-2"><span className="badge bg-success">{clickSlotdetails}</span></div>
                    
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Select mp3 file : </label>
                    <div className="col-sm-6">
                        <input type="file" className="form-control" id="inputGroupFile02" /> 
                    </div>
                    
                </div>  
            <button type="submit" className="btn btn-primary">Book Appointment</button> 
    
        </div>
        
    );
}