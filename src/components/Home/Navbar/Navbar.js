import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext, FirebaseContext} from '../../../store/FirebaseContext';
import { auth } from '../../../Firebase/config';
import './Navbar.css'
import {Link,useHistory}from 'react-router-dom'

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
        <Navbar   className='Navbar w-100  '>
        <Container>
          
          <Nav>
            <Nav.Link className=' text-dark  login_btn3'  href="/home">Home</Nav.Link>
         
             <Nav.Link  className='login_btn3 text-dark' >
              <Link to={'/about'} className='login_btn3 text-dark'>About us </Link></Nav.Link>
             {/* <Nav.Link className='Nav_text text-light' href="#pricing">{user && user.displayName }</Nav.Link>  */}
            <button className='login_btn3' onClick={logOut}>Logout</button>
          </Nav>
        </Container>
      </Navbar>
      
    
    </div>
  )
}

export default NavbarSection