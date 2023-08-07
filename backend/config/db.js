const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((x) => {
      console.log(`MongoDB Connected`.cyan.underline.bold);
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`.red);
      process.exit(1);
    });
};

module.exports = connectDB;
