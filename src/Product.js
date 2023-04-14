import React, { useEffect } from 'react'
import './css/Product.css';
import { useState } from 'react';
// import Avatar from './img/book.jpg';
import dataContext from './states/DataContext';
import { useContext } from 'react';
import { Update } from '@mui/icons-material';


const Avatar = "https://stimg.cardekho.com/images/carexteriorimages/630x420/Audi/A4/9321/1670914111785/front-left-side-47.jpg";

export default function Product(props) {

  const context = useContext(dataContext);
  const { showAlert , profile} = context;

  const [carId, setcarId] = useState(null);
  
  const[Cname, setCname] = useState(null);
  const[Vmodel, setVmodel] = useState(null);
  const[Vnumber, setVnumber] = useState(null);
  const[Rent, setRent] = useState(null);
  const[Aemail, setAemail] = useState(null);
  const[Cemail, setCemail] = useState(null);

  const[book, setBook] = useState(false);

  const[Vnum, setVnum] = useState("");

  const host = 'https://car-rental.adaptable.app';
  
  

  async function fetchcurrdata(carId){
  
    //Making the API call to have the data of the car and agency(email)

    const response = await fetch(`${host}/api/authdata/fetchIddata/${carId}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token') // token of the user
      },
      

    });
    const json = await response.json();
    console.log(json);

    setVmodel(json.Vmodel);
    setVnumber(json.Vnumber);
    setRent(json.Rent);
    setAemail(json.Aemail);
           
  }

  async function fetchcurrUser(){
  
    //Making the API call to have data of the user i.e name, email

    const response = await fetch(`${host}/api/authuser/getuser`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token'), // token of the user
      },
      
    });
    const json = await response.json();
    
    setCname(json.name);
    setCemail(json.email);
   
   
  }

  async function pushRentedCar(Cname, Vmodel, Vnumber, Rent, Aemail, Cemail){
  
    //Making the API call to have data of the user i.e name, email

    const response = await fetch(`${host}/api/authbookedcar/adddata`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
       
      },

      body: JSON.stringify({Cname, Vmodel, Vnumber, Rent, Aemail, Cemail})
      
    });
    
    const json = await response.json();
    if(json.success){
             
      showAlert("Car booked successfully",'success', 'Congrates');
      setBook(true);
    }
    if(json.error1){
      showAlert("Car is already booked by someone",'danger', 'Sorry');
    }
    console.log("adding into the rented book database");
    console.log(json);
       
   
  }

  async function Checkstatus(Vnum){
  
    //Making the API call to have the data of the car and agency(email)

    let Vnumber = props.Vnumber;

    const response = await fetch(`${host}/api/authbookedcar/check`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({Vnum})
      
    });
    const json = await response.json();
    console.log(json);

    
           
  }

  useEffect(() => {

    // if(props.Vnumber != null){

    //   setVnum(props.Vnumber);

    //   console.log(Vnum);

    //     Checkstatus(Vnum);

    // }
    

    if(localStorage.getItem('token') && !profile){

      fetchcurrUser();

    }
    
  }, [ ])
  

  useEffect(() => {
    
    if(carId != null && localStorage.getItem('token')){
      
      fetchcurrdata(carId);
      
            
    }
          
  }, [carId])


  useEffect(() => {

    if(Vnumber != null){

      console.log(Aemail); // checking that Aemail should be valid because we have a check in backend for Aemail

      pushRentedCar(Cname, Vmodel, Vnumber, Rent, Aemail, Cemail);

    }        
    
  }, [Vnumber])

  function handleClick(e){

    e.preventDefault();

    if(localStorage.getItem('token') && !profile){

      setcarId(props._id);  //setting the car ID with the specific ID of element

    }
    else{
      if(profile){
        showAlert(`Agencies cannot rent the car`, 'warning','Sorry')
      }
      else{
        showAlert(`Please login-In or Sign-up to rent car`, 'warning','Sorry') 
      }
    }     
  }
 
  return (

    <div className="product" >
      <div className="product_info">
        <p id='desp'>{props.Vmodel} | Rent ( per/day ) - {props.Rent}

        
        
        
        </p>
        <p className="product_price">
          Seats : {props.Scapacity} / airbags equipped

        </p>
        <p className="product_price">
          Vehicle No. - {props.Vnumber}

        </p>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <span className="product_price">{props.city}, {props.country}</span>
      
        <span className="product_price"><strong>{props.status}</strong></span>

        </div>
        <img src={props.link || Avatar} alt="book not showing" />

        <div className="button_info">

          <button onClick={handleClick} style={{marginTop:"10px",fontWeight:"500"}}> Rent Car</button>
        </div>
      </div>
    </div>

  )
}
