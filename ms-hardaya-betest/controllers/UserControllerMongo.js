const { getDB } = require("../config/connectMongo");
const redis = require('../config/connectRedis');

const { ObjectId } = require("mongodb");

const { hashPassword, comparePassword } = require("../helpers/bcrypt-password");
const User = require("../models");

const { createToken } = require("../helpers/json-web-token");

class UserControllerMongo {


  static async loginMethod(req, res, next) {

    let { userName, password } = req.body;

    if (!userName) {
      throw { name: "username_empty" };
    }

    if (!password) {
      throw { name: "password_empty" };
    }

    let findUser = await User.findByUserName(userName);

    if (!findUser) {
      throw { name: "invalid_username_password" };
    }

    const passwordValidation = comparePassword(password, findUser.password);

    if (!passwordValidation) {
      throw { name: "invalid_username_password" };
    }

    // bikin token nya
    let usernameFind = findUser.userName;
    const payload = {
      id: findUser._id,
      userName: usernameFind
    };


    const access_token = createToken(payload);

    res.status(200).json({ access_token });

  }


  static async getAllUserCached() {
    let userscached;
    try {
      const cachedUsers = await redis.get('redis_hardaya_betest/users');
      // console.log(cachedUsers, `<<clg1`);
      if (cachedUsers) {
        userscached = JSON.parse(cachedUsers);
        // console.log(userscached, `<<clg2`);

      } else {
        userscached = await User.findAll();
        // console.log(userscached, `<<clg3`);
        await redis.set('redis_hardaya_betest/users', JSON.stringify(userscached));
        // console.log(userscached, `<<clg4`);

      }

      // console.log(userscached, `<<clg5`);

      return userscached;
    } catch (error) {
      // console.log(error, `<< dari base cached`);
      next(error);
    }
  }


  static async addUserMethod(req, res, next) {
    try {
      let { userName, emailAddress, password } = req.body;
      if (!userName) {
        throw { name: "username_empty" };
      }
      if (!emailAddress) {
        throw { name: "email_empty" };
      }
      if (!password) {
        throw { name: "password_empty" };
      }

      let findUsername = await User.findByUserName(userName);

      if (findUsername) {
        throw { name: "username_unique" };
      }

      // just make assumsion they are same
      let myUUID = Math.floor(Math.random() * (100000000 - 1 + 1)) + 1;
      let identityNumber = myUUID;
      let accountNumber = myUUID;


      password = hashPassword(password);
      let createdData = await User.create({
        userName,
        emailAddress,
        password,
        identityNumber,
        accountNumber
      });
      // console.log(createdData);

      let redisKey = 'redis_hardaya_betest/users';
      await redis.del(redisKey);
      let users = await User.findAll();
      await redis.set(redisKey, JSON.stringify(users));


      res.status(201).json({
        // _id: createdData.insertedId,
        // userName,
        message: `user with username ${userName} has been created`
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }


  static async showAllUser(req, res, next) {

    try {
      const allUser = await UserControllerMongo.getAllUserCached();

      res.status(200).json(allUser);

    } catch (error) {
      next(error);
    }

  }

  static async showUserById(req, res, next) {


    try {

      const allUsers = await UserControllerMongo.getAllUserCached();
      const findUser = allUsers.find(user => user._id === req.params.id);
      if (!findUser) {
        throw { name: "user_not_found" };
      }
      res.status(200).json(findUser);


    } catch (error) {
      // console.log(error);
      next(error);
    }


  }


  static async showUserByIdentityNumber(req, res, next) {
    try {

      const allUsers = await UserControllerMongo.getAllUserCached();
      const findUser = allUsers.find(user => user.identityNumber === +req.params.identityNumber);
      if (!findUser) {
        throw { name: "user_not_found" };
      }
      res.status(200).json(findUser);


    } catch (error) {
      // console.log(error);
      next(error);
    }

  }


  static async showUserByAccountNumber(req, res, next) {

    try {

      const allUsers = await UserControllerMongo.getAllUserCached();
      const findUser = allUsers.find(user => user.accountNumber === +req.params.accountNumber);
      if (!findUser) {
        throw { name: "user_not_found" };
      }
      res.status(200).json(findUser);


    } catch (error) {
      // console.log(error);
      next(error);
    }

  }



  static async updateUserMethod(req, res, next) {
    try {
      let findUser = await User.findById(req.params.id);
      if (!findUser) {
        throw { name: "user_not_found" };
      }
      // console.log(findUser);

      if (req.body.identityNumber || req.body.accountNumber) {
        throw { name: "Unauthorized Activity" };
      }

      if (req.body.password || req.body.userName) {
        let bodyPassword = req.body.password;

        let password = hashPassword(bodyPassword);

        let bodyToUpdate = { $set: { ...req.body, password } };
        let updatedUser = await User.update({ _id: ObjectId(req.params.id) }, bodyToUpdate);

        let redisKey = 'redis_hardaya_betest/users';
        await redis.del(redisKey);
        let users = await User.findAll();
        await redis.set(redisKey, JSON.stringify(users));
        res.removeHeader('access_token');

        res.status(200).json({ message: `updated user account, please re login` });

      }

      else {

        let bodyToUpdate = { $set: { ...req.body } };

        let updatedUser = await User.update({ _id: ObjectId(req.params.id) }, bodyToUpdate);


        let redisKey = 'redis_hardaya_betest/users';
        await redis.del(redisKey);
        let users = await User.findAll();
        await redis.set(redisKey, JSON.stringify(users));

        res.status(200).json({ message: `updated user detail` });

      }


    } catch (error) {
      // console.log(error);
      next(error);
    }
  }



  static async deleteUserMethod(req, res, next) {
    try {
      let findUser = await User.findById(req.params.id);
      if (!findUser) {
        throw { name: "user_not_found" };
      }

      let deletedUser = await User.destroy(req.params.id);

      let redisKey = 'redis_hardaya_betest/users';
      await redis.del(redisKey);
      let users = await User.findAll();
      await redis.set(redisKey, JSON.stringify(users));

      res.removeHeader('access_token');
      res.status(200).json({ message: `success deleted user ${findUser.userName}, please create again / login to other account` });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = UserControllerMongo;