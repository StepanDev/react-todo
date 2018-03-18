const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');

const User = require('../models').User;

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config');
const secretKey = config[env].secretKey;

module.exports = {
  login,
  getUser,
  updateUser,
  logout,
};

async function login(req, res) {
  try {
    const user = req.user;
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, secretKey);

    let expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 7);
    res.cookie('jwt', token, { expires: expiresDate, httpOnly: true });
    res.send(user);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}

async function getUser(req, res) {
  res.send(req.user);
}

async function updateUser(req, res) {
  try {
    const user = req.user;
    const newUser = {
      name: req.body.name,
      email: req.body.email,
    };

    const updated = await user.update(newUser);

    res.send(updated);

  } catch (e) {
    console.error(e);
    res.status(HttpStatus.BAD_REQUEST)
      .end();
  }
}

function logout(req, res) {
  res.clearCookie('jwt');
  return res.end();
}
