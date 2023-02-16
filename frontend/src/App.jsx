import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3000");

function App() {
  const [count, setCount] = useState(0);
  const [connect, setConnect] = useState("no conectado");
  useEffect(() => {
    socket.on("connection", (socket) => {
      setConnect("conectado");
      console.log(socket.id)
    });
    socket.on("count", () => {
      console.log("cambio la cuenta");
    });
    return ()=>{
      socket.off("connection");
      socket.off("count");
    }
  }, []);
  return (
    <div>
      chat {count}
      <br />
      {connect}
      <br />
      <button
        className="bg-sky-100 rounded-full p-4"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        aumentar contador
      </button>
      <button
        className="bg-orange-200 rounded-full p-4"
        onClick={(e) => {
          e.preventDefault();
          socket.emit("count", count);
          // socket.off("count");
        }}
      >
        Enviar valor contador
      </button>
    </div>
  );
}

export default App;
