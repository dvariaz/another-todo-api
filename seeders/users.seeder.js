const fs = require("fs").promises;
const path = require("path");
const { folderExists } = require("../src/utils/fs");
const { Seeder } = require("mongoose-data-seed");
const faker = require("faker/locale/es_MX");
const bcrypt = require("bcrypt");

// Models
const UserModel = require("../src/models/User.js");

class UsersSeeder extends Seeder {
  async shouldRun() {
    return UserModel.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    const passwordsDict = {};

    const users = [];

    for (let i = 0; i < 10; i++) {
      const name = faker.name.findName();
      const email = faker.internet.email();
      const password = faker.internet.userName();
      const profile_photo = faker.internet.avatar();
      const role = Math.random() > 0.5 ? "ADMIN_ROLE" : "USER_ROLE";

      const encryptedPassword = await bcrypt.hash(password, 15);

      passwordsDict[email] = password;

      users.push({
        name,
        email,
        password: encryptedPassword,
        profile_photo,
        role,
        fake: true,
      });
    }

    if (!folderExists(path.resolve(__dirname, "output"))) {
      await fs.mkdir("output");
    }
    const passwordsFilePath = path.resolve("output/passwords.json");
    await fs.writeFile(
      passwordsFilePath,
      JSON.stringify(passwordsDict, null, "\t")
    );

    return UserModel.create(users);
  }
}

module.exports = UsersSeeder;
