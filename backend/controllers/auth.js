// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  if (req.session.username) {
    // Authenticated
    next();
  } else {
    // Not authenticated
    return res.status(401).send();
  }
};

export default auth;
