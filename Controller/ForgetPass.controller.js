const Users = require("../model/model");

class ForgetPass {
  // FORGET PASSWORD
  static async resetPassword(req, res) {
    try {
      const { email, sdt, newPassword } = req.body;

      if (!email || !sdt || !newPassword) {
        return res.status(400).send({ message: "Thiếu dữ liệu" });
      }

      const user = await Users.findOne({ email, sdt });
      if (!user) {
        return res
          .status(404)
          .send({ message: "Email hoặc SĐT không tồn tại" });
      }

      user.password = newPassword;
      await user.save();
      return res.json({ message: "Đổi mật khẩu thành công" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Lỗi server" });
    }
  }
}

module.exports = ForgetPass;
