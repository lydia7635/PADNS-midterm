/* eslint-disable react/prop-types */
import { ReactComponent as SendIcon } from "../../assets/icons/send.svg";

const CommentForm = ({
  avatar,
  message,
  setMessage,
  handleFormSubmit,
  handleEnterKey,
  inputMessageRef,
}) => {
  return (
    <>
      <div className="bg-slate-600 fixed bottom-0 z-10 h-28 w-full flex justify-start">
        <div className="w-28 flex items-center justify-center">
          <img
            className="absolute object-cover h-20 w-20 rounded-full"
            src={avatar}
            alt="default avatar"
          ></img>
        </div>
        <div className="flex flex-col w-[calc(100%-10rem)]">
          <textarea
            className="rounded-md my-2 p-1 h-full resize-none scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-800 placeholder:text-slate-600 bg-slate-400 text-slate-900 focus:outline outline-slate-800 outline-2"
            name="message"
            placeholder="messages..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleEnterKey}
            ref={inputMessageRef}
          />
        </div>
        <div className="w-16 my-5 mr-2 flex items-center justify-center">
          <SendIcon
            className="h-12 w-12 p-1.5 rounded-full cursor-pointer hover:stroke-slate-100 hover:bg-slate-500"
            onClick={handleFormSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default CommentForm;
