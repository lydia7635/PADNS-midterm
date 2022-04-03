import bcrypt from "bcryptjs";
import { User } from "../models";

const login = async (req, res) => {
  const { username, password } = req.body;
  if (
    typeof username === "string" &&
    typeof password === "string" &&
    username.trim().length !== 0 &&
    password.length !== 0
  ) {
    const trimmedUsername = username.trim();

    // Check not duplicated user.
    await User.findOne({
      where: {
        username: trimmedUsername,
      },
    })
      .then((existedUser) => {
        // Check password
        if (bcrypt.compareSync(password, existedUser.password)) {
          req.session.username = trimmedUsername;
          res.status(202).json({ username: trimmedUsername }).send();
        } else {
          res.status(403).send();
        }
      })
      .catch(() => {
        res.status(403).send();
      });
  } else {
    // Either username or password is not string.
    res.status(406).send();
  }
};

export default login;
