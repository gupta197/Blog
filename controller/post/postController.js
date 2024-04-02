let {queryExecution, sendResponse} = require('../../commonFunction/commonFunction');
module.exports = {
    getPostDetail: async (req, res) => {
        try {
            let id = req.params.id && req.params.id.length ? Number(req.params.id) : req.params.id;
            if (id && id !== NaN) {
                let records = await getPosts(req, res);
                return res.render('getpostdetail', { title: 'Post Detail', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: records });
            } else {
                return res.render('getpostdetail', { title: 'Post Detail', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: [] });
            }
        } catch (error) {
            console.log("error", error)
            return res.render('getpostdetail', { title: 'Post Detail', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: [] });
        }

    },
    createPost: async (req, res) => {
        let obj = {
            pageUrl :"/user/post",
            title: 'Create Posts',
            isUserLoggedIn: req.session.user_id ? true : false,
            name: "",
            records: [],
            error :"", 
            message:"",
            blogtitle: "",
            content :""
        }
        try {
            const { title, content } = req.body;
            if (title && title.trim().length && content && content.trim().length) {
                let user_id = req.session.user_id || 1; 
                let query = `INSERT INTO posts (title,content,user_id) VALUES ('${title}','${content}',${user_id});`;
                await queryExecution(query);
                return res.render('CreateORUpdatePost', obj);
            } else {
                obj.message = "All fields are required";
                return res.render('CreateORUpdatePost', obj);
            }
        } catch (error) {
            console.log("error create", error)
            obj.message = error.sqlMessage
            return res.render('CreateORUpdatePost', obj);
        }

    },
    updatePost: async (req, res) => {
        let obj = {
            pageUrl :"/user/post/" +req.params.id,
            title: 'Post Update Detail',
            isUserLoggedIn: req.session.user_id ? true : false,
            name: "",
            records: [],
            error :"", 
            message:"",
            blogtitle: req.body.title || "",
            content : req.body.title || ""
        }
        try {
            const { title, content } = req.body;
            let id = req.params.id && req.params.id.length ? Number(req.params.id) : req.params.id;
            if (title && title.trim().length && content && content.trim().length && id && id !== NaN) {
                let query = `UPDATE posts SET title = '${title}', content = '${content}' WHERE posts_id = ${id}`;
                await queryExecution(query);
                obj.message = "Record update Successfully"
                delete req.params.id;
                let records = await getPosts(req,res);
                obj.records = records;
                obj.message ="Record Update Successfully";
                return res.render('userAllPost', obj);
            } else {
                obj.message = "All Fields are required!!"
                return res.render('CreateORUpdatePost', obj);
            }
        } catch (error) {
            obj.message = error.sqlMessage
            return res.render('CreateORUpdatePost', obj);
        }

    },
    deletePost: async (req, res) => {
        try {
            let id = req.params.id && req.params.id.length ? Number(req.params.id) : req.params.id;
            if (id && id !== NaN) {
                // let query = `DELETE FROM posts WHERE posts_id = ${id}`;
                let query = `DELETE FROM posts WHERE posts_id = ${id} AND user_id = ${req.session.user_id}`;
                await queryExecution(query);
                req.query = { user_id: req.session.user_id }
                delete req.params.id;
                let records = await getPosts(req, res);
                return res.render('userAllPost', { title: 'User Posts', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: records });
            } else {
                return res.render('userAllPost', { title: 'User Posts', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: [] });
            }
        } catch (error) {
            console.log("error delete", error)
            return res.render('userAllPost', { title: 'User Posts', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: [] });
        }
    },
    getPostForm: async (req, res) => {
        let obj = {
            pageUrl :"/user/post",
            title: 'User Posts', 
            isUserLoggedIn: req.session.user_id ? true : false, 
            name: "", 
            records: [],
            error :"",
            message:"" ,
            blogtitle: "",
            content :""
        }
        try {
            return res.render('CreateORUpdatePost', obj);
        } catch (error) {
            console.log("error delete", error)
            obj.error = error.sqlMessage;
            return res.render('CreateORUpdatePost', obj);
        }
    },
    getPostUpdateForm: async (req, res) => {
        let obj = {
            pageUrl :"/user/post/" +req.params.id,
            title: 'Post Update Detail',
            isUserLoggedIn: req.session.user_id ? true : false,
            name: "",
            records: [],
            error :"", 
            message:"",
            blogtitle: "",
            content :""
        }
        try {
            let id = req.params.id && req.params.id.length ? Number(req.params.id) : req.params.id;
            if (id && id !== NaN) {
                let records = await getPosts(req, res);
                obj.blogtitle = records[0].title;
                obj.content = records[0].content;
                return res.render('CreateORUpdatePost', obj);
            } else {
                obj.message = "All fields are required";
                return res.render('CreateORUpdatePost', obj);
            }
        } catch (error) {
            console.log("error CreateORUpdatePost", error);
            obj.message = error.sqlMessage
            return res.render('CreateORUpdatePost', obj);
        }
    },
    getUserAllPost : async(req, res) => {
        try {
            let records = await getPosts(req,res);
            return res.render('userAllPost', { title: 'Blogs', isUserLoggedIn: req.session.user_id ? true : false, name:"",records : records });
        } catch (error) {
          return res.render('userAllPost', { title: 'Blogs', isUserLoggedIn: req.session.user_id ? true : false, name:"" , records : []});
        }
    },
    getAllPost: getPosts
}
async function getPosts(req, res) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM posts`;
            if (req.query.user_id && !req.params.id) {
                query += ` WHERE user_id = ${req.session.user_id}`;
            }
            if (req.params.id && !req.query.user_id) {
                query += ` WHERE posts_id = ${Number(req.params.id)}`;
            }
            if (req.params.id && req.query.user_id) {
                query += ` WHERE posts_id = ${Number(req.params.id)} AND user_id = ${req.session.user_id}`;
            }
            con.query(query, (error, rows, fields) => {
                if (error) {
                    console.log("query error", error);
                    return reject(error)
                }
                return resolve(rows);
            });
        } catch (error) {
            console.log("error", error)
            reject(error)
        }
    })

}