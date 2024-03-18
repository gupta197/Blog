var md5 = require('md5');

module.exports = {
    changePassword: async(req,res)=>{
      try {
        let {currentPassword, newPassword} = req.body;
        if(currentPassword && currentPassword.trim().length && newPassword && newPassword.trim().length){
          currentPassword = md5(currentPassword)
          newPassword = md5(newPassword);
          if(currentPassword == req.session.password){
            let query = `UPDATE users SET password ='${newPassword}' WHERE email = '${req.session.email}'`;
            con.query(query,(error, rows, fields)=>{
              console.log(error, rows, fields)
              // if(!error && rows.length >= 1){
              //   let pass = md5(password);
              //   if(rows[0].Password == pass){
              //     if(!req.session.username && !req.session.password){
              //       req.session.email = email;
              //       req.session.password = pass;
              //       req.session.username = rows[0].username;
              //       req.session.save();
              //     }
              //     return res.redirect('/user');
              //   }else{
              //     return res.render('login', { title: 'Login', error: "Invalid credations!!", message:``, isUserLoggedIn: false, name:"" });
              //   }
              
              // }
              // if(rows.length == 0){
              //   return res.render('login', { title: 'Login', error: "Invalid credations!!", message:`` });
              // }
              if(!error){
                req.session.password = newPassword;
                req.session.save();
                return res.render('userHome', { title:'profile', username: req.session.username, error:"", message:"Password Updated Successfully!!" , isUserLoggedIn: true, name:req.session.username});
              }
              if(error){
                console.log("error message in userHome", error);
                return res.render('userHome', { title:'profile', username: req.session.username, error:"Something went Wrong!!", message:"" , isUserLoggedIn: true, name:req.session.username});
              }
            })
          }else{
            return res.render('userHome', { title:'profile', username: req.session.username, error:"Current Password is not matched!!", message:"" , isUserLoggedIn: true, name:req.session.username});
          }
        }else{
          return res.render('userHome', { title:'profile', username: req.session.username, error:"All the fields are required!!", message:"" , isUserLoggedIn: true, name:req.session.username});
        }

        
      } catch (error) {
        return res.render('userHome', { title:'profile', username: req.session.username, error:"", message:"" , isUserLoggedIn: true, name:req.session.username});
      }

    },
    updateUserName:async(req,res)=>{
      try {
        try {
          let {newName} = req.body;
          if(newName && newName.trim().lengthh){
            if(newName !== req.session.username){
              let query = `UPDATE users SET username = '${newName}' WHERE email = '${req.session.email}'`;
              con.query(query,async (error, rows, fields)=>{
                console.log(error, rows, fields);
  
                // if(!error && rows.length >= 1){
                //   let pass = md5(password);
                //   if(rows[0].Password == pass){
                //     if(!req.session.username && !req.session.password){
                //       req.session.email = email;
                //       req.session.password = pass;
                //       req.session.username = rows[0].username;
                //       req.session.save();
                //     }
                //     return res.redirect('/user');
                //   }else{
                //     return res.render('login', { title: 'Login', error: "Invalid credations!!", message:``, isUserLoggedIn: false, name:"" });
                //   }
                
                // }
                // if(rows.length == 0){
                //   return res.render('login', { title: 'Login', error: "Invalid credations!!", message:`` });
                // }
                if(!error){
                  req.session.username = newName;
                  req.session.save();
                  return res.render('userHome', { title:'profile', username: req.session.username, error:"", message:"User Name Update Successfully" , isUserLoggedIn: true, name:req.session.username});
                }
                if(error){
                  console.log("error message in userHome", error);
                  return res.render('userHome', { title:'profile', username: req.session.username, error:"Something went Wrong!!", message:"" , isUserLoggedIn: true, name:req.session.username});
                }
              })
            }else{
              return res.render('userHome', { title:'profile', username: req.session.username, error:"Current Password is not matched!!", message:"" , isUserLoggedIn: true, name:req.session.username});
            }
          }else{
            return res.render('userHome', { title:'profile', username: req.session.username, error:"All the fields are required!!", message:"" , isUserLoggedIn: true, name:req.session.username});
          }
        } catch (error) {
          return res.render('userHome', { title:'profile', username: req.session.username, error:"Something went wrong!!", message:"" , isUserLoggedIn: true, name:req.session.username});
        }
        
      } catch (error) {
        return res.render('userHome', { title:'profile', username: req.session.username, error:"", message:"" , isUserLoggedIn: true, name:req.session.username});
      }

    },

    deleteUser: async(req,res) =>{
      try {
        let {password} = req.body;
        if(password && password.trim().lengthh){
          password = md5(password);
          if(password == req.session.password){
            let query = `DELETE FROM users WHERE email = '${req.session.email}'`;
            con.query(query,async (error, rows, fields)=>{
              console.log(error, rows, fields);

              // if(!error && rows.length >= 1){
              //   let pass = md5(password);
              //   if(rows[0].Password == pass){
              //     if(!req.session.username && !req.session.password){
              //       req.session.email = email;
              //       req.session.password = pass;
              //       req.session.username = rows[0].username;
              //       req.session.save();
              //     }
              //     return res.redirect('/user');
              //   }else{
              //     return res.render('login', { title: 'Login', error: "Invalid credations!!", message:``, isUserLoggedIn: false, name:"" });
              //   }
              
              // }
              // if(rows.length == 0){
              //   return res.render('login', { title: 'Login', error: "Invalid credations!!", message:`` });
              // }
              if(!error){
                let sessionDestroyed = await req.session.destroy();
                console.log(sessionDestroyed);
                return res.render('login', { title:'Login', username: req.session.username, error:"", message:"User Delete Successfully" , isUserLoggedIn: false, name:""});
              }
              if(error){
                console.log("error message in userHome", error);
                return res.render('userHome', { title:'profile', username: req.session.username, error:"Something went Wrong!!", message:"" , isUserLoggedIn: true, name:req.session.username});
              }
            })
          }else{
            return res.render('userHome', { title:'profile', username: req.session.username, error:"Current Password is not matched!!", message:"" , isUserLoggedIn: true, name:req.session.username});
          }
        }else{
          return res.render('userHome', { title:'profile', username: req.session.username, error:"All the fields are required!!", message:"" , isUserLoggedIn: true, name:req.session.username});
        }
      } catch (error) {
        return res.render('userHome', { title:'profile', username: req.session.username, error:"Something went wrong!!", message:"" , isUserLoggedIn: true, name:req.session.username});
      }
    },
    getUserDetail:async(req,res)=>{
        try {
            if(req.session.email){
              return res.render('userHome', { title:'profile', username: req.session.username, error:"", message:"" , isUserLoggedIn: true, name:req.session.username});
            }else{
              return res.redirect('/')
            }
          } catch (error) {
            console.log("Something went wrong!!")
            return res.redirect('/')
          }
    }
}