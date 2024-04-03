const {sendResponse} = require('../commonFunction/commonFunction');
module.exports.isUserLoggedIn = async (req ,res ,next ) => {
  console.log("here",req.session.email)
    if(req.session.email){
      next();
      return;
    }else{
      return res.redirect('/')
    }
}