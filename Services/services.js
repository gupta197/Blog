module.exports.queryExecution = async (query) =>{
    console.log("Query Service", query);
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