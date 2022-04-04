/* eslint-disable import/prefer-default-export */
import auth from "./auth";
import register from "./register";
import login from "./login";
import logout from "./logout";
import { getMessages, createMessage, deleteMessage } from "./message";

/** @param {import('express').Router} r */
export const setupUserController = (r) => {
  r.get("/csrf", function setCsrfCookie(req, res) {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.status(204).send();
  });

  r.post("/register", register);

  r.post("/login", login);

  r.post("/logout", auth, logout);

  r.get("/messages", getMessages);

  r.post("/message", auth, createMessage);

  r.delete("/message", auth, deleteMessage);
};

/**
 * @typedef {import('@types/express-serve-static-core').RequestHandler<
 *   import('@types/express-serve-static-core').RouteParameters<
 *     "users/:id"
 *   >, any, any, ParsedQs, Record<string, any>
 * >} userHandler
 */
