const mongoose = require("mongoose");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Database connected");
});

async function initDb() {
  return mongoose.connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}?authSource=admin&appname=Todo%20API&ssl=false`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
}

async function closeDb() {
  await mongoose.disconnect();
  console.log("Database disconnected");
}

module.exports = { initDb, closeDb, db };
