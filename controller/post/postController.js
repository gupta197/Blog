let service = require('../../Services/services')
module.exports = {
    getPostDetail: async (req, res) => {
        try {
            let id = req.params.id && req.params.id.length ? Number(req.params.id) : req.params.id;
            if (id && id !== NaN) {
                let records = await getPosts(req, res);
                console.log("records", records)
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
        try {
            const { title, content } = req.body;
            if (title && title.trim().length && content && content.trim().length) {
                let query = `INSERT INTO posts (title,content) VALUES ('${title}','${content}');`;
                await service.queryExecution(query);
                return res.render('CreateORUpdatePost', { title: 'Create Posts', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: [] });
            } else {
                return res.render('CreateORUpdatePost', { title: 'Create Posts', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: [] });
            }
        } catch (error) {
            return res.render('CreateORUpdatePost', { title: 'Create Posts', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: [] });
        }

    },
    updatePost: async (req, res) => {
        try {
            const { title, content } = req.body;
            let id = req.params.id && req.params.id.length ? Number(req.params.id) : req.params.id;
            if (title && title.trim().length && content && content.trim().length && id && id !== NaN) {
                let query = `UPDATE posts SET title = '${title}', content = '${content}' WHERE posts_id = ${id}`;
                await service.queryExecution(query);
                return res.render('CreateORUpdatePost', { title: 'Update Post Detail', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: [] });
            } else {
                return res.render('CreateORUpdatePost', { title: 'Update Post Detail', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: [] });
            }
        } catch (error) {
            return res.render('CreateORUpdatePost', { title: 'Update Post Detail', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: [] });
        }

    },
    deletePost: async (req, res) => {
        try {
            let id = req.params.id && req.params.id.length ? Number(req.params.id) : req.params.id;
            if (id && id !== NaN) {
                let query = `DELETE FROM posts WHERE posts_id = ${id} AND user_id = ${req.session.user_id}`;
                await service.queryExecution(query);
                req.query = { user_id: req.session.user_id }
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
        try {
            return res.render('userAllPost', { title: 'User Posts', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: [] });
        } catch (error) {
            console.log("error delete", error)
            return res.render('userAllPost', { title: 'User Posts', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: [] });
        }
    },
    getPostUpdateForm: async (req, res) => {
        try {
            let id = req.params.id && req.params.id.length ? Number(req.params.id) : req.params.id;
            if (id && id !== NaN) {
                let records = await getPosts(req, res);
                console.log("records", records)
                return res.render('userPostUpdateForm', { title: 'Post Update Detail', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: records });
            } else {
                return res.render('userPostUpdateForm', { title: 'Post Update Detail', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: [] });
            }
        } catch (error) {
            console.log("error userPostUpdateForm", error)
            return res.render('userPostUpdateForm', { title: 'Post Update Detail', isUserLoggedIn: req.session.user_id ? true : false, name: "", records: [] });
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
            console.log("query", query);
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