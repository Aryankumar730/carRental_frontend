import React from 'react';
import './css/LoginBox.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataContext from './states/DataContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function SignupBox() {

    const navigate = useNavigate();

    const context = useContext(dataContext);
    const { showAlert , setlogin, setDisplay} = context;


    const [credentials, setCredentials] = useState({ email: "", fullname: "", password: "", cpassword:""})



    async function handleSubmit(e) {
        e.preventDefault();

        if(credentials.password === credentials.cpassword){

            const response = await fetch(`https://car-rental.adaptable.app/api/authuser/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
    
                },
                body: JSON.stringify({ name: credentials.fullname, email: credentials.email, password: credentials.password })
    
            });
            console.log("signup info");
            const json = await response.json();
            console.log(json);
            if (json.success) {
                localStorage.setItem('token', json.authtoken)
                navigate('/');
                showAlert("Account created successfully",'success','Great')
                setDisplay(true);
            }
            else if(json.error1){
                showAlert("Sorry, this email is already registered.",'danger','Sorry')

            }
            else {
                showAlert("Please enter in correct format",'danger','Sorry')
            }
        }
        else{
            showAlert("Please confirm the same password",'danger','Sorry')
        }
    }
    
    function onChange(e) {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    // function to change the login state, so that login page can be populated
    function handleClick(e) {
        e.preventDefault();
        setlogin(true);
       
    }
  

  return (
    <div className="container_login">
       
            <h2><strong>Sign Up</strong></h2>
                               
                <form className="myform" onSubmit={handleSubmit}>
                    <div className="mb-3 login_form">
                        <i className="fa-solid fa-envelope icon px-1"></i>
                        <label htmlFor="exampleInputEmail1" className="form-label login_form" >Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"
                            placeholder="Enter your email" value={credentials.email} onChange={onChange}/>
                       
                    </div>
                    <div className="mb-3 login_form">
                    <i className="fa-solid fa-user px-1"></i>
                        <label htmlFor="exampleInputPassword1" className="form-label login_form">Full Name</label>
                        <input type="name" className="form-control" id="fullname" name='fullname'
                            placeholder="Enter your full name" value={credentials.fullname} onChange={onChange}/>
                           
                    </div>
                    <div className="mb-3 login_form">
                        <i className="fa-sharp fa-solid fa-key icon px-1"></i>
                        <label htmlFor="exampleInputPassword1" className="form-label login_form">Password</label>
                        <input type="password" className="form-control" id="password" name='password'
                            placeholder="Enter your password" value={credentials.password} onChange={onChange}/>
                           
                    </div>
                    <div className="mb-3 login_form">
                            <i className="fa-sharp fa-solid fa-key icon px-1"></i>
                            <label htmlFor="exampleInputPassword1" className="form-label login_form">Confirm Password</label>
                            <input type="password" className="form-control" id="cpassword" name='cpassword'
                                placeholder="Please confirm the password" value={credentials.cpassword} onChange={onChange} minLength={5} required/>
                    </div>
                    
                    <button type="submit" className="btn btn-secondary submitBtn">Sign Up</button>
                </form>


                <div className='below_form'>
                    <small>Have an account? </small>
                   
                    <small><span onClick={handleClick} style={{color: "blue"}}> Log In</span></small>
                                      
                </div>

                

            

        



    </div>
  )
}
