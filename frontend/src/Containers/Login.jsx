import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import services from "../Services";
import LoginBox from "../Components/LoginBox";

// eslint-disable-next-line react/prop-types
const Login = ({ setPage, setIsLogin, setUsername }) => {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState({
    username: "",
    password: "",
  });
  const [readOnly, setReadOnly] = useState(false);
  const { username, password } = textInput;

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleTextInputChange = ({ target: { name, value } }) => {
    setTextInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (username.trim().length === 0) {
      alert("Username cannot be empty string or contain only spaces.");
      return;
    }
    if (password.length === 0) {
      alert("Password cannot be empty string.");
      return;
    }

    setReadOnly(true);
    services.auth
      .login({ username, password })
      .then((res) => {
        setIsLogin(true);
        setUsername(res.data.username);
        sessionStorage.setItem("username", res.data.username);
        navigate("/chat");
      })
      .catch(() => {
        alert("Login failed.");
        setReadOnly(false);
      });
  };

  useEffect(() => {
    setPage("Login");
  }, []);

  useEffect(() => {
    services.auth.getCsrf();
  }, []);

  return (
    <LoginBox
      username={username}
      password={password}
      readOnly={readOnly}
      handleTextInputChange={handleTextInputChange}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default Login;
