module.exports = {
    getPostDetail: async (req, res) => {
        try {
            let id = req.params.id && req.params.id.length  ? Number(req.params.id) : req.params.id;
            if(id && id !== NaN){
                let records = await getPosts(req,res);
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
        try{
        let id = req.params.id && req.params.id.length  ? Number(req.params.id) : req.params.id;
        if(id && id !== NaN){
            let query = `DELETE FROM posts WHERE posts_id = ${id}`;
            con.query(query, async (error, rows, fields)=>{
                try {
                    if(error){
                        return res.render('getpostdetail', { title: 'Post Detail', isUserLoggedIn: req.session.user_id ? true : false, name:"",records : [] })
                    }
                    req.query = {user_id : req.session.user_id}
                    let records = await getPosts(req,res);
                    return res.render('getpostdetail', { title: 'Post Detail', isUserLoggedIn: req.session.user_id ? true : false, name:"",records : records });
                } catch (error) {
                    return res.render('getpostdetail', { title: 'Post Detail', isUserLoggedIn: req.session.user_id ? true : false, name:"",records : [] })
                }
            });
            return res.render('getpostdetail', { title: 'Post Detail', isUserLoggedIn: req.session.user_id ? true : false, name:"",records : records });
        }else{
            return res.render('getpostdetail', { title: 'Post Detail', isUserLoggedIn: req.session.user_id ? true : false , name:"" , records : []});
        }
    } catch (error) {
        console.log("error", error)
        return res.render('getpostdetail', { title: 'Post Detail', isUserLoggedIn: req.session.user_id ? true : false, name:"" , records : []});
    }
    },
    getAllPost : getPosts
}
async function getPosts(req, res){
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