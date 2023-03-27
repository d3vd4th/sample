import React from 'react'
import {Link,useHistory}from 'react-router-dom'

import './Login.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import {Row,Col} from 'react-bootstrap';
import {MDBBtn,MDBContainer, MDBRow,MDBCol, MDBCard,MDBCardBody,MDBInput}from 'mdb-react-ui-kit';
import { useState,useContext } from 'react';
import {FirebaseContext} from '../../store/FirebaseContext'
import { signInWithPhoneNumber} from 'firebase/auth'
import { auth } from '../../Firebase/config';

import{RecaptchaVerifier  } from 'firebase/auth'

function Login_otp() {
    
        const [phone,setphone]= useState('')
        const [otp,setOtp]= useState('')
        const [user,setUser] = useState(null)
        const {firebase}   =useContext(FirebaseContext)
        const history=useHistory()
        console.log(auth.currentUser)
        
           const sendOtp =async() =>{
           try{
            
           let recaptchaVerifier = await new RecaptchaVerifier("recaptcha",{},auth)
           let confirmation =await signInWithPhoneNumber(auth,phone,recaptchaVerifier)
           console.log(confirmation);
           setUser(confirmation)
           }
           catch(err){
            console.log(err)
           }
           } 
           const verifyOtp =async() =>{
            await user.confirm(otp)
            .then(()=>{
              history.push('/home')
            })
            .catch((error)=>{ alert(error.message)
            })
           } 
           
         
         
        
  return (
    <div>
    <Row>
    <Col className='first-section vh-100'>
    
    </Col>
    <Col className='second-section'>
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className=' text-dark  mx-auto' style={{borderRadius: '1rem', maxWidth: '380px',background:'#fff',marginTop:'130px',}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100 '>

              <h2 className=" mb-2 text-uppercase">Login</h2>
              <p className="text-dark-50 mb-5">Please enter your Phone number!</p>
               
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-dark' placeholder='Phone Number' id='formControlLg' pattern='^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$' type='num' size="lg" value={phone} onChange={(e) => setphone(e.target.value)}/>
              
              <button className='login_btn1'onClick={sendOtp}>Send otp</button>
              <div id='recaptcha'>

              </div>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-dark' placeholder='otp Number' id='formControlLg' type='number' size="lg" value={otp} onChange={(e) => setOtp(e.target.value)} />
              <button className='login_btn'onClick={verifyOtp}>Verify otp</button>
              
              


              <div>
                <p className="mb-0 pt-4">Don't have an account? <Link to="/signup" class=" fw-bold"style={{textDecoration : 'none',color:'#54B4D3'}}>Sign up</Link></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    </Col>
    </Row>
    </div>
  )
}

export default Login_otp