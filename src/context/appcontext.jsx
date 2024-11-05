import { createContext, useEffect, useState } from "react";
import{doc, getDoc, onSnapshot, updateDoc} from 'firebase/firestore';
import {db,auth} from '../config/firebase';
import {useNavigate} from "react-router-dom";


export const Appcontext = createContext();

const AppcontextProvider = (props)=>{

    const navigate = useNavigate();
    const [userData ,setUserData] = useState(null);
    const [chatData ,setChatData] = useState(null);

    const loadUserData = async (uid) => {
        try{                                
            const userRef = doc(db,'users',uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();
            setUserData(userData);
            if(userData.avatar && userData.name){
                navigate('/chat');
            }
            else{
                navigate('/profile');
            }
            await updateDoc(userRef,{
                lastseen:Date.now()
            }) 
            setInterval(async() => {
                if(auth.chatUser){
                    await updateDoc(userRef,{
                        lastseen:Date.now()
                    })
                }
                
            }, 60000);

        }catch(error){

        }
    }
    useEffect(() =>{  
          if(userData){
            const chatRef = doc(db,'chats',userData.id);
            const unSub = onSnapshot(chatRef,async(res) =>{
                const chatItems = res.data().chatsData;
                const tempData  = [];
                for(const item of chatItems) {
                    const userRef = doc(db,'users',item.rid);
                    const userSnap = await getDoc(userRef);
                    const userData = userSnap.data();
                    tempData.push({...item,userData});
          } 
          setChatData(tempData.sort((a,b) =>b.updatedAt - a.updatedAt));
        })
        return () => {
            unSub()
        };
    }
    },[userData])

    const value = {
        userData,setUserData,
        chatData,setChatData,
        loadUserData

    }
    return(
        <Appcontext.Provider value={value}>
        {props.children}
        </Appcontext.Provider>
    )
}
export default AppcontextProvider;
