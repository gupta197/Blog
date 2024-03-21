module.exports = {
    getAllPost: async (req, res) => {
        return new Promise((resolve, reject) => {
            try {
                let query = `SELECT * FROM posts`;
                if(req.query.user_id){
                    query += ` WHERE user_id req.session.user_id`;
                }
                console.log("query", query);
                con.query(query,(error, rows, fields)=>{
                    if(error){
                        console.log("query error",error);
                        return reject(error)
                    }
                    return resolve(rows);
                });
            } catch (error) {
                console.log("error",error)
                reject(error)
            }
        })

    },
    getPostDetail: async (req, res) => {

    },
    createPost: async (req, res) => {

    },
    updatePost: async (req, res) => {

    },
    deletePost: async (req, res) => {

    }
}