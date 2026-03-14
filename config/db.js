const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("connect success");
  } catch (error) {
    console.log("connect error:", error);
  }
}

module.exports = { connect };
