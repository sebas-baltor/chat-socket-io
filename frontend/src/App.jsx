import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Chat from "./pages/Chat";
import { useSelector } from "react-redux";

function App() {
  const isLogued = Boolean(useSelector((state) => state.token));
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLogued ? <Chat /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isLogued ? <Login /> : <Navigate to="/" />} />
          <Route path="/crear-cuenta" element={!isLogued ? <CreateAccount />: <Navigate to="/"/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
