import './App.css';
import io from "socket.io-client";
import {useState} from 'react'
import Chat from './Chat';

const SERVER = "http://localhost:8080";
const socket = io.connect(SERVER)

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if(username !== "" && room !== ""){
      socket.emit("join_room", room)
    }
  }

  return (
    <div className="App">
      <h1>Testing</h1>

      <h3>Join a Chat</h3>
      <input type="text"  placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
      <input type="text" placeholder='room' onChange={(e) => setRoom(e.target.value)}/>
      <button onClick={joinRoom}>Join A Room</button>

      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
