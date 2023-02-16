import { useEffect } from "react"
import socketClient from "socket.io-client"
import './App.css'

const socket = socketClient("http://127.0.0.1:3000");

function App() {
  
  useEffect(()=>{
    socket.on("connection",()=>{
      console.log("I'm connected")
    })
    // console.log("se debio ejecutar el socket")
  },[])
  return (
    <div>
      chat
    </div>
  )
}

export default App
