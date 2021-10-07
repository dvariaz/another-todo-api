const mongoose = require("mongoose");

const mongoURL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}?authSource=admin&appname=Todo%20API&ssl=false`;

// Seeders
const Users = require("./seeders/users.seeder");
const Dashboards = require("./seeders/dashboards.seeder");
const Tasks = require("./seeders/tasks.seeder");

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
const seedersList = {
  Users,
  Dashboards,
  Tasks,
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
const connect = async () =>
  await mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
const dropdb = async () => {
  return mongoose.connection.dropDatabase();
};

module.exports = {
  seedersList,
  connect,
  dropdb,
};
