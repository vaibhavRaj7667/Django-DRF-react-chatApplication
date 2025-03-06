import React, { useEffect, useState } from 'react';
import '../stylesheet/chatPage.css';
import { Refresh } from './RefreshToken';

const ChatPage = () => {
  const [persons, setPersons] = useState([
    { Name: "Kelly Tran", message: "This is a test message", pic: "https://i.pinimg.com/736x/b6/d5/2e/b6d52e87bf3fb1f9c26672ad8e0370c3.jpg" },
    { Name: "Kelly Tran", message: "This is a test message", pic: "https://i.pinimg.com/736x/b6/d5/2e/b6d52e87bf3fb1f9c26672ad8e0370c3.jpg" },
    { Name: "Kelly Tran", message: "This is a test message", pic: "https://i.pinimg.com/736x/b6/d5/2e/b6d52e87bf3fb1f9c26672ad8e0370c3.jpg" },
    { Name: "Kelly Tran", message: "This is a test message", pic: "https://i.pinimg.com/736x/b6/d5/2e/b6d52e87bf3fb1f9c26672ad8e0370c3.jpg" }
  ]);

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

        {persons.map((data, index) => (
          <div key={index} className='data'>
            <img src={data.pic} alt="" />
            <div className='text_message'>
              <h4>{data.Name}</h4>
              <p>{data.message}</p>
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
