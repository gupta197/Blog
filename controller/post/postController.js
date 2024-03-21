module.exports = {
    getPostDetail: async (req, res) => {
        try {
            let id = req.params.id && req.params.id.length  ? Number(req.params.id) : req.params.id;
            if(id && id !== NaN){
                let records = await getAllPost(req,res);
                console.log("records",records)
                return res.render('getpostdetail', { title: 'Post Detail', isUserLoggedIn: req.session.user_id ? true : false, name:"",records : records });
            }else{
                return res.render('getpostdetail', { title: 'Post Detail', isUserLoggedIn: req.session.user_id ? true : false , name:"" , records : []});
            }
        } catch (error) {
            console.log("error", error)
            return res.render('getpostdetail', { title: 'Post Detail', isUserLoggedIn: req.session.user_id ? true : false, name:"" , records : []});
        }

    },
    createPost: async (req, res) => {

    },
    updatePost: async (req, res) => {

    },
    deletePost: async (req, res) => {

    },
    getAllPost : getAllPost
}
async function getAllPost(req, res){
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM posts`;
            if(req.query.user_id && !req.params.id){
                query += ` WHERE user_id = ${req.session.user_id}`;
            }
            if(req.params.id && !req.query.user_id){
                query += ` WHERE posts_id = ${Number(req.params.id)}`;
            }
            if(req.params.id && req.query.user_id){
                query += ` WHERE posts_id = ${Number(req.params.id)} AND user_id = ${req.session.user_id}`;
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

}