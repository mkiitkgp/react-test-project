import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 
 // toast-configuration method,
 // it is compulsory method.
toast.configure();



let bookingURL = "http://localhost:5000/v1/bookings";
let cancelURL = "http://localhost:5000/v1/cancel"

const getBookingData = async (id , date) =>{
    try{
        let newURL=""
        if(date){
            newURL = `${bookingURL}?id=${id}&date=${date}`;
        }
        else{
            newURL = `${bookingURL}?id=${id}`;
        }
        //let newURL = `${bookingURL}?id=${id}&date=${date}`;
        let req = await axios.get(newURL);
        console.log(req);
        return req.data;
    }
    catch(err){
        console.log(err);
    }
}

const cancelAppointmentRequest = async (appointment_id) =>{
    try{
        let cancelWholeURL = `${cancelURL}?appointment_id=${appointment_id}`;
        let req = await axios.delete(cancelWholeURL);
        console.log(req);
        return req.data;
    }
    catch(err){
        console.log(err);
    }
}

function changeDate(date){
    let newDate = new Date(date).toLocaleDateString();
    console.log(newDate);
    return newDate;
}

function changeTime(time){
    let newTime = new Date(time).toLocaleTimeString([],{hour:'2-digit' , minute:'2-digit'});
    console.log(newTime);
    return newTime;
}

export default function CustomerBooking(){

    const [bookingDate , setBookingdata] = useState([]);
    const [tableHeader , setTableHeader] = useState([]);

    useEffect(()=>{
        console.log('Operator Bookings ');
        getBookingData(3).then(res =>{
            console.log(res);
            changeBookingFormat(res);
        })
    },[])

    function cancelAppointment(id){
        console.log(id);
        cancelAppointmentRequest(id).then( r =>{
            console.log(r);
            toast(r.message);
            let filteredArray = bookingDate.filter( b =>{
                if(b['Appointment Id'] !== id){
                    return true;
                }
                
            })
            setBookingdata(filteredArray);
        })
    }

    function changeBookingFormat( obj ){

        let changeTableStructure = [];

        obj.map( w =>{
            changeTableStructure.push({
               'Appointment Id' : w.appointment_id,
               'Date of booking' :  changeDate(w.date_of_booking),
               'Start Time' : changeTime(w.start_time),
               'End Time' : changeTime(w.end_time),
               'Operator Name': w.operator_name,
               'Operator Location': w.operator_location,
               'Audio Comment' : w.audio_file,
               'Cancel Booking': null
            })
        })

        console.log(changeTableStructure);
        changeTableStructure.sort(function(a, b) {
            var nameA = a['Date of booking'] 
            var nameB = b['Date of booking'] 
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
        setBookingdata(changeTableStructure);
        let headerKeys = Object.keys(changeTableStructure[0]);
        setTableHeader(headerKeys);
    }

    return(
        <>
        <h2 style={{marginTop:'50px' , marginBottom:'50px'}}> Customer Booking History</h2>
        <table className="table">
            <tr>
                {tableHeader.map( t => {
                    return(
                        <th>{t}</th>
                    )
                })}
            </tr>
            {
                bookingDate.map( row =>{
                    return(
                        <tr>
                            {tableHeader.map( header => {
                                if(header === 'Audio Comment' && row['Audio Comment'] !== null){
                                    return <td><audio src={row[header]} controls /></td>
                                }
                                else if(header === 'Cancel Booking'){
                                    return <td><button onClick={() => cancelAppointment(row['Appointment Id'])}className="btn btn-outline-danger btn-sm">Cancel</button></td>
                                }
                                else{
                                    return(
                                        <td>{row[header]}</td>
                                    )
                                    }
                            })}
                        </tr>
                    )
                })
            }
        </table>
        
        </>
    )

}