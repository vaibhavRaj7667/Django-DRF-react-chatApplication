import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../stylesheet/chatPage.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import SideBar from './SideBar';
import SendIcon from '@mui/icons-material/Send';
import { Refresh } from './RefreshToken';
import Navbar from './Navbar';

const ChatPage = () => {
  
  // State declarations
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const messagesEndRef = useRef(null);
  const [id, setid] = useState(null)



  const fetchUserId = async () => {
      try {
          const token = localStorage.getItem('access_token');
          const response = await axios.get("http://127.0.0.1:8000/currentuser/", {
              headers: { Authorization: `Bearer ${token}` }
          });
          let lol =response.data['id']
          setid(lol);
          
      } catch (error) {
          console.error("Error fetching user ID:", error);
      }
  };

  useEffect(()=>{
    console.log(id)
  },[id])

  useEffect(()=>{
    fetchUserId()
  },[])

  



  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch friends list
  useEffect(() => {
    

      const fetchFriends = async () => {
        try {
          const token = localStorage.getItem("access_token");
          const response = await axios.get(`http://127.0.0.1:8000/friends/${id}/`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setFriends(response.data);
          console.log("working")
        } catch (error) {
          console.error("Error fetching friends:", error);
        }
      };
      fetchFriends();


    

    
  }, [id]);

  // WebSocket connection
  useEffect(() => {
    if (!selectedFriend) return;

    const token = localStorage.getItem("access_token");
    if (!token) return;

    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/?token=${token}&username=${selectedFriend.username}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data);
        setMessages(prev => [
          ...prev,
          {
            incoming: messageData.sender_username === selectedFriend.username,
            text: messageData.message,
            sender: messageData.sender_username,
            timestamp: messageData.timestamp || new Date().toISOString()
          }
        ]);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [selectedFriend]);

  // Send message function
  const sendMessage = useCallback(() => {
    if (!newMessage.trim()) return;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }

    try {
      socket.send(JSON.stringify({ message: newMessage }));
      setMessages(prev => [
        ...prev,
        {
          incoming: false,
          text: newMessage,
          sender: "You",
          timestamp: new Date().toISOString()
        }
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [newMessage, socket]);

  // Handle Enter key press
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);



  useEffect(()=>{
  
    const fetchMessage= async()=>{
      if (!selectedFriend) return;
      try {
        const token = localStorage.getItem('access_token')
        await axios.get('http://127.0.0.1:8000/messages/',
          {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            otheruser: selectedFriend.username
          }
        })
        .then((response)=>{
            const formattedMessages = response.data.map(msg => ({
            incoming: msg.sender !== id, 
            text: msg.message_text,
            sender: msg.sender,
            timestamp: msg.sent_at
            }));
    
          setMessages(formattedMessages); 



          console.log(response.data)
        })
      } catch (error) {
        console.log("E",error)
      }
    } 

    fetchMessage()

  },[selectedFriend])

  return (
    <div className='main'>
      <div className='just'>
        <SideBar/>
      </div>
      {/* Friends list sidebar */}
      <div className='peoples'>
        <input 
          type="text" 
          placeholder='Search...' 
          onChange={(e) => console.log(e.target.value)} // Add your search logic
        />
        {friends.map((friend) => (
          <div 
            key={friend.id} 
            className={`data ${selectedFriend?.id === friend.id ? 'selected' : ''}`}
            onClick={() => setSelectedFriend(friend)}
          >
            <img 
              src={friend.avatar || "https://i.pinimg.com/736x/b6/d5/2e/b6d52e87bf3fb1f9c26672ad8e0370c3.jpg"} 
              alt="User" 
            />
            <div className='text_message'>
              <h4>{friend.username}</h4>
              <p>{friend.last_message || "No messages yet"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat area */}
      <div className='chat_box'>
        {selectedFriend ? (
          <>
            {/*<div className="chat_header">
              <img 
                src={selectedFriend.avatar || "https://i.pinimg.com/736x/b6/d5/2e/b6d52e87bf3fb1f9c26672ad8e0370c3.jpg"} 
                alt="User" 
              />
              <h3>{selectedFriend.username}</h3>
              <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
                {isConnected ? 'Online' : 'Offline'}
              </span>
            </div>*/}

            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.incoming ? 'incoming' : 'outgoing'}`}>
                  {/* <div className="sender">{msg.sender}</div> */}
                  <div className="text">{msg.text}</div>
                  <div className="timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* text field */}
            <div className="input_area">
              <textarea 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
              />
              <Button style={{backgroundColor:'transparent', color:'white', borderRadius:'20px'}} onClick={sendMessage}>
                   <SendIcon style={{color:'black'}}/>
              </Button>
            </div>
          </>
        ) : (
          <div className="no-friend-selected">
            <h3>Please select a friend to chat with</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;