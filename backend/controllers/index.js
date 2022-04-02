/* eslint-disable import/prefer-default-export */
import bcrypt from "bcryptjs";
import { User } from "../models";

const saltRounds = 10;

const hashPassword = async (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
};

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

  r.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (
      typeof username === "string" &&
      typeof password === "string" &&
      username.trim().length !== 0 &&
      password.length !== 0
    ) {
      const trimmedUsername = username.trim();
      const hashedPassword = await hashPassword(password);

      // Check not duplicated user.
      const dupliUser = await User.findAll({
        where: {
          username: trimmedUsername,
        },
      });
      if (dupliUser.length !== 0) {
        res.status(409).send();
        return;
      }

      await User.create({
        username: trimmedUsername,
        password: hashedPassword,
      })
        .then(() => {
          res.status(201).send();
        })
        .catch(() => {
          res.status(500).send();
        });
    } else {
      // Either username or password is not string.
      res.status(406).send();
    }
  });
};

/**
 * @typedef {import('@types/express-serve-static-core').RequestHandler<
 *   import('@types/express-serve-static-core').RouteParameters<
 *     "users/:id"
 *   >, any, any, ParsedQs, Record<string, any>
 * >} userHandler
 */
