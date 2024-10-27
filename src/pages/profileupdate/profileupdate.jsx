import React , {useState} from "react";
import './profileUpdate.css'
import assets  from "../../assets/assets";

const ProfileUpdate = ()=>{

    const [image , SetImage] = useState(false);
    return(
        <div className='profile'>
            <div className="profile-container">
                <form action="">
                    <h3>Profile Details</h3>
                    <label htmlFor="avatar">
                        <input onChange={(e)=>SetImage(e.target.files[0])} type="file"  id='avatar' accept='.png ,.jpg, .jpeg' hidden/>
                        <img src={image? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
                        upload profile image
                        </label>
                        <input type="text" placeholder="Your Name" required />
                        <textarea name="" id="" placeholder="Write profile Bio" required></textarea>
                        <button>Save</button>
                </form>
                <img src={image? URL.createObjectURL(image) : assets.logo_icon} className="profile-pic" alt="" />
            </div>
            
        </div>
    )
};

export default ProfileUpdate;