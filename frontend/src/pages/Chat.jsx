import { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "../style";
import Contact from "../components/Contact";
import {Formik,Field,Form,ErrorMessage} from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

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
  const state = useSelector((state)=>state)
  console.log(state)
  return (
    <section className={`${styles.paddings} h-screen min-h-screen max-h-screen ${styles.flexCenter}`}>
      <div className={`${styles.innerWidth} mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-rows-1 relative h-full`}> {/* display hidden*/}
        <div className="bg-slate-100 absolute top-0 right-full sm:static flex flex-col gap-4 overflow-y-auto max-h-full">
          <Contact key={1}/>
          <Contact key={2}/>
          <Contact key={3}/>
          <Contact key={4}/>
        </div>
        <div className="bg-slate-200 relative col-span-2">
          <div className="bg-slate-500 h-[93%] max-h-[93%] overflow-y-auto">chat</div>
          <div className="bg-slate-400 h-[7%]">
              <Formik
                initialValues={
                  {search:""}
                }
                onSubmit={(values)=>{
                  console.log(values);
                }}
                validationSchema={Yup.object({
                  search:Yup.string().required()
                })}
              >
                <Form className="flex gap-3 w-full justify-center items-center h-full p-3">
                  <Field name="search" className="w-full h-10 px-3"/>
                  <button type="submit" className="w-10 h-10 rounded-full bg-slate-700">Buscar</button>
                </Form>
              </Formik>
          </div>
        </div>
        <div className="bg-slate-300 absolute top-0 left-full lg:static">find new people</div>
      </div>
    </section>
  )
}
export default Chat;