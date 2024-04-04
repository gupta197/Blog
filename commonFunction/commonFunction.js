// sendResponse Function used to send the response with all parameter that is use in page
module.exports.sendResponse = async (req, res, data) => {
    let resposne = {
        title: data.pageTitle || 'Blogs',
        isUserLoggedIn: data.isUserLoggedIn || req.session.user_id ? true : false,
        name: "",
        records: data.records || [],
        error: data.error || "",
        message: data.message || "",
        blogtitle: data.blogtitle || "",
        content: data.content || "",
        pageUrl: data.pageUrl || '/user/post'

    }
    let page = data.page || 'index'
    return res.render(page, resposne)
}

// This function is used for exexute the query in sql
module.exports.queryExecution = async (query) => {
    console.log("Query", query);
    return new Promise((resolve, reject) => {
        con.query(query, (error, rows, fields) => {
            if (error) {
                console.log("query error", error);
                return reject(error)
            }
            return resolve(rows);
        });
    })
}

exports.handleValidation = function (err) {
    const messages = [];
    for (let field in err.errors) {
        return err.errors[field].message;
    }
    return messages;
};

exports.checkBlank = function (arr) {
    if (!Array.isArray(arr)) {
        return 1;
    }
    var arrlength = arr.length;
    for (var i = 0; i < arrlength; i++) {
        if (arr[i] === undefined || arr[i] == null) {
            arr[i] = "";
        } else {
            arr[i] = arr[i];
        }
        arr[i] = arr[i].toString().trim();
        if (arr[i] === "" || arr[i] === "" || arr[i] === undefined) {
            return 1;
        }
    }
    return 0;
};