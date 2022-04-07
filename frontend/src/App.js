import './App.css';
import io from "socket.io-client";

const SERVER = "http://localhost:8080";
const socket = io.connect(SERVER)

function App() {

  return (
    <div className="App">
      <h1>Testing</h1>
    </div>
  );
}

export default App;
