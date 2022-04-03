/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import MessageBoard from "../Components/MessageBoard";
import CommentForm from "../Components/CommentForm";
import services from "../Services";

const Chat = ({ username, avatar, setPage, isLogin }) => {
  const commentsFooter = useRef(null);
  const inputMessageRef = useRef(null);
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    services.chat
      .createMessage({ message })
      .then(() => {
        setMessage("");
      })
      .catch(() => {
        alert("Failed to send message.");
      })
      .finally(() => {
        getMessages();
      });
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleFormSubmit(event);
    }
  };

  const getMessages = () => {
    services.chat.getMessages().then((res) => {
      setComments(res.data.messages);
    });
  };

  useEffect(() => {
    setPage("Chat");
  }, []);

  useEffect(() => {
    services.auth.getCsrf();
  }, []);

  useEffect(() => {
    if (isLogin) {
      inputMessageRef.current.focus();
    }
  }, []);

  useEffect(() => {
    getMessages();
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
        <MessageBoard
          username={username}
          comments={comments}
          commentsFooter={commentsFooter}
        />
        {isLogin ? (
          <CommentForm
            avatar={avatar}
            message={message}
            setMessage={setMessage}
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
