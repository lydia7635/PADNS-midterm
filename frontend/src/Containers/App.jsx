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
import { Route, Routes, useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/img/default-avatar.png";

function App() {
  const navigate = useNavigate();
  const saveUsername = sessionStorage.getItem("username");
  const saveAvatar = sessionStorage.getItem("avatar");
  const [page, setPage] = useState("About");
  const visitors = NaN;
  const [isLogin, setIsLogin] = useState(saveUsername ? true : false);
  const [username, setUsername] = useState(saveUsername || "");
  const [avatar, setAvatar] = useState(saveAvatar || defaultAvatar);

  const logout = () => {
    services.auth
      .logout()
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        alert("You are not logged in.");
        navigate("/login");
      })
      .finally(() => {
        setIsLogin(false);
        setUsername("");
        sessionStorage.clear();
      });
  };

  useEffect(() => {
    services.auth.getCsrf();
  }, []);

  return (
    <>
      <Navbar
        page={page}
        visitors={visitors}
        isLogin={isLogin}
        username={username}
        logout={logout}
      />
      <div className="mt-16">
        <Routes>
          <Route exact path="/" element={<About setPage={setPage} />} />
          <Route
            exact
            path="/chat"
            element={
              <Chat
                username={username}
                avatar={avatar}
                setPage={setPage}
                isLogin={isLogin}
              />
            }
          />
          <Route
            exact
            path="/login"
            element={
              <Login
                setPage={setPage}
                setIsLogin={setIsLogin}
                setUsername={setUsername}
                setAvatar={setAvatar}
              />
            }
          />
          <Route
            exact
            path="/register"
            element={<Register setPage={setPage} />}
          />
          <Route path="*" element={<NotFound setPage={setPage} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
