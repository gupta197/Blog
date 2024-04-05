const md5 = require('md5');
const {queryExecution, validatioReqBody, sendResponse} = require('../../commonFunction/commonFunction')

module.exports = {
    getLoginPage: async (req, res, next) => { 
        let message = req.session.email ? "User register successfully. Please login!!" : "";
        if(message.length){
          return res.redirect('/user');
        }else{
          return sendResponse(req, res, {page : 'login', pageTitle: 'Login'});
        }
    },

    postLoginPage: async (req, res) => {
        try {
          const {email, password} = req.body;
          let checkValidate = validatioReqBody(req, res, "login");
          if(checkValidate == true){
            let query = `SELECT user_id, username, Password FROM users WHERE email = '${email}'`;
            let rows = await queryExecution(query);
            if(rows.length >= 1){
              let pass = md5(password);
              if(rows[0].Password == pass){
                if(!req.session.username && !req.session.password){
                  req.session.email = email;
                  req.session.user_id = rows[0].user_id;
                  req.session.password = pass;
                  req.session.username = rows[0].username;
                  req.session.save();
                }
                return res.redirect('/user/dashboard');
              }else{
                return sendResponse(req, res, {page : 'login', pageTitle: 'Login' , error: "Invalid credations!!"});
              }
            
            }
            if(rows.length == 0){
              return sendResponse(req, res, {page : 'login', pageTitle: 'Login' , error: "Invalid credations!!"});
            }
          }else{
            return sendResponse(req, res, {page : 'login', pageTitle: 'Login' , error: checkValidate});
          }
        } catch (error) {
          return sendResponse(req, res, {page : 'login', pageTitle: 'Login' , error: "Something went wrong!!"});
        }
    },

    getRegisterPage: async (req, res) => {
        let message = req.session.email ? "User register successfully. Please login!!" : "";
        if(message.length){
          return res.redirect('/user');
        }else{
            return res.render('register', { title: 'Register', error:"", message:"" , isUserLoggedIn: false, name:"" });
        }
       
    },

    postRegisterPage: async (req, res) => {
        try {
            const {email, password, username} = req.body;
            if(email && email.trim().length && password && password.trim().length && username && username.trim().length){
              let query = `SELECT user_id, username FROM users WHERE email = '${email}'`;
              let rows = await queryExecution(query);
              if(rows.length >= 1){
                return res.render('register', { title: 'Register', error: "Email Already exists!!", message:"", isUserLoggedIn: false, name:""  });
              }
              let pass = md5(password);
              query = `INSERT INTO users (username, email,password) VALUES ('${username}','${email}','${pass}');`;
              rows = await queryExecution(query);
              return res.render('login', { title: 'Register', error: "You have register successfully. Please login your self" , message:"", isUserLoggedIn: false, name:""  });
            }else{
             return res.render('register', { title: 'Register', error: "All Fields are requied", message:"", isUserLoggedIn: false, name:""  });
            }
        }catch (error) {
            console.log("Error in register", error.message)
            return res.render('register', { title: 'Register', error: "Something went wrong!!" , message:"", isUserLoggedIn: false, name:"" });
        }        
    },
    logout : async (req,res) =>{
        await req.session.destroy();
        return res.redirect('/')
    }
}