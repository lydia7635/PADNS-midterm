/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import MessageBoard from "../Components/MessageBoard";
import CommentForm from "../Components/CommentForm";
import defaultAvatar from "../../assets/img/default-avatar.png";

const Chat = ({ setPage, isLogin, username }) => {
  const commentsFooter = useRef(null);
  const inputMessageRef = useRef(null);
  const [textInput, setTextInput] = useState({
    message: "",
    avatar: defaultAvatar,
  });
  const [comments, setComments] = useState(
    /** @type {{name: string, message: string, timestamp}[]} */ ([])
  );

  const handleTextInputChange = ({ target: { name, value } }) => {
    setTextInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    setComments((prev) => [
      ...prev,
      {
        ...textInput,
        name: username ? username : "匿名",
        timestamp: new Date(),
        id: uuidv4(),
      },
    ]);
    setTextInput((prev) => ({
      ...prev,
      message: "",
      avatar: defaultAvatar,
    }));
    event.preventDefault();
  };

  const handleImageChange = ({ target: { files } }) => {
    if (files && files[0]) {
      const newAvatar = files[0];
      setTextInput((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(newAvatar),
      }));
    }
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleFormSubmit(event);
    }
  };

  useEffect(() => {
    setPage("Chat");
  }, []);

  useEffect(() => {
    if (isLogin) {
      inputMessageRef.current.focus();
    }
  }, []);

  const scrollToBottom = () => {
    commentsFooter.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <>
      <div className="mb-32">
        <MessageBoard comments={comments} commentsFooter={commentsFooter} />
        {isLogin ? (
          <CommentForm
            textInput={textInput}
            handleTextInputChange={handleTextInputChange}
            handleFormSubmit={handleFormSubmit}
            handleImageChange={handleImageChange}
            handleEnterKey={handleEnterKey}
            inputMessageRef={inputMessageRef}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Chat;
