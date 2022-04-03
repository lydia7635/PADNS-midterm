import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import { blobToBase64 } from "base64-blob";

import services from "../Services";
import RegisterBox from "../Components/RegisterBox";
import defaultAvatar from "../../assets/img/default-avatar.png";

// Ref: https://happyjayxin.medium.com/javascript-%E4%B8%8A%E5%82%B3%E5%9C%96%E7%89%87%E4%B8%A6%E5%A3%93%E7%B8%AE-9747942e4f56
const compressFile = async (blob) => {
  return new Promise((resolve, reject) => {
    new Compressor(blob, {
      maxHeight: 64,
      maxWidth: 64,
      success: resolve,
      error: reject,
    });
  }).catch((err) => {
    console.error("Compress error: ", err.message);
  });
};

// eslint-disable-next-line react/prop-types
function Register({ setPage }) {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState({
    username: "",
    password: "",
  });
  const [readOnly, setReadOnly] = useState(false);
  const { username, password } = textInput;
  const [preview, setPreview] = useState(defaultAvatar);

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  const handleTextInputChange = ({ target: { name, value } }) => {
    setTextInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (username.trim().length === 0) {
      alert("Username cannot be empty string or contain only spaces.");
      return;
    }
    if (password.length === 0) {
      alert("Password cannot be empty string.");
      return;
    }

    // get blob from objectURL
    const avatar = await fetch(preview).then((r) => r.blob());
    const avatarB64 = await blobToBase64(await compressFile(avatar));

    setReadOnly(true);
    services.auth
      .register({ username, password, avatar: avatarB64 })
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

  const handleImageChange = async ({ target: { files } }) => {
    if (files && files[0]) {
      const newAvatar = await compressFile(files[0]);
      setPreview(URL.createObjectURL(newAvatar));
    }
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
      preview={preview}
      readOnly={readOnly}
      handleTextInputChange={handleTextInputChange}
      handleFormSubmit={handleFormSubmit}
      handleAvatarChange={handleImageChange}
    />
  );
}

export default Register;
