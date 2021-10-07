require("dotenv").config();
const morgan = require("morgan");
const express = require("express");

const { name, version } = require("../package.json");

//Controllers
const DatabaseController = require("./controllers/DatabaseController");
const UsersController = require("./controllers/UsersController");
const DashboardsController = require("./controllers/DashboardsController");
const TasksController = require("./controllers/TasksController");

// Models
require("./models/User");
require("./models/Task");
require("./models/Dashboard");
require("./models/TaskGroup");

const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.use("/users", UsersController);
app.use("/dashboards", DashboardsController);
app.use("/tasks", TasksController);

app.get("/", (req, res) => {
  return res.status(200).json({
    name,
    version,
  });
});

function main() {
  DatabaseController.initDb()
    .then((db) => {
      app.listen(process.env.PORT, () => {
        console.log(`Running on env: ${process.env.ENVIRONMENT}`);
        console.log(`Host: ${process.env.HOST}`);
        console.log(`Port: ${process.env.PORT}`);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

process.on("SIGINT", DatabaseController.closeDb);
process.on("SIGTERM", DatabaseController.closeDb);

main();
