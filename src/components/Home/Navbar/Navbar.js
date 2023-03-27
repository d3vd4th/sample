import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext, FirebaseContext} from '../../../store/FirebaseContext';
import { auth } from '../../../Firebase/config';
import './Navbar.css'
import {useHistory}from 'react-router-dom'

function NavbarSection() {
  const {user}=useContext(AuthContext)
  const history=useHistory()
  const logOut =async() =>{
    const user = await signOut(auth)  
    .then(()=>{
      history.push('/')
    })
  } 
  return (
    <div>
        <Navbar   className='Navbar w-100 z-index=0'>
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Nav>
            <Nav.Link className='Nav_text text-light' href="#home">HOME</Nav.Link>
            <Nav.Link className='Nav_text text-light' href="#features">COMUNNITY</Nav.Link>
            <Nav.Link className='Nav_text text-light' href="#pricing">E-COMMERCE</Nav.Link>
            <Nav.Link className='Nav_text text-light' href="#pricing">DOCTOR IS HERE</Nav.Link>
            <Nav.Link className='Nav_text text-light' href="#pricing">CONTACT US</Nav.Link>
            <Nav.Link className='Nav_text text-light' href="#pricing">{user && user.displayName }</Nav.Link>
            <button className='login_btn' onClick={logOut}>Logout</button>
          </Nav>
        </Container>
      </Navbar>
      
    
    </div>
  )
}

export default NavbarSection