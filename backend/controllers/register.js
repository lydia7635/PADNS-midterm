import bcrypt from "bcryptjs";
import { User } from "../models";

const saltRounds = 10;

const hashPassword = async (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
};

const register = async (req, res) => {
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
};

export default register;
