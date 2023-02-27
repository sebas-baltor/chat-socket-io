import { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "../style";
import Contact from "../components/Contact";

const socket = io("http://localhost:3000");

function Chat (){
  //   const [count, setCount] = useState(0);
  // const [connect, setConnect] = useState("no conectado");
  // useEffect(() => {
  //   socket.on("connection", (socket) => {
  //     setConnect("conectado");
  //     console.log(socket.id)
  //   });
  //   socket.on("count", () => {
  //     console.log("cambio la cuenta");
  //   });
  //   return ()=>{
  //     socket.off("connection");
  //     socket.off("count");
  //   }
  // }, []);
  // return (
  //   <div>
  //     chat {count}
  //     <br />
  //     {connect}
  //     <br />
  //     <button
  //       className="bg-sky-100 rounded-full p-4"
  //       onClick={() => {
  //         setCount(count + 1);
  //       }}
  //     >
  //       aumentar contador
  //     </button>
  //     <button
  //       className="bg-orange-200 rounded-full p-4"
  //       onClick={(e) => {
  //         e.preventDefault();
  //         socket.emit("count", count);
  //         // socket.off("count");
  //       }}
  //     >
  //       Enviar valor contador
  //     </button>
  //   </div>
  // );
  return (
    <section className={`${styles.paddings} min-h-screen`}>
      <div className={`${styles.innerWidth} mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-1 relative`}> {/* display hidden*/}
        <div className="bg-slate-100 absolute top-0 right-full sm:static flex flex-col gap-4 overflow-y-auto max-h-[90vh]">
          <Contact key={1}/>
          <Contact key={2}/>
          <Contact key={3}/>
          <Contact key={4}/>
          <Contact key={4}/>
          <Contact key={4}/>
          <Contact key={4}/>
          <Contact key={4}/>
          <Contact key={4}/>
          <Contact key={4}/>
          <Contact key={4}/>
          <Contact key={4}/>

        </div>
        <div className="bg-slate-200">chat</div>
        <div className="bg-slate-300 absolute top-0 left-full lg:static">find new people</div>
      </div>
    </section>
  )
}
export default Chat;