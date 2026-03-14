const mongoose = require("mongoose");

/* ================= USER SCHEMA ================= */
const userSchema = new mongoose.Schema(
  {
    sdt: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },

    facebookId: {
      type: String,
      unique: true,
      sparse: true,
    },

    provider: {
      type: String,
      enum: ["local", "facebook"],
      default: "local",
    },

    // 🔥 ROLE PHÂN QUYỀN
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },

    // ⚠️ GIỮ LẠI để KHÔNG PHÁ CODE CŨ
    admin: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    accessToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);


module.exports = mongoose.model("User", userSchema)