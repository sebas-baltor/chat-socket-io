import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/crear-cuenta" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
