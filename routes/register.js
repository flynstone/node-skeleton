const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2"],
  maxAge: 24 * 60 * 60 * 1000
}));

const generateRandomString = () => {
  return Math.random().toString(36).substr(2, 6);
}

const emailExists = (email, password, users) => {
  if (!email || !password) { 
    return false;
  }

  for (let user in users) {
    if (users[user].email === email) {
      return true;
    }
  }
  return false;
}


module.exports = () => {
 // register GET
  router.get('/', (req, res) => {
    const userId = req.session.user_id;
    const templateVars = {
      user: users[userId],
    }
    res.render("register", templateVars);
  });

  // register POST
  router.post('/register', async (req, res) => {
    const registeredUser = emailExists(req.body.email, req.body.password, users);

    if (registeredUser) {
      res.send(401);
    }
  
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    let userId = generateRandomString();
  
    users[userId] = {
      id: userId,
      email: req.body.email,
      hashedPassword: hashedPassword
    };
  
    req.session.user_id = userId;
    res.redirect("/urls");
  });

  return router;
}
