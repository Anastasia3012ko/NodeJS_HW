export function checkPasswordChange(req, res, next) {
  const user = req.user;
  if (user?.mustChangePassword) {
    return res.status(403).json({
      message: 'Change your password',
      redirect: '/change-password'
    });
  }
  next();
}