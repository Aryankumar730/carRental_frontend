import React from 'react';
import dataContext from './states/DataContext';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DataTable() {

    const context = useContext(dataContext);
    const navigate = useNavigate();
    const {  } = context;

    
    // useEffect(() => {
    //     if(localStorage.getItem('token')){
            
    //         getPrice();
    //         console.log(prices);
           
    //     }
    //     else{
    //         navigate('/login')
    //         showAlert(`Please login-in or Sign-up to view watchlist`, 'warning','Sorry')
    //     }
    // },[])

    // 1. we have the auth-token of the agency, so we will fetch the details of agency using auth-token.
    // 2. we take the email and save it.
    // 3. we send email to our booked database to get all the entries with same aagency email.


    const host = 'https://car-rental.adaptable.app';
   

    const [email, setEmail] = useState(null);
    const notesinital = [];
    const [notes, setNotes] = useState(notesinital);



    async function fetchcurrAemail(){
  
        //Making the API call to have the email of the agency.
    
        const response = await fetch(`${host}/api/authagency/getuser`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token'),
          },
          
        });
        const json = await response.json();
        setEmail(json.email);
                             
      }


      async function fetchallEntries(){
  
        //Making the API call to fetch all the entries with that email in the database.
    
        const response = await fetch(`${host}/api/authbookedcar/fetch/${email}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
        },          
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
                             
      }

    useEffect(() => {
               
        fetchcurrAemail();
                
    }, [ ])


    useEffect(() => {

        if(email != null){

            fetchallEntries();

        }
                               
    }, [email])



   
        
    

  return (
    <>
            
            <div className="container" style={{ maxWidth: "85%", display: "block", margin: "auto", paddingTop: "5rem" }}>
                <table className="table table-primary table-hover ">
                    <thead>
                        <tr>

                            <th style={{ scope: "col" }}>Customer Name</th>
                            <th style={{ scope: "col" }}>Customer Email</th>
                            <th style={{ scope: "col" }}>Vehicle Model</th>
                            <th style={{ scope: "col" }}>Vehicle Number</th>
                            <th style={{ scope: "col" }}>Date</th>
                            <th style={{ scope: "col" }}>Rent ( per/day )</th>
                        </tr>
                    </thead>
                    <tbody>

                        {notes?.map((element) => (

                            <tr key={element._id}>

                                <td style={{ padding: "15px" }}>{element.Cname} </td>
                                <td style={{ padding: "15px" }}>{element.Cemail} </td>
                                <td style={{ padding: "15px" }}>{element.Vmodel}</td>
                                <td style={{ padding: "15px" }}>{element.Vnumber}</td>
                                <td style={{ padding: "15px" }}>{(element.date).split('T')[0]}</td>
                                <td style={{ padding: "15px" }}>{element.Rent}</td>

                                
                                
                            </tr>

                        ))}
                    </tbody>
                </table>

            </div>
        </>
  )
}
