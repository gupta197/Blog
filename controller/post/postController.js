const mysql = require('mysql');
let { queryExecution, sendResponse, validatioReqBody } = require('../../commonFunction/commonFunction');
module.exports = {
    getPostDetail: async (req, res) => {
        try {
            let checkValidate = validatioReqBody(req, res, "vaildateId");
            if (checkValidate == true) {
                let records = await getPosts(req, res);
                return sendResponse(req, res, { page: 'getpostdetail', pageTitle: 'Post Detail', records: records});
            } 
            return sendResponse(req, res, { page: 'getpostdetail', pageTitle: 'Post Detail', error: checkValidate });
        } catch (error) {
            return sendResponse(req, res, { page: 'getpostdetail', pageTitle: 'Post Detail', error: error.message || error.sqlMessage });
        }

    },
    createPost: async (req, res) => {
        try {
            const { title, content } = req.body;
            let checkValidate = validatioReqBody(req, res, "createPost");
            if (checkValidate == true) {
                let user_id = req.session.user_id || 1;
                let query = `INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)`;
                await queryExecution(query, [title, content, user_id]);
                return sendResponse(req, res, { page: 'CreateORUpdatePost', pageTitle: 'Create Posts', pageUrl: "/user/post" , message: "Post Created Successfully!!" });
            }
            return sendResponse(req, res, { page: 'CreateORUpdatePost', pageTitle: 'Create Posts', pageUrl: "/user/post", error: checkValidate });
        } catch (error) {
            return sendResponse(req, res, { page: 'CreateORUpdatePost', pageTitle: 'Create Posts', pageUrl: "/user/post", error: error.message || error.sqlMessage });
        }

    },
    updatePost: async (req, res) => {
        try {
            const { title, content } = req.body;
            let checkValidate = validatioReqBody(req, res, "updatePost");
            if (checkValidate == true) {
                let query = `UPDATE posts SET title = ?, content = ? WHERE posts_id = ?`;
                await queryExecution(query,[title, content, req.params.id]);
                delete req.params.id;
                let records = await getPosts(req, res);
                return sendResponse(req, res, { page: 'CreateORUpdatePost', pageTitle: 'Post Update Detail', pageUrl: "/user/post/" + req.params.id, message : "Record Update Successfully", blogtitle: req.body.title, content: req.body.content, records : records});
            } 
        return sendResponse(req, res, { page: 'CreateORUpdatePost', pageTitle: 'Post Update Detail', pageUrl: "/user/post/" + req.params.id, error: checkValidate });
    } catch (error) {
        return sendResponse(req, res, { page: 'CreateORUpdatePost', pageTitle: 'Post Update Detail', pageUrl: "/user/post/" + req.params.id, error: error.message || error.sqlMessage });
    }

    },

    deletePost: async (req, res) => {
        try {
            let checkValidate = validatioReqBody(req, res, "vaildateId");
            if (checkValidate == true) {
                let query = `DELETE FROM posts WHERE posts_id = ? AND user_id = ?`;
                await queryExecution(query, [req.params.id, req.session.user_id]);
                req.query = { user_id: req.session.user_id }
                delete req.params.id;
                let records = await getPosts(req, res);
                return sendResponse(req, res, { page: 'userAllPost', pageTitle: 'User Posts', records: records });
            } 
        return sendResponse(req, res, { page: 'userAllPost', pageTitle: 'User Posts', error: checkValidate });
    } catch (error) {
        return sendResponse(req, res, { page: 'userAllPost', pageTitle: 'User Posts', error: error.message || error.sqlMessage });
    }
    },

    getPostForm: async (req, res) => {
        return sendResponse(req, res, { page: 'CreateORUpdatePost', pageTitle: 'User Posts' });
    },

    getPostUpdateForm: async (req, res) => {
        try {
            let checkValidate = validatioReqBody(req, res, "vaildateId");
            if (checkValidate == true) {
                let records = await getPosts(req, res);
                return sendResponse(req, res, { page: 'CreateORUpdatePost', pageTitle: 'Post Update Detail', pageUrl: "/user/post/" + req.params.id , blogtitle : records[0].title , content : records[0].content});
            }
            return sendResponse(req, res, { page: 'CreateORUpdatePost', pageTitle: 'Post Update Detail', pageUrl: "/user/post/" + req.params.id, error: checkValidate });
        } catch (error) {
            return sendResponse(req, res, { page: 'CreateORUpdatePost', pageTitle: 'Post Update Detail', pageUrl: "/user/post/" + req.params.id, error: error.message || error.sqlMessage });
        }
    },
    getUserAllPost: async (req, res) => {
        try {
            req.query.user_id = req.session.user_id;
            let records = await getPosts(req, res);
            return sendResponse(req, res, { page: 'userAllPost', pageTitle: 'Blogs', records: records});
        } catch (error) {
            return sendResponse(req, res, { page: 'userAllPost', pageTitle: 'Blogs', error: "Something went Wrong!!"});
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