var md5 = require('md5');

module.exports = {
    changePassword: async(req,res)=>{

    },
    updateUserName:async(req,res)=>{

    },
    deleteUser: async(req,res) =>{

    },
    getUserDetail:async(req,res)=>{
        try {
            // if(req.session.email){
            //   con.query()
              return res.render('userHome', { title:'profile', username: req.session.username, error:"", message:"" , isUserLoggedIn: true, name:req.session.username});
            // }else{
            //   return res.redirect('/')
            // }
          } catch (error) {
            console.log("Something went wrong!!")
            return res.redirect('/')
          }
    }
}