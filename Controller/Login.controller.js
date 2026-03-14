const Users = require("../model/model");
const jwt = require("jsonwebtoken");

class Login {
  // REGISTER
  CreateUser = async (req, res) => {
    const { sdt, username, email, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Thiếu username hoặc password" });
    }

    try {
      await Users.create({
        sdt,
        username,
        email,
        password,
        provider: "local",
      });

      return res.json({ message: "Đăng ký thành công" });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({
          message: "Username hoặc email đã tồn tại",
        });
      }

      return res.status(500).json({
        message: "Lỗi khi đăng ký",
        error: err.message,
      });
    }
  };

  generateAccessToken(user) {
    return jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.MY_SECRECT_KEY,
      { expiresIn: "1d" },
    );
  }
   
  generateRefreshToken(user) {
    return jwt.sign(
        {id: user._id,
         role: user.role,
        },
        process.env.MY_SECRECT_KEY,
        { expiresIn: "365d"}
    )
  }

  // LOGIN
  LoginUser = async (req, res) => {
    try {
      const user = await Users.findOne({ username: req.body.username });

      if (!user) {
        return res.json({ message: "username không tồn tại" });
      }

      if (user.password !== req.body.password) {
        return res.json({ message: "mật khẩu không đúng" });
      }

      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);


      user.accessToken = accessToken;
      await user.save();

      res.cookie("refreshToken", refreshToken , {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/"
      });
      const { password, ...others} = user._doc;
      return res.status(200).json({
        ...others,
        accessToken,
      })

     
    } catch (err) {
      return res.status(500).json({ message: "lỗi server" });
    }
  };

   refreshToken = (req, res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({message: "you're not authorized"})
    }
    jwt.verify(refreshToken, process.env.MY_SECRECT_KEY, (err,user)=>{
        if(err){
            return res.status(403).json({message: "refreshToken is not valid"})
        }

        const newAccessToken = this.generateAccessToken(user);
        const newRefreshToken = this.generateRefreshToken(user);

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/"
        })
        return res.status(200).json({
           accessToken: newAccessToken,
        });
    });
    
   }
}

module.exports = new Login();
