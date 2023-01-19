const { ObjectId } = require("mongodb");
const { getDB } = require("../config/connectMongo");
// https://www.mongodb.com/docs/manual/reference/operator/projection/positional/
// https://stackoverflow.com/questions/47732061/node-js-mongodb-find-with-projection-to-exclude-id-still-returns-it
// bikin kayak mirip sequelize
class User {
  static user() {
    const users = getDB().collection("Users");
    users.createIndex({ _id: 1, userName: 1, accountNumber: 1, emailAddress: 1, identityNumber: 1 }, { unique: true });
    return users;
  }
  static findById(id) {
    return this.user().findOne({ _id: ObjectId(id) },
      { projection: { password: 0 } }
    );
  }

  static findAll() {
    return this.user()
      .find({}, { projection: { password: 0 } })
      .toArray();
  }
  static create(user) {
    return this.user().insertOne(user);
  }


  static findByIdentityNumber(identityNumber) {
    return this.user().findOne(
      {
        identityNumber: identityNumber,
      },
      { projection: { password: 0 } }
    );
  }

  static findByUserName(userName) {
    return this.user().findOne(
      {
        userName: userName,
      },
      // { projection: { password: 0 } }
    );
  }

  static findByAccountNumber(accountNumber) {
    return this.user().findOne(
      {
        accountNumber: accountNumber,
      },
      { projection: { password: 0 } }
    );
  }

  static update(filter, update) {
    return this.user().updateOne(filter, update);
  };

  static destroy(id) {
    return this.user().deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = User;