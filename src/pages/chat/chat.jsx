import React from 'react';
import './chat.css'
import  LeftSideBar  from '../../components/leftsidebar/leftsidebar';
import  ChatBox  from '../../components/chatbox/chatbox';
import  RightSideBar  from '../../components/rightsidebar/rightsidebar';
const Chat = ()=>{

    return(
        <div className='Chat'>
            <div className="chat-container">
            <LeftSideBar />
            <ChatBox />
            <RightSideBar />

            </div>
            
        </div>
    )
};

export default Chat;