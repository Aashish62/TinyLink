export const validateUrl = (req, res, next) => {
  const { code } = req.body;
  const regex = /^[A-Za-z0-9_-]{3,30}$/;

  if (!regex.test(code)) {
    return res.status(400).json({ message: "Invalid code format" });
  }

  next();
};