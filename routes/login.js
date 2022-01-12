const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../helpers/database');

module.exports = () => {
  // load login/register page
  router.get('/', (req, res) => {
    // check if user is logged in
    if (req.session.user_id) {
      res.redirect('/tasks');

    } else {
      let templateVars = {
        user: {id: undefined, name: null}
      };
      res.render('../views/login', templateVars);
    }
  });

  // logging in
  router.post('/', async (req, res) => {
    // query the database for the email input by user
    getUserByEmail(req.body.email)
      .then(user => {
        if (!user) {
          res.json({error: 'User does not exist'});

        } else {
          // check password
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.json({error: 'Password does not match'});

          } else {
            req.session = { user_id: user.id };
            res.redirect('/tasks');

          }
        }
      })
      .catch(err => {
        console.error('login error', err);
      });

  });

  // login after register

return router;
}
