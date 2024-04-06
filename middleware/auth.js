const {sendResponse} = require('../commonFunction/commonFunction');
module.exports.isUserLoggedIn = async (req ,res ,next ) => {
    if(req.session.email){
      next();
      return;
    }else{
      return res.redirect('/')
    }
}