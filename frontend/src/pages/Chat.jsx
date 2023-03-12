import { useRef, useState } from "react";
import io from "socket.io-client";
import styles from "../style";
import Contact from "../components/Contact";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { setFindedPeople, closeSession } from "../redux";
import { BiSearchAlt } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import { BsPlusSquareDotted } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import Request from "../components/Requests";
// const socket = io("http://localhost:3000");

function Chat() {
  const chatRef = useRef(null);
  const dispatch = useDispatch();
  const [findMssg, setFindMssg] = useState(null);
  const connect = useRef(null);
  const request = useRef(null);
  const connectBtn = useRef(null);
  const requestBtn = useRef(null);
  const connectSection = useRef(null);
  const friendSection = useRef(null);
  // const token = useSelector(state=>state.token);
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
  const { token, findedPeople, imgPath, user } = useSelector((state) => state);
  // console.log(token);
  return (
    <section
      className={`${styles.paddings} h-screen min-h-[90vh] max-h-screen ${styles.flexCenter}`}
    >
      <div className={`${styles.innerWidth} mx-auto h-[90vh] overflow-x-hidden`}>
        <div className="bg-violet-400 flex justify-between items-center px-3 py-1 mb-1">
          <button className="text-white sm:hidden" onClick={()=>{
            friendSection.current.classList.toggle("translate-x-full");
          }}>
            <BsPlusSquareDotted />
          </button>
          <div className="text-white flex gap-3 items-center relative group">
            <img
              src={`http://localhost:3000/${user.imgPath}`}
              alt={user._id + user.name}
              className=" object-cover w-10 h-10 rounded-full"
            />
            <span className="font-black">
              {user.name} {user.lastname}
            </span>
            <div className="absolute top-full left-0 bg-slate-100 p-3 rounded-lg text-black z-20 hidden group-hover:block">
              <button
                onClick={() => {
                  dispatch(closeSession());
                }}
              >
                Log out
              </button>
            </div>
          </div>
          <button className="text-white lg:hidden" onClick={()=>{
            connectSection.current.classList.toggle("-translate-x-full");
          }}>
            <SlOptionsVertical />
          </button>
        </div>
        <div
          className={`grid sm:grid-cols-3 lg:grid-cols-4 grid-rows-1 relative h-[90%]`}
        >
          <div className="bg-white absolute top-0 right-full sm:static p-3 h-full w-1/2 sm:w-full shadow-lg sm:shadow-none z-10 sm:translate-x-0" ref={friendSection}>
            <div className="font-bold py-2 border-2 border-violet-400 bg-violet-400 text-white text-center mb-3">
              Tus amigos
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto max-h-full ">
              {user.friends.map((friend) => (
                <Contact friend={friend} key={friend._id} refFriendSection={friendSection} />
              ))}
            </div>
          </div>
          <div className="relative col-span-2 bg-slate-100">
            <div
              className="h-[90%] max-h-[90%] p-3 overflow-y-auto "
            >
              <div className="grid grid-cols-2 content-end gap-3" ref={chatRef}>
                <div className="col-span-2  max-w-[70%] justify-self-start">
                  <p className="bg-white px-2 py-1 rounded-lg">hola</p>
                </div>
                <div className="col-span-2 max-w-[70%] justify-self-end">
                  <p className="bg-violet-400 text-white px-2 py-1 rounded-lg">
                    adios, pero como has estado? Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Omnis similique tenetur sunt,
                    accusantium dolor iure esse sit laboriosam neque
                    necessitatibus?
                  </p>
                </div>
                <div className="col-span-2 max-w-[70%] justify-self-start">
                  <p className="bg-white px-2 py-1 rounded-lg">
                    Que tal como te ha hido Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Neque illum ullam facere,
                    soluta ipsa corporis nesciunt dolorem dolore in error iste
                    voluptates quis sequi nihil ratione aliquid dolorum eos
                    natus dolor! Iusto reiciendis veniam vel, omnis ex aperiam
                    officia beatae nemo natus accusamus minus, at perspiciatis
                    ipsum itaque eveniet quam.
                  </p>
                </div>
              </div>
            </div>
            <div className="h-[10%] bg-slate-200">
              <Formik
                initialValues={{ mssg: "" }}
                onSubmit={(values, { resetForm }) => {
                  let div = document.createElement("div");
                  let p = document.createElement("p");
                  div.classList.add(
                    "col-span-2",
                    "max-w-[70%]",
                    "justify-self-end"
                  );
                  p.classList.add(
                    "bg-violet-400",
                    "text-white",
                    "px-2",
                    "py-1",
                    "rounded-lg"
                  );
                  p.innerText = values.mssg;
                  div.append(p);
                  chatRef.current.append(div);
                  resetForm();
                }}
                validationSchema={Yup.object({
                  mssg: Yup.string().required(),
                })}
              >
                <Form className="flex gap-3 w-full justify-between items-center h-full">
                  <Field
                    name="mssg"
                    className="w-full h-full p-2 outline-none border-0 rounded border-2 border-violet-200 hover:bg-violet-50 focus:border-violet-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded bg-violet-400 text-white h-full"
                  >
                    <MdSend className="text-2xl" />
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
          <div className="bg-white absolute top-0 left-full lg:static p-2 w-1/2 lg:w-full shadow-lg lg:shadow-none h-full lg:translate-x-0" ref={connectSection}>
            <div className="bg-slate-50 mb-3">
              <button
                ref={connectBtn}
                className="w-1/2 font-bold text-violet-400 py-2 border-2 border-r-0 border-violet-400 hover:bg-violet-400 hover:text-white bg-violet-400 text-white"
                onClick={(e) => {
                  request.current.classList.add("hidden");
                  connect.current.classList.remove("hidden");
                  connectBtn.current.classList.add(
                    "bg-violet-400",
                    "text-white"
                  );
                  requestBtn.current.classList.remove(
                    "bg-violet-400",
                    "text-white"
                  );
                }}
              >
                Conectar
              </button>
              <button
                ref={requestBtn}
                className="w-1/2 font-bold text-violet-400 py-2 border-2 border-l-0 border-violet-400 hover:bg-violet-400 hover:text-white"
                onClick={(e) => {
                  request.current.classList.remove("hidden");
                  connect.current.classList.add("hidden");
                  requestBtn.current.classList.add(
                    "bg-violet-400",
                    "text-white"
                  );
                  connectBtn.current.classList.remove(
                    "bg-violet-400",
                    "text-white"
                  );
                }}
              >
                Solicitudes
              </button>
            </div>
            <div ref={connect}>
              <Formik
                initialValues={{ search: "" }}
                validationSchema={Yup.object({
                  search: Yup.string().required(),
                })}
                onSubmit={async (values, { resetForm }) => {
                  const split = values.search.split(" ");

                  let res = await fetch(
                    `http://localhost:3000/user/find-people/${split[0]}/${
                      split[1] ? split[1] : " "
                    }`,
                    {
                      headers: {
                        Authorization: token,
                      },
                    }
                  );
                  if (res.status > 199 && res.status < 300) {
                    if (res.status === 204) {
                      return setFindMssg("No hay coincidencias");
                    }
                    setFindMssg(null);
                    let matches = await res.json();
                    dispatch(setFindedPeople({ matches }));
                  }
                  resetForm();
                }}
              >
                <Form className="flex">
                  <Field
                    name="search"
                    className="w-full p-2 outline-none border-0 rounded-l border-2 border-violet-200 hover:bg-violet-50 focus:border-violet-400"
                    placeholder="buscar un amigo"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-r bg-violet-400 text-white"
                  >
                    <BiSearchAlt />
                  </button>
                </Form>
              </Formik>
              <div className="mt-3 flex flex-col gap-3">
                {findMssg ? (
                  <div className="text-red-400 text-xs">{findMssg}</div>
                ) : (
                  findedPeople.map((friend) => (
                    <Request friend={friend} key={friend._id} />
                  ))
                )}
              </div>
            </div>
            <div ref={request} className="hidden">
              {user.request.map((friend) => (
                <Request friend={friend} key={friend._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Chat;
