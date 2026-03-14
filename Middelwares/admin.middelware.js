const Role = require("../contants/Role")


const verifyAdmin = (req, res, next) => {
  console.log("USER:", req.user);
  console.log("role từ token:", req.user?.role);

  if (!req.user) {
    return res.status(401).json({ message: "you're not authenticated" });
  }

  if (req.user.role === Role.SuperAdmin) {
    return res.json({ message: "bạn là superadmin" });
   // return next();
  } else if (req.user.role === Role.Admin) {
    return res.json({message: "bạn là admin"})
  } else if (req.user.role === Role.User) {
    return res.json({message: "bạn là user"})
  }

  return res.status(403).json({ message: "you're not allowed" });
};

module.exports = verifyAdmin;
