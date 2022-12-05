const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { name, version } = require("../package.json");

// Config
const Database = require("./config/db");
require("./config/auth");

// Controllers
const AuthController = require("./controllers/AuthController");
const UsersController = require("./controllers/UsersController");
const DashboardsController = require("./controllers/DashboardsController");
const TaskGroupsController = require("./controllers/TaskGroupsController");
const TasksController = require("./controllers/TasksController");

// Middlewares
const errorHandler = require("./middlewares/error-handler");

// Models
require("./models/User");
require("./models/Task");
require("./models/Dashboard");
require("./models/TaskGroup");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(cors());

app.use("/api/auth", AuthController);
app.use("/api/users", UsersController);
app.use("/api/dashboards", DashboardsController);
app.use("/api/task-groups", TaskGroupsController);
app.use("/api/tasks", TasksController);

app.use(errorHandler);

app.get("/", (req, res) => {
  return res.status(200).json({
    name,
    version,
  });
});

function main() {
  Database.initDb()
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

process.on("SIGINT", Database.closeDb);
process.on("SIGTERM", Database.closeDb);

main();
