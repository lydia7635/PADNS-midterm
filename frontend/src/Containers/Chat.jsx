/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import MessageBoard from "../Components/MessageBoard";
import CommentForm from "../Components/CommentForm";

const Chat = ({ setPage, isLogin, username, avatar }) => {
  const commentsFooter = useRef(null);
  const inputMessageRef = useRef(null);
  const [textInput, setTextInput] = useState({
    message: "",
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
    }));
    event.preventDefault();
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
            avatar={avatar}
            textInput={textInput}
            handleTextInputChange={handleTextInputChange}
            handleFormSubmit={handleFormSubmit}
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
