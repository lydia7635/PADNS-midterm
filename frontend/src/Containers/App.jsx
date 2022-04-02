import Navbar from "../Components/Navbar";
import About from "../Components/About";
import NotFound from "../Components/NotFound";
import Chat from "./Chat";
import Login from "./Login";
import Register from "./Register";
import services from "../Services";
// import Login from "./components/Login";
// import Home from "./components/Home";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [page, setPage] = useState("About");
  const visitors = NaN;
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    services.auth.getCsrf();
  }, []);

  return (
    <>
      <Navbar page={page} visitors={visitors} isLogin={isLogin} />
      <div className="mt-16">
        <Routes>
          <Route exact path="/" element={<About setPage={setPage} />} />
          <Route exact path="/chat" element={<Chat setPage={setPage} />} />
          <Route exact path="/login" element={<Login setPage={setPage} />} />
          <Route
            exact
            path="/register"
            element={<Register setPage={setPage} />}
          />
          <Route path="*" element={<NotFound setPage={setPage} />} />{" "}
        </Routes>
      </div>
    </>
  );
}

export default App;
