import express from "express";
import session from "express-session";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { apiRouter } from "./routes";

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 8000;
const { SESSION_SECRET } = process.env;
const oneDay = 1000 * 60 * 60 * 24;

if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable not set!");
}

const app = express();

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(express.json());
app.use(
  session({
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: oneDay,
    },
    // use random secret
    secret: SESSION_SECRET,
    name: "sessIndex", // don't omit this option
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api/v1", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
