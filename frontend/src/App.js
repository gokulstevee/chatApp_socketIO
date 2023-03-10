import "./App.css";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

//no dotenv
const socket = io.connect("http://localhost:5000");
const userId = nanoid(4);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userId });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty App</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index}>
              <span>id: {payload.userId}</span>: {payload.message}
            </p>
          );
        })}
        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="type here..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
