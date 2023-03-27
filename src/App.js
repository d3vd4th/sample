import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";


import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useContext, useEffect } from "react";
import { AuthContext, FirebaseContext } from "./store/FirebaseContext";
import { onAuthStateChanged } from "firebase/auth";
import Login_otp from "./components/Login/Login_otp";


function App() {
//   const {user,setUser} = useContext(AuthContext)
//   const{db} = useContext(FirebaseContext)
// useEffect(() => {
//   db.auth().onAuthStateChanged((user)=>
//   setUser(user))
// });

  return (
    <div>
      <Router>
        <Route exact path='/'>
         <Login/>
         </Route>
         <Route path='/login_otp'>
         <Login_otp/>
         </Route>
         <Route path='/signup'>
         <Signup/>
         </Route>
         <Route path='/home'>
         <Home/>
         </Route>
         </Router>
        
         </div>
    
    
  );
}

export default App;