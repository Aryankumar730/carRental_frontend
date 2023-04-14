import React from 'react';
import { useState } from 'react';
import Alert from './Alert';
import dataContext from './states/DataContext';
import { useContext, useEffect } from 'react';
import './css/Dataform1.css';

export default function Dataform() {

    const context = useContext(dataContext);
    const { showAlert , addNote} = context;

    const [note, setNote] = useState({ Aname: "", Vmodel: "", Vnumber: "", 
    Scapacity: "", Rent: "", city: "", country: "", image:""}) 

    const[Aemail, setAemail] = useState(null);
    
    const host = 'https://car-rental.adaptable.app';

      async function gettingtheEmail(){
  
        //Making the API call to have email of the loggedin agency 
    
        const response = await fetch(`${host}/api/authagency/getuser`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token'),
          },
          
        });
        const json = await response.json();
        setAemail(json.email);
      
      }

      useEffect(() => {

        gettingtheEmail();
              
        
      }, [])

    async function handleSubmit(e) {

        e.preventDefault();
       
        
        // if (note.Aname.length == 0 || note.Vmodel.length == 0 || note.Vnumber.length == 0 || note.Scapacity.length == 0 || note.Rent.length == 0 || note.city.length == 0 || note.country.length == 0) {
            
        //     // showAlert("Enter values in the required fields", 'warning', 'Sorry')
        // }
        // else {

        
        addNote(note.Aname, note.Vmodel, note.Vnumber, note.Scapacity,
             note.Rent, note.city, note.country, note.image, Aemail)

        

            
            // showAlert("Data has been added successfully", 'success', 'Great')
            
            setNote({ Aname: "", Vmodel: "", Vnumber: "", Scapacity: "",
             Rent: "", city: "", country: "", image: ""})
          
        // }
    }
    
    function onChange(e) {

        setNote({ ...note, [e.target.name]: e.target.value })
    }


    
   

    return (

        <div className="container-fluid px-1 py-5 dataform">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-7 col-lg-8 col-md-9 col-11 ">

                    <div className="card">
                        <h5 className="text-center mb-4">Enter the car details</h5>

                        <form className="form-card" onSubmit={handleSubmit}>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6 flex-column d-flex">
                                    <label className="form-control-label px-1">Agency Name<span className="text-danger"> *</span></label> 
                                    <input type="text" id="Aname" name="Aname" placeholder="Enter your Agency name" onChange={onChange} value={note.Aname}/> 
                                </div>
                               
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-1">Vehicle Model<span className="text-danger"> *</span></label> 
                                <input type="text" id="Vmodel" name="Vmodel" placeholder="Enter Vehicle model"  onChange={onChange} value={note.Vmodel}/>
                                 </div>
                                <div className="form-group col-sm-6 flex-column d-flex"> 
                                <label className="form-control-label px-1">Vehicle number<span className="text-danger"> *</span></label> 
                                <input type="text" id="Vnumber" name="Vnumber" placeholder="Enter Vehicle number" onChange={onChange} value={note.Vnumber}/> </div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6 flex-column d-flex">
                                <label className="form-control-label px-1">Rent (per/day)<span className="text-danger"> *</span></label>
                                <input type="text" id="Rent" name="Rent" placeholder="Enter rent (per/day)" onChange={onChange} value={note.Rent}/> </div>

                                <div className="form-group col-sm-6 flex-column d-flex">
                                <label className="form-control-label px-1">No. of seats<span className="text-danger"> *</span></label>
                                <input type="text" id="Scapacity" name="Scapacity" placeholder="Enter no. of seats in car" onChange={onChange} value={note.Scapacity}/> </div>
                            </div>

                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6 flex-column d-flex">
                                <label className="form-control-label px-1">City<span className="text-danger"> *</span></label>
                                <input type="text" id="city" name="city" placeholder="Enter your city" onChange={onChange} value={note.city}/> </div>

                                <div className="form-group col-sm-6 flex-column d-flex">
                                <label className="form-control-label px-1">Country<span className="text-danger"> *</span></label>
                                <input type="text" id="country" name="country" placeholder="Enter your country"  onChange={onChange} value={note.country}/> </div>
                            </div>

                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6 flex-column d-flex">
                                    <label className="form-control-label px-1">Image Link</label> 
                                    <input type="text" id="image" name="image" placeholder="Paste the image link" onChange={onChange} value={note.image}/> 
                                </div>
                               
                            </div>

                            
                            
                            <div className="row justify-content-end">
                                <div className="form-group "> 
                                <button type="submit" className="btn-block btn-primary" >Submit</button> </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

