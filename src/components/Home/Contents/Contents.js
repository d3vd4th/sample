import React, {useState,useContext,useEffect} from 'react'
import {Link}from 'react-router-dom'
import './Contents.css'
import "bootstrap/dist/css/bootstrap.min.css"; 
import {Row,Col, Navbar,} from 'react-bootstrap';
import { FirebaseContext ,AuthContext} from '../../../store/FirebaseContext';
import {storage,auth,db} from '../../../Firebase/config'
import {ref,getDownloadURL,uploadBytes} from 'firebase/storage'
import { setDoc,doc,collection,orderBy,getDocs,query} from "firebase/firestore"
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow ,MDBInput} from 'mdb-react-ui-kit';

function Contents() {
  const {firebase} =useContext(AuthContext)
  const [message,setMessage]= useState('')
  const [image,setImage]= useState(null);
  const [community,setCommunity]= useState([])
  const date =new Date()




  const handleSubmit = (e)=>{
     e.preventDefault()
     console.log('hello')
    //  savePost.then



      new Promise(function(myResolve){
      if(!image) return;
      const imageRef = ref(storage,`/images/${image.name}`);
      uploadBytes(imageRef,image).then((snapshot)=>{
      getDownloadURL(snapshot.ref).then((url)=>{
        console.log(url)
        console.log(date.getTime())
        const community = collection(db, "community",);
       setDoc(doc(community),{
          message,
          url,
          userId:auth.currentUser.uid,
          username:auth.currentUser.displayName,
          createdAt: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "  , " + date.toDateString()
        
        })
        myResolve(url)
      })
      })
      
    }).then(() => {
      getPosts()})











  
    
  }
  
  


async function getPosts(){
  const community = query(collection(db, "community"));
  const snapshots =await getDocs(community)
  const docs =snapshots.docs.map((doc) =>{ 
   return{
     ...doc.data(),
     id: doc.id
   
   }}) 
  setCommunity(docs)
  console.log(docs)
  console.log()
  
}

//to load posts in content component
  useEffect(()=>{
    getPosts()

  },[])
  return (
    <div>
      <div id='maindiv'>
        <Row className='main vh-100 justify-content-md-center'>
          
            <Col className=' xs={12} sm={4} md={6}'>
             <div className='container1'>
            <div className='logoimg'>
            <h1 className='allcare'>All Care</h1>
            <h1 className='atoneplace'>At One Place </h1>
            {/* <div className='leftlogodiv'>
            <img  className='leftlogo 'src={process.env.PUBLIC_URL + "/diet.jpeg"} alt="post" />
            </div> */}
            </div>
            <div className="wmndiv">
              
            <img  className='pngwing1 'src={process.env.PUBLIC_URL + "/pngwing.com.png"} alt="post" />
            
            </div>
            </div>
            <div className='nav1'>
            <nav className="navbar nav1 navbar-expand-lg ">
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav  navbar_nav1">
            <Link to={'/home'} className="navbar_nav2 nav-item nav-link active" href="#">Community </Link> 
            <a className="nav-item nav-link" href="#">Doctor Session</a>
            <a className="nav-item nav-link" href="#"> Clear Doubts</a> 
            <a className="nav-item nav-link" href="#"> Services</a>
            
            
           </div>
           </div>
           </nav>
            </div>

            <div className='contentdiv'>
            <MDBContainer >
              <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>
                  <MDBCard className=' text-dark  mx-auto ' style={{borderRadius: '2.5rem',maxHeight:'50rem', maxWidth: '',background:'#fff',marginTop:'15px',height:'15em',width:'59em'}}>
                    <MDBCardBody >
                      
                   
                    <input className=' typing rounded-4'  labelClass='text-dark' placeholder='type your messagge!!' size='lg  'id='formControl'type='textarea'  value={message} onChange={(e) => setMessage(e.target.value)}/>
              
                    <img alt='post' width='138px'height='138px' className='rounded-4 img2' src={image ? URL.createObjectURL(image) : ''}></img><br/>
                   
                    Image Upload:<input className='file' type="file" value={""} onChange={(e) =>{setImage(e.target.files[0])}}></input><br/>
                    <button onClick={handleSubmit} className='btn'  > Upload and submit</button>
                    
                    
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            </div>
            {community.map((doc)=>{
               return <div >
                <div className='retrievecard'>
                <MDBContainer >
              <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>
                  <MDBCard className=' text-dark  mx-auto ' style={{borderRadius: '2.5rem',maxHeight:'50rem', maxWidth: '',background:'#fff',marginTop:'30px',height:'15em',width:'59em'}}>
                    <MDBCardBody >
                      <div className='container'>
                      <div className='maindiv'>
                        <div className='imgdiv'>
                        <img  alt='post' width='200px'height='200px'className='rounded-4 img' src={doc.url}></img>
                        </div>
                        <div className='msgdiv justify-content-center'>
                        <p className='msg'>{doc.message} </p>
                        <div className="date">
                        <p className='' > {doc.createdAt}</p>
                        <p>posted by: dev{auth.currentUser.displayName}</p>
                        </div>
                        </div>
                      </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            </div>
             </div>
            })
           
            }  
              
            </Col>
            
            
        </Row>
        </div>
    </div>
  
  )
  
}

export default Contents