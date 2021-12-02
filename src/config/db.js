const mongoose = require("mongoose");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Database connected");
});

async function initDb() {
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function closeDb() {
  await mongoose.disconnect();
  console.log("Database disconnected");
}

module.exports = { initDb, closeDb, db };
