var md5 = require('md5');
const { queryExecution, validatioReqBody, sendResponse } = require('../../commonFunction/commonFunction')

module.exports = {

  changePassword: async (req, res) => {
    try {
      let { currentPassword, newPassword } = req.body;
      let checkValidate = validatioReqBody(req, res, "changePassword");
      if (checkValidate == true) {
        currentPassword = md5(currentPassword)
        newPassword = md5(newPassword);
        if (currentPassword == req.session.password) {
          let query = `UPDATE users SET password = ? WHERE email = ?`;
          await queryExecution(query, [newPassword, req.session.email]);
          req.session.password = newPassword;
          req.session.save();
          return sendResponse(req, res, { page: 'userHome', pageTitle: 'profile', message: "Password Updated Successfully!!" });
        }
        return sendResponse(req, res, { page: 'userHome', pageTitle: 'profile', error: "Current Password is not matched!!" });
      }
      return sendResponse(req, res, { page: 'userHome', pageTitle: 'profile', error: checkValidate });
    } catch (error) {
      return sendResponse(req, res, { page: 'userHome', pageTitle: 'profile', error: "Something went Wrong!!" });
    }

  },

  updateUserName: async (req, res) => {
    try {
      let { newName } = req.body;
      let checkValidate = validatioReqBody(req, res, "updateUserName");
      if (checkValidate == true) {
        if (newName !== req.session.username) {
          let query = `UPDATE users SET username = ? WHERE email = ?`;
          await queryExecution(query, [newName, req.session.email]);
          req.session.username = newName;
          req.session.save();
          return sendResponse(req, res, { page: 'userHome', pageTitle: 'profile', message: "User Name Update Successfully" });
        }
        return sendResponse(req, res, { page: 'userHome', pageTitle: 'profile', error: "Current UserName Should not be Same as previous name" });
      }
      return sendResponse(req, res, { page: 'userHome', pageTitle: 'profile', error: checkValidate });
    } catch (error) {
      return sendResponse(req, res, { page: 'userHome', pageTitle: 'profile', error: "Something went Wrong!!" });
    }

  },

  deleteUser: async (req, res) => {
    try {
      let { password } = req.body;
      let checkValidate = validatioReqBody(req, res, "deleteUser");
      if (checkValidate == true) {
        password = md5(password);
        if (password == req.session.password) {
          let query = `DELETE FROM users WHERE email = ?`;
          await queryExecution(query, [req.session.email]);
          await req.session.destroy();
          return sendResponse(req, res, { page: 'login', pageTitle: 'Login', message: "User Delete Successfully" });
        }
        return sendResponse(req, res, { page: 'userHome', pageTitle: 'profile', error: "Current Password is not matched!!" });
      }
      return sendResponse(req, res, { page: 'userHome', pageTitle: 'profile', error: checkValidate });
    } catch (error) {
      return sendResponse(req, res, { page: 'userHome', pageTitle: 'profile', error: "Something went Wrong!!" });
    }
  },

  getUserDetail: async (req, res) => {
    try {
      if (req.session.email) {
        return sendResponse(req, res, { page: 'userHome', pageTitle: 'profile' });
      }
      return res.redirect('/');
    } catch (error) {
      console.log("Something went wrong!!", error.message)
      return res.redirect('/')
    }
  }
}