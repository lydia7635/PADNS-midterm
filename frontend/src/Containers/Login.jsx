import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import services from "../Services";
import LoginBox from "../Components/LoginBox";

// eslint-disable-next-line react/prop-types
function Login({ setPage }) {
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
    setReadOnly(true);
    services.auth
      .login({ username, password })
      .then(() => {
        navigate("/chat");
      })
      .catch(() => {
        setReadOnly(false);
      });
  };

  useEffect(() => {
    setPage("Login");
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
}

export default Login;
