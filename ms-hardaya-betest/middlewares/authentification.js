const User = require('../models');

const { verifyToken } = require('../helpers/json-web-token');

async function authentification(req, res, next) {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) {
      throw { name: `Unauthorized Activity` };
    } else {
      let payload = verifyToken(access_token);
      // console.log(payload, `<< nih paylod`);
      let userLogged = await User.findById(payload.id);
      // console.log(userLogged, "<< nih userlogged");
      if (!userLogged) {
        throw { name: `Unauthorized Activity` };
      } else {
        req.userLogged = {
          id: userLogged._id,
          username: userLogged.username,
        };
        next();
      }
    }

  } catch (error) {
    // console.log(error, `<< eror authc`);
    next(error);
  }
}

module.exports = authentification;