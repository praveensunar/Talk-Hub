import React ,{useContext, useEffect, useState} from "react";
import './profileUpdate.css'
import assets  from "../../assets/assets";
import { onAuthStateChanged } from "firebase/auth";
import {auth ,db} from '../../config/firebase';
import {doc,getDoc, updateDoc} from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../../lib/upload";
import { Appcontext } from '../../context/appcontext';


const ProfileUpdate = ()=>{
    
    const navigate = useNavigate();
    const [image , SetImage] = useState(false);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [uid, setUid] = useState('');
    const [prevImage, setPrevImage] = useState('');
    const {setUserData} = useContext(Appcontext);

    const profileUpdate = async (event) =>{
        event.preventDefault();
        try{
            if(!prevImage && Image){
                toast.error("upload profile picture")
        }
        const docRef = doc(db,'users',uid)
        if(image){
            const imgUrl = await upload(image);
            setPrevImage(imgUrl);
            await updateDoc(docRef,{
            avatar:imgUrl,
            bio:bio,
            name:name
        })
        }
        else{
            await updateDoc(docRef,{
                bio:bio,
                name:name
            })
        }
        const snap = await getDoc(docRef);
        setUserData(snap.data());
        navigate('/chat');
        }catch(error)  {
            console.error(error);
            toast.error(error.message); 
        }

    }
    
    useEffect(()=>{
    
        onAuthStateChanged(auth,async(user)=>{
            if(user){
                setUid(user.uid)
                const docRef = doc(db,'users',user.uid);
                const docSnap = await getDoc(docRef);
                if(docSnap.data().name){
                    setName(docSnap.data().name)
                }
                if(docSnap.data().bio){
                    setBio(docSnap.data().bio)
                }
                if(docSnap.data().avatar){
                    setPrevImage(docSnap.data().avatar)
                }
            }
            else{
                navigate('/')
            }
        })
    },[])
    return(
        <div className='profile'>
            <div className="profile-container">
                <form onSubmit={profileUpdate}>
                    <h3>Profile Details</h3>
                    <label htmlFor="avatar">
                        <input onChange={(e)=>SetImage(e.target.files[0])} type="file"  id='avatar' accept='.png ,.jpg, .jpeg' hidden/>
                        <img src={image? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
                        upload profile image
                        </label>
                        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Your Name" required />
                        <textarea onChange={(e)=>setBio(e.target.bio)} value={bio} name="" id="" placeholder="Write profile Bio" required></textarea>
                        <button>Save</button>
                </form>
                <img src={image? URL.createObjectURL(image) : prevImage ? prevImage : assets.logo_icon} className="profile-pic" alt="" />
            </div>
            
        </div>
    )
}

export default ProfileUpdate;