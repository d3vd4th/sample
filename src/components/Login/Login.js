import React  from 'react';
import {Link,useHistory}from 'react-router-dom'
import './Login.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import {Row,Col} from 'react-bootstrap';
import {MDBBtn,MDBContainer, MDBRow,MDBCol, MDBCard,MDBCardBody,MDBInput}from 'mdb-react-ui-kit';
import { useState,useContext,useEffect } from 'react';
import {FirebaseContext} from '../../store/FirebaseContext'
import { signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../Firebase/config';



function Login() {
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const {firebase}   =useContext(FirebaseContext)
  const [formErrors,setFormErrors]= useState({})
  const [isSubmit,setisSubmit]= useState(false)
  const history=useHistory()
  const logIn = async(e,)=>{
    e.preventDefault()
    setFormErrors(validate(email,password))
    setisSubmit(true)
    
    const user = await signInWithEmailAndPassword(auth,email,password)
    .then(()=>{history.push('/home')
    })
    .catch((error)=>{ alert(error.message)
    })
    console.log(auth?.currentUser)  
  }

  useEffect(()=>{
    console.log(formErrors);
 if(Object.keys(formErrors).length ==0 && isSubmit){
 
 }
  },[formErrors])
  const validate =(email,password)=>{
  const errors ={}
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  if(!email){
    errors.email="Email is required!!";
  }else if(!regex.test( email)){
    errors.email="This is not a valid Email!!";
  }
  if(!password){
    errors.password="Password is required!!";
  }else if(password.length < 4 ){
    errors.password="Password must contain 4-10 characters!!";
  }
  else if(password.length >10 ){
    errors.password="Password must contain 4-10 characters!!";
  }
  return errors;
  }



    return (
    <div>
      
    <Row>
    {/* <Col className='first-section vh-100'>
  
    </Col> */}
    <Col className='second-section vh-100'>
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className=' text-dark  mx-5  ' style={{borderRadius: '2.5rem',maxHeight:'50rem', maxWidth: '380px',background:'#fff',marginTop:'130px',boxShadow:'30px 14px 42px #ffa6c9 '}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className=" mb-2 text-uppercase">Login</h2>
              <p className="text-dark-50 mb-5">Please enter your login and password!</p>
               
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-dark' placeholder='Email address' id='formControlLg' type='email' size="lg"value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <p className='validations'>{formErrors.email}</p>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-dark' placeholder='Password' id='formControlLg' type='password' size="lg"value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <p className='validations'>{formErrors.password}</p>
              <p className="small mb-3 pb-lg-2"><a class=""style={{textDecoration : 'none' ,color:'#54B4D3'}} href="#!">Forgot password?</a></p>
              <button className='login_btn' onClick={logIn}>Login</button>
              {Object.keys(formErrors).length == 0 && isSubmit ? (<p className="ui message success"> Signed in successfully</p>) : (<pre></pre>) }
              <p className="mb-0 pt-4"> <Link to="/login_otp" class=" fw-bold"style={{textDecoration : 'none',color:'#54B4D3'}}>login using Phone number</Link></p>
             


              <div>
                <p className="mb-0 pt-4">Don't have an account? <Link to="/signup" class=" fw-bold"style={{textDecoration : 'none',color:'#54B4D3'}}>Sign up</Link></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    
    </Col>
    <Col className='vh-100 d-flex justify-content-center  align-items-center ' >
  
    <img  className='male_femaleimg  'src={process.env.PUBLIC_URL + "/male-female-symbols.jpg"} />
    
    </Col>
    </Row>
    </div>
  )
}

export default Login;



