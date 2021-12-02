const mongoose = require("mongoose");

const mongoURL = process.env.MONGO_URL;

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
