import React, { useEffect, useState } from 'react';
import './App.css';

type msg = {
  text: string
}
function App() {
  const [room, setRoom] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const ws = new WebSocket("ws://localhost:8021/"); 
  useEffect(() => {
      ws.onopen = () => {
        console.log("WebSocket connection opened");
      };
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received message:', data);
        if (data.action === 'sendMessage') {
        }
      };
  })
  const joinRoom = () => {
    if (room.trim() !== "") {
      ws.send(JSON.stringify({ action: "joinRoom" , room }));
    }
  };
  const sendMessage = () => {
    if (message.trim() !== "") {
      ws.send(JSON.stringify({ action: "sendMessage", room, text: message }));
      setMessage(""); 
    }
  };
  return (
    <div className="App">
      <input value={room} onChange={(e) => setRoom(e.target.value)} placeholder="room"/>
      <button onClick={joinRoom}>join room</button>
      <input value={message} onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={sendMessage}>send</button>
      <div className="message-container">
  {messages.map((msg: msg, index) => (
    <div key={index} className="message">
      {msg.text}
    </div>
  ))}
</div>
    </div>
  );
}

export default App;
