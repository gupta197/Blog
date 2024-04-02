const {sendResponse} = require('../commonFunction/commonFunction');
const isUserLoggedIn = async (req ,res ,next ) => {
    if(req.session.email){
      next();
      return;
    }else{
      return sendResponse(req,res ,{page : 'index', pageTitle : "Blogs"})
    }
}