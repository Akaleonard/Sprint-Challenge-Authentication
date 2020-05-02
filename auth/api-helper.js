const db = require("../database/dbConfig");

function addUser(user) {
  return db("users")
    .insert(user)
    .then((res) => {
      return { id: res[0] };
    });
}

function findBy(id) {
  return db("users").where({ id }).first();
}

module.exports = {
  addUser,
  findBy,
};
