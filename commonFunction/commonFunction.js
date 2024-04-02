// sendResponse Function used to send the response with all parameter that is use in page
module.exports.sendResponse = async (req, res, data) => {
    let resposne = {
        title: data.pageTitle || 'Blogs',
        isUserLoggedIn: data.isUserLoggedIn || req.session.user_id ? true : false,
        name: "",
        records: data.records || [],
        error: data.error || "",
        message : data.message || "",
        blogtitle: data.blogtitle || "",
        content : data.content || "",
        pageUrl : data.pageUrl || '/user/post'

    }
    let page = data.page || 'index'
    return res.render( page , resposne)
}
// This function is used for exexute the query in sql
module.exports.queryExecution = async (query) =>{
    console.log("Query", query);
    return new Promise((resolve, reject) => {
        con.query(query,(error, rows, fields)=>{
            if(error){
                console.log("query error",error);
                return reject(error)
            }
            return resolve(rows);
        });
    })
}