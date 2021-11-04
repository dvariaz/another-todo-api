const fs = require("fs");

const folderExists = (dir) => {
  try {
    const stat = fs.statSync(dir);
    return stat.isDirectory();
  } catch (err) {
    return false;
  }
};

module.exports = { folderExists };
