const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserByEmail, addUser } = require('../helpers/database');

module.exports = () => {
 // register GET
  router.get('/', (req, res) => {
    res.redirect('/login');
  })

  // register POST
  router.post('/', async (req, res) => {
    const input = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    const user = await getUserByEmail(input.email);
    if (user) {
      res.redirect('/login');
    } else {
      const addingUser = await addUser(input);
      req.session = { user_id: addingUser.id };
      res.redirect('/tasks');
    }

  });

  return router;
}
