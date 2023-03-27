

import React from "react";
import ReactDOM from "react-dom";
import { db } from "./Firebase/config";
import { collection } from "firebase/firestore";
import Context, { FirebaseContext } from "./store/FirebaseContext";
import "./index.css";
import App from "./App";


ReactDOM.render(
  
  <FirebaseContext.Provider value={{db}}>
    <Context>
    <App />
    </Context>
    </FirebaseContext.Provider>
 
  , document.getElementById("root")
);
