import React,{useState,useContext} from 'react'
import './Signup.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import {Row,Col,Form} from 'react-bootstrap';
import {MDBBtn,MDBContainer, MDBCard,MDBCardBody,MDBInput,MDBCheckbox}from 'mdb-react-ui-kit';
import { FirebaseContext } from '../../store/FirebaseContext';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateCurrentUser } from 'firebase/auth'; 
import { auth , db} from '../../Firebase/config';
import { setDoc,doc} from "firebase/firestore"



function Signup() {
  const history=useHistory()
  const [username,setUsername]= useState('')
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const [phone,setPhone]= useState('')
  const {firebase} = useContext(FirebaseContext)
  const signIn = async(e)=>{
    e.preventDefault()
   
    const user = await createUserWithEmailAndPassword(auth,email,password)
    
      console.log(user)
   
      await setDoc(doc(db,"users",user.user.uid),{
        id:user.user.uid,
        phone:phone,
        username:username
      })
        .then(()=>{
                history.push('/')
              })
              console.log(auth?.currentUser)  
              .then((user)=>{
                user.updateProfile({displayName:username})
              })
            
      
   
            }

  return (
    <div>

    <Row>
    <Col className='first-section vh-100'></Col>
    <Col className='second-section'>
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className=' ' style={{borderRadius: '1rem',maxWidth: '600px',marginTop:'120px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mt-5 mb-4 "style={{fontSize:'1.5em'}}>Create an account</h2>
          <Form onSubmit={signIn} >
            <div>
         
          <MDBInput className=' inputtext mb-4'  placeholder='Username' pattern= '^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$'   type='text' value={username} onChange={(e)=>setUsername(e.target.value)} required/>
          <span className='validators' >Username should have minimum eight characters, at least one uppercase letter</span> 
          </div>
          < MDBInput wrapperClass='mb-4'placeholder='Your Email'  size='lg' id='form2' type='email'value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <span className='validators' >Username should have minimum eight characters, at least one uppercase letter</span> 
          < MDBInput wrapperClass='mb-4' placeholder='Password' size='lg' id='form3' type='password'value={password} onChange={(e)=>setPassword(e.target.value)}/>
          < MDBInput wrapperClass='mb-4' placeholder='Phone number' size='lg' id='form4' type='number'value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <button className='login_btn' onClick={signIn}>Register</button>
          </Form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
   
    </Col>
    </Row>
    </div>
  )
}
export default Signup