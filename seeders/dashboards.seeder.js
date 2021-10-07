const mongoose = require("mongoose");
const faker = require("faker/locale/es_MX");
const { Seeder } = require("mongoose-data-seed");
const ObjectId = mongoose.Types.ObjectId;

// Models
const UserModel = require("../src/models/User");
const DashboardModel = require("../src/models/Dashboard");

// Utils
const { getRandomNumber, pickRandomElements } = require("../src/utils/random");

class DashboardsSeeder extends Seeder {
  async shouldRun() {
    return DashboardModel.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    const currentUsers = await UserModel.find({ fake: true });

    const dashboards = [];

    for (let i = 0; i < 5; i++) {
      const random_users = pickRandomElements(
        currentUsers,
        getRandomNumber(1, 5)
      );

      const title = faker.lorem.sentence();
      const description = faker.lorem.paragraph();
      const background_photo = faker.random.image();
      const shared_users = random_users.map((user) => new ObjectId(user._id));

      const [owner] = pickRandomElements(currentUsers, 1);
      const ownerId = new ObjectId(owner._id);

      dashboards.push({
        title,
        description,
        background_photo,
        shared_users,
        owner: ownerId,
        fake: true,
      });
    }

    return DashboardModel.create(dashboards);
  }
}

module.exports = DashboardsSeeder;
