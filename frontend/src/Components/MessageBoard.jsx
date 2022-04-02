/* eslint-disable react/prop-types */

import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { Fragment } from "react";
import moment from "moment";

const multipleLines = (text) =>
  text.split("\n").map((e, index) => (
    <Fragment key={index}>
      {e}
      <br />
    </Fragment>
  ));

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const MessageBoard = ({ comments, commentsFooter }) => {
  return (
    <>
      <div className="pt-2 flex flex-col col-auto items-center">
        {comments.length === 0 ? (
          <div className="text-xl">一片風平浪靜……</div>
        ) : (
          comments.map((comment) => (
            <div
              key={`${comment.id}`}
              className="bg-slate-800 m-2 rounded-lg p-2 w-4/5 flex"
            >
              <div className="w-24 flex flex-col justify-center whitespace-nowrap items-center mr-2">
                <img
                  className="object-cover h-16 w-16 rounded-full"
                  src={comment.avatar}
                  alt="default avatar"
                ></img>
                <div className="text-center align-middle mt-1 w-full overflow-hidden text-ellipsis">
                  {comment.name}
                </div>
              </div>
              <div className="relative w-5/6 p-1">
                <div className="p-1 mb-8 break-words">
                  {multipleLines(comment.message)}
                </div>
                <div className="absolute right-0 bottom-0 h-8 text-right flex flex-row items-center">
                  {moment(comment.timestamp).format("YYYY/MM/DD HH:mm:ss")}
                  <DeleteIcon
                    className={classNames(
                      true ? "" : "invisible",
                      "h-8 w-8 m-1 p-1 cursor-pointer hover:stroke-red-600 hover:bg-slate-600 hover:rounded-full"
                    )}
                  />
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={commentsFooter} />
      </div>
    </>
  );
};

export default MessageBoard;
