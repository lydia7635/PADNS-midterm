/* eslint-disable import/prefer-default-export */
import { User } from "../models";
import auth from "./auth";
import register from "./register";
import login from "./login";
import logout from "./logout";

/** @param {import('express').Router} r */
export const setupUserController = (r) => {
  r.get("/users", function getAll(req, res, next) {
    User.findAll({
      order: ["id"],
    })
      .then((instance) => res.status(200).send(instance))
      .catch(next);
  });

  r.get("/users/:id", function getOne(req, res, next) {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((instance) => res.status(200).send(instance))
      .catch(next);
  });

  r.patch("/users/:id", function patch(req, res, next) {
    const { username } = req.body;
    if (typeof username === "string") {
      User.update(
        { username },
        {
          where: {
            id: req.params.id,
          },
        }
      )
        .then(() => {
          res.status(204).send();
        })
        .catch(next);
    } else {
      next();
    }
  });

  r.get("/csrf", function setCsrfCookie(req, res) {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.status(204).send();
  });

  r.post("/register", register);

  r.post("/login", login);

  r.post("/logout", auth, logout);
};

/**
 * @typedef {import('@types/express-serve-static-core').RequestHandler<
 *   import('@types/express-serve-static-core').RouteParameters<
 *     "users/:id"
 *   >, any, any, ParsedQs, Record<string, any>
 * >} userHandler
 */
