const  Users  = require("../model/model");
const Role = require("../contants/Role")

class AdminController {
  // GET /admin/dashboard
  async dashboard(req, res) {
    try {
      const user = req.user;
      let admins = [];
      let users = [];

      //SUPERADMIN view all users
      if (user.role === Role.SuperAdmin) {
        const [admins, users] = await Promise.all([
          Users.find({ role: "admin" }),
          Users.find({ role: "user" }),
        ]);
        admins = admins;
        users = user;
      }
      if (user.role === Role.Admin) {
        admins = [user]; //admin can't query db, only view their own information
      }
      // req.user attached from auth.middleware
      res.status(200).json({
        admin: user,
        admins,
        users,
      });
    } catch (error) {
      
      res.status(500).send({ message: "admin dashboard error: " ,error: error.message });
    }
  }

  
}

module.exports = new AdminController();
