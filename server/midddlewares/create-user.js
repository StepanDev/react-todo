const HttpStatus = require('http-status-codes');
const User = require('../models').User;

module.exports = async function (req, res, next) {
  try {
    const newUser = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    };

    const isUnUniqueLogin = await User.count({ where: { email: newUser.email } });
    if (isUnUniqueLogin) {
      console.error(`Duplicate login ${JSON.stringify(newUser)}`);

      // TODO status code for duplicate email
      return res.status(HttpStatus.BAD_REQUEST).end();
    }

    req.user = await User.create(newUser);
    return next();
  } catch (e) {
    console.error(e);
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
};
