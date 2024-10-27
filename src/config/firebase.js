
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,getAuth,signInWithEmailAndPassword } from "firebase/auth";
import {doc , getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyCURthD96QMMF8ycPC6hg_T7x9zMXjgKhg",
    authDomain: "talk-hub-bb7c4.firebaseapp.com",
    projectId: "talk-hub-bb7c4",
    storageBucket: "talk-hub-bb7c4.appspot.com",
    messagingSenderId: "496582929757",
    appId: "1:496582929757:web:d45444d7108417b3adccb4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (username,email,password) => {
try{
const res = await createUserWithEmailAndPassword(auth,email,password);
const user = res.user;
await setDoc(doc(db,"users",user.uid),{
    id:user.uid,
    username:username.toLowerCase(),
    email,
    name:"",
    avatar:"",
    bio:"Hey , There i am using Talk-Hub",
    lastseen:Date.now()
})
await setDoc(doc(db,"chats",user.uid),{
    chatData:[]
})
}catch(error){
    console.error(error)
    toast.error(error.code.split("/")[1].split("-").join(" "))
}
}
 const login = async (email , password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.error(error)
        toast.error(error.code.split("/")[1].split("-").join(" "))
    }
 }
export{signup,login}

