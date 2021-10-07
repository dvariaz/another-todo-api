const mongoose = require("mongoose");
const faker = require("faker/locale/es_MX");
const { Seeder } = require("mongoose-data-seed");
const ObjectId = mongoose.Types.ObjectId;

// Models
const DashboardModel = require("../src/models/Dashboard");
const TaskModel = require("../src/models/Task");
const TaskGroupModel = require("../src/models/TaskGroup");

// Utils
const {
  pickRandomElements,
  getRandomNumber,
  getRandomChunks,
} = require("../src/utils/random");

class TasksSeeder extends Seeder {
  async shouldRun() {
    return TaskModel.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    const currentDashboards = await DashboardModel.find({ fake: true });

    // Final tasks and groups to populate their respective collections
    let tasks = [];
    const taskGroups = [];

    // Dashboard iterator
    for (let dashboardCount = 0; dashboardCount < 5; dashboardCount++) {
      const [randomDashboard] = pickRandomElements(currentDashboards, 1);
      const dashboardId = new ObjectId(randomDashboard._id);

      const dashboardTasks = [];
      const tasksLimit = getRandomNumber(1, 10); // Tasks count per dashboard

      for (let taskCount = 0; taskCount < tasksLimit; taskCount++) {
        // We extract a random number of users from the dashboard
        const usersCount = getRandomNumber(
          1,
          randomDashboard.shared_users.length
        );
        const randomUsers = pickRandomElements(
          randomDashboard.shared_users,
          usersCount
        );

        const title = faker.lorem.sentence();
        const description = faker.lorem.paragraph();
        const shared_users = randomUsers.map((user) => new ObjectId(user._id));
        const [owner] = shared_users; // We select the first random user as the task owner

        dashboardTasks.push({
          _id: new ObjectId(),
          title,
          description,
          shared_users: shared_users.slice(1),
          created_by: owner,
          fake: true,
        });
      }

      tasks = [...tasks, ...dashboardTasks];

      //We split all tasks into random groups (chunks)
      const groups = getRandomChunks(
        dashboardTasks.map((task) => task._id),
        {
          minChunkSize: 2,
          maxChunkSize: 5,
        }
      );

      const taskGroupLimit = groups.length; // The number of chunks is the number of groups

      for (let taskGroup = 0; taskGroup < taskGroupLimit; taskGroup++) {
        const name = faker.lorem.sentences(getRandomNumber(1, 3));
        const tasks = groups[taskGroup];

        taskGroups.push({
          name,
          dashboard: dashboardId,
          tasks,
          position: taskGroup,
        });
      }
    }

    await TaskGroupModel.create(taskGroups);
    return TaskModel.create(tasks);
  }
}

module.exports = TasksSeeder;
