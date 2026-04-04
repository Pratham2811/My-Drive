export function authorize(requiredPermission) {
  return (req, res, next) => {
    const permissions = req.user?.permissions;

    if (!permissions) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    if (!permissions.includes(requiredPermission)) {
      return res.status(403).json({
        message: `Missing permission: ${requiredPermission}`,
      });
    }

    next();
  };
}
