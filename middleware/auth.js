const md5 = require('md5');

const isUserLoggedIn = async (req ,res ,next ) => {
    let message = req.session.email ? "User register successfully. Please login!!" : "";
    if(req.session.email){
      next();
      return;
    }else{
      return res.render('index', { title: 'Blogs' });
    }
}