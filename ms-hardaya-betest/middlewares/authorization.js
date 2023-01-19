const User = require("../models");
const { ObjectId } = require("mongodb");

// Sumber referensi akses req method :

/*
https://www.digitalocean.com/community/tutorials/nodejs-req-object-in-expressjs
*/


async function authorization(req, res, next) {
  try {

    if (req.method === "DELETE" || req.method === "PUT") {
      let userToManipulate = await User.findById(req.params.id);
      if (!userToManipulate) {
        throw { name: `user_not_found` };

      } else if (req.userLogged.id.toString() === userToManipulate._id.toString()) {
        next();
      }
      else {
        throw { name: `forbidden to access` };
      }
    }


  } catch (error) {
    // console.log(error, ` << error autz`);
    next(error);
  }
}

module.exports = authorization;