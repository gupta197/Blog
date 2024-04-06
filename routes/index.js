const express = require('express'), 
authController = require('../controller/Auth/authController'),
postController = require('../controller/post/postController'),
{sendResponse } = require('../commonFunction/commonFunction');
router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {
  try {
      let records = await postController.getAllPost(req,res);
      return sendResponse(req, res, {page : 'index', records: records});
  } catch (error) {
    return sendResponse(req, res, {page : 'index', records: []});
  }
});

/* GET signup page. */
router.get('/register', authController.getRegisterPage);

/* POST signup API. */
router.post('/register', authController.postRegisterPage );

/* GET login page. */
router.get('/login', authController.getLoginPage);

/* Post login page. to login the user */
router.post('/login', authController.postLoginPage);

/* Logout API. In this api we clear the session */
router.get('/logout', authController.logout);

/* about us API. In this api render the static page*/
router.get('/about', async (req,res)=>{  
  return sendResponse(req, res, {page : 'aboutus', pageTitle : "Blogs"});
});

module.exports = router;
