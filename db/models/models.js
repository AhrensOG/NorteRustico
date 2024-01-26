const connection = require("../index");
const User = require("./user");

(async () => {
  try {
    await connection.sync({ alter: true });
  } catch (error) {
    console.log(error);
  }
})();

module.exports = {
  User,
};
