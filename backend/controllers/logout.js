const logout = async (req, res) => {
  req.session.destroy();
  res.status(204).send();
};

export default logout;
