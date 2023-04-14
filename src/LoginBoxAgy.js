import React from 'react'
import './css/LoginBox.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataContext from './states/DataContext';
import { useContext } from 'react';

export default function Login(props) {

  const context = useContext(dataContext);
  const { setlogin, setDisplay, setProfile, showAlert } = context;


    const navigate = useNavigate();
    const [credentials,setCredentials] = useState({email: "", password:""})

    async function handleSubmit(e){
        e.preventDefault();

        const response = await fetch(`https://car-rental.adaptable.app/api/authagency/login`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password})
    
          });
          console.log("login info");
          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token', json.authtoken)
            navigate('/dataentry');
            setDisplay(true);
            setProfile(true);
            showAlert("Successfully Loged-In",'success','Great')
          }
          else{
            showAlert("Email-id or password is incorrect",'danger','Sorry')
          }
    }

    function onChange(e){
       
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }


    // function to change the login state, so that signup page can be populated
    function handleClick(e) {
      e.preventDefault();
      setlogin(false);
     

  }

  return (
    <div className="container_login">
       
            <h2><strong>Login</strong></h2>
          
           
             
                <form className="myform" onSubmit={handleSubmit} >
                    <div className="mb-3 login_form">
                        <i className="fa-solid fa-envelope icon px-1"></i>
                        <label htmlFor="exampleInputEmail1" className="form-label login_form" >Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"
                            placeholder="Enter your email" value={credentials.email} onChange={onChange}/>
                        <div id="emailHelp">Test Email : test001@gmail.com</div>
                    </div>
                    <div className="mb-3 login_form">
                        <i className="fa-sharp fa-solid fa-key icon px-1"></i>
                        <label htmlFor="exampleInputPassword1" className="form-label login_form">Password</label>
                        <input type="password" className="form-control" id="password" name='password'
                            placeholder="Enter your password" value={credentials.password} onChange={onChange}/>
                            <div id="emailHelp" >Password : test4567</div>
                    </div>

                    <button type="submit" className="btn btn-secondary submitBtn">Submit</button>
                </form>


                <div className='below_form'>
                    <small>Don't have a account? </small>
                   
                      <small><span onClick={handleClick} style={{color: "blue"}}>Sign Up</span></small>

                   

                </div>

            

        



    </div>
  )
}