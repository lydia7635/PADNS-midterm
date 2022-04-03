import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import services from "../Services";
import RegisterBox from "../Components/RegisterBox";

// eslint-disable-next-line react/prop-types
function Register({ setPage }) {
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
      .register({ username, password })
      .then(() => {
        navigate("/login");
      })
      .catch((e) => {
        if (e.response.status === 409) {
          alert("Duplicated username.");
        } else {
          alert("Register failed.");
        }
        setReadOnly(false);
      });
  };

  useEffect(() => {
    setPage("Register");
  }, []);

  useEffect(() => {
    services.auth.getCsrf();
  }, []);

  return (
    <RegisterBox
      username={username}
      password={password}
      readOnly={readOnly}
      handleTextInputChange={handleTextInputChange}
      handleFormSubmit={handleFormSubmit}
    />
  );
}

export default Register;
