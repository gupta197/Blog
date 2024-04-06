const md5 = require('md5');
const { queryExecution, validatioReqBody, sendResponse } = require('../../commonFunction/commonFunction')

module.exports = {
  getLoginPage: async (req, res, next) => {
    let message = req.session.email ? "User register successfully. Please login!!" : "";
    if (message.length) {
      return res.redirect('/user');
    } else {
      return sendResponse(req, res, { page: 'login', pageTitle: 'Login' });
    }
  },

  postLoginPage: async (req, res) => {
    try {
      const { email, password } = req.body;
      let checkValidate = validatioReqBody(req, res, "login");
      if (checkValidate == true) {
        let query = `SELECT user_id, username, Password FROM users WHERE email = ?`;
        let rows = await queryExecution(query, [email]);
        if (rows.length >= 1) {
          let pass = md5(password);
          if (rows[0].Password == pass) {
            if (!req.session.username && !req.session.password) {
              req.session.email = email;
              req.session.user_id = rows[0].user_id;
              req.session.password = pass;
              req.session.name = rows[0].username;
              req.session.username = rows[0].username;
              req.session.save();
            }
            return res.redirect('/user/dashboard');
          } 
          return sendResponse(req, res, { page: 'login', pageTitle: 'Login', error: "Invalid credations!!" });
        }
        if (rows.length == 0) {
          return sendResponse(req, res, { page: 'login', pageTitle: 'Login', error: "Invalid credations!!" });
        }
      } else {
        return sendResponse(req, res, { page: 'login', pageTitle: 'Login', error: checkValidate });
      }
    } catch (error) {
      return sendResponse(req, res, { page: 'login', pageTitle: 'Login', error: "Something went wrong!!" });
    }
  },

  getRegisterPage: async (req, res) => {
    let message = req.session.email ? "User register successfully. Please login!!" : "";
    if (message.length) {
      return res.redirect('/user');
    } else {
      return sendResponse(req, res, { page: 'register', pageTitle: 'Register' });
    }

  },

  postRegisterPage: async (req, res) => {
    try {
      const { email, password, username } = req.body;
      let checkValidate = validatioReqBody(req, res, "register");
      if (checkValidate == true) {
        let query = `SELECT user_id, username FROM users WHERE email = ?`;
        let rows = await queryExecution(query, [email]);
        if (rows.length >= 1) {
          return sendResponse(req, res, { page: 'register', pageTitle: 'Register', error: "Email Already exists!"});
        }
        let pass = md5(password);
        query = `INSERT INTO users (username, email,password) VALUES (?,?,?)`;
        rows = await queryExecution(query , [username, email, pass ]);
        return sendResponse(req, res, { page: 'login', pageTitle: 'Login', message: "You have register successfully. Please login your self"});
      } else {
        return sendResponse(req, res, { page: 'register', pageTitle: 'Register', error: checkValidate});
      }
    } catch (error) {
      console.log("Error in register", error.message)
      return sendResponse(req, res, { page: 'register', pageTitle: 'Register', error: "Something went wrong!!" });
    }
  },
  logout: async (req, res) => {
    await req.session.destroy();
    return res.redirect('/')
  }
}