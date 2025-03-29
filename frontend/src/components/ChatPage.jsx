import React, { useEffect, useState } from 'react';
import '../stylesheet/chatPage.css';
import { Refresh } from './RefreshToken';
import axios from 'axios';

const ChatPage = () => {
  const [Values, setValues]=useState([])
  

  useEffect(()=>{

    const fetchdata= async()=>{
      const token = localStorage.getItem("access_token")
      let response = await axios.get("http://127.0.0.1:8000/friends/1/",{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })
    
      setValues(response.data)
      
    }
    fetchdata() 

  },[])

  useEffect(() => {
    console.log("Updated Values:", Values);
  }, [Values]); 

  
  const [messages, setMessages] = useState([
    { incoming: true, text: "Hi there" },
    { incoming: false, text: "I am fine, how about you?" }
  ]);

  const [newMessage, setNewMessage] = useState("");

  useEffect(()=>{
    Refresh()
  },[])

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { incoming: false, text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className='main'>
      {/* Left Sidebar - People List */}
      <div className='peoples'>
        <input type="text" placeholder='Search...' />

        {Values.map((data, index) => (
          <div key={index} className='data'>
            <img src="https://i.pinimg.com/736x/b6/d5/2e/b6d52e87bf3fb1f9c26672ad8e0370c3.jpg" alt="" />
            <div className='text_message'>
              <h4>{data.username}</h4>
              <p>This is a test message</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Box */}
      <div className='chat_box'>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={msg.incoming ? 'incoming' : 'outgoing'}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input for typing messages */}
        <div className="input_area">
          <textarea 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
