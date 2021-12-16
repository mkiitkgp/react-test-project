import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SingleBlockOperator from './SingleBlockOperator';
import SingleOperatorPage from './SingleOperatorPage';
import { Outlet } from 'react-router-dom';

let operator_list_URL = 'http://localhost:5000/v1/operators';

async function getOperatorData(){
    console.log(`Fetching data`);
    
    try{
        let returnData = await axios.get(operator_list_URL);
        console.log(returnData);
        return returnData.data;
    }
    catch(error){
        console.log(error);
    }
}
export default function OperatorList ({name}) {

    const [operatorData , setOperatorData] = useState([]);
    
    useEffect(()=>{
        getOperatorData().then( res =>{
            console.log(res);
            setOperatorData(res);
        })
    },[]);

    function handleBookingSlot(clickObj){
        console.log(clickObj);
    }

    return (
        <div  style={{margin : '10px' , padding:'10px'}}>
            <h2 style={{marginBottom : '50px'}}>Hello customer {name}</h2>
            <div className="row">
                {operatorData.map(oper =>{
                    return (
                        
                        <SingleBlockOperator  key={oper.id} value={oper} bookSlot={handleBookingSlot}/>
                          
                    );
                })}
            </div>
            <Outlet/>
        </div>
    );
}