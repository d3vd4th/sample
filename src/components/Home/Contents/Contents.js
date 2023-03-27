import React, {useState,useContext,useEffect} from 'react'
import './Contents.css'
import "bootstrap/dist/css/bootstrap.min.css"; 
import {Row,Col} from 'react-bootstrap';
import { FirebaseContext ,AuthContext} from '../../../store/FirebaseContext';
import {storage,auth,db} from '../../../Firebase/config'
import {ref,getDownloadURL,uploadBytes} from 'firebase/storage'
import { setDoc,doc,collection,} from "firebase/firestore"

function Contents() {
  const {firebase} =useContext(AuthContext)
  const [message,setMessage]= useState('')
  const [image,setImage]= useState(null);
  const date =new Date()
  const handleSubmit = async(e)=>{
    e.preventDefault()
     if(!image) return;
    const imageRef = ref(storage,`/images/${image.name}`);
    uploadBytes(imageRef,image).then((snapshot)=>{
    getDownloadURL(snapshot.ref).then((url)=>{
      console.log(url)

      const community = collection(db, "community");
     
      
     setDoc(doc(community),{
        message,
        url,
        userId:auth.currentUser.uid,
        
        createdAt:date.toDateString()

      })
      
    })
    })
  }
   useEffect(()=>{
    //  .get().then((snapshot)=>{

     
    //   const allPost = snapshot.docs.map((data)=>{
    //     return{
    //       ...data.data(),
    //       id:data.id
    //     }
    //   })
    //  console.log(allPost)
 
    // })
  },[])
  return (
    <div>
      <div>
        <Row className='main vh-100 justify-content-md-center'>
            
            <Col className='towers xs={12} sm={4} md={6}'>
              <div className='tower_icon '>
               Message: <input className='msg' type="text" value={message} onChange={(e) => setMessage(e.target.value)}></input><br/>
               <img alt='post' width='200px'height='200px' src={image ? URL.createObjectURL(image) : ''}></img>
               <form>
               image:<input className='file' type="file" value={""} onChange={(e) =>{setImage(e.target.files[0])}}></input><br/>
              <button onClick={handleSubmit} className='btn' > upload and submit </button>
              </form>
               </div>
            </Col>
            
            
        </Row>
        </div>
    </div>
  )
}

export default Contents