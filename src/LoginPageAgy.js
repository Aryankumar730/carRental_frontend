import React from 'react';
import './css/LoginPage.css';
import LoginBoxAgy from './LoginBoxAgy';
import dataContext from './states/DataContext';
import { useContext } from 'react';
import SignupBoxAgy from './SignupBoxAgy';
// import  Alert  from './Alert';


export default function LoginPage() {

  const context = useContext(dataContext);
  const { login } = context;

  

  return (
    <div className="row body">
      <div className="col-8 image_body">

        
      </div>
      <div className="col-4 content_box">

        { login? <LoginBoxAgy/>
        : <SignupBoxAgy/>}
                 
      </div>
    </div>

  )
}
