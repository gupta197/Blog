const Joi = require('joi')
// sendResponse Function used to send the response with all parameter that is use in page
module.exports.sendResponse = async (req, res, data) => {
    try {
        let resposne = {
            title: data.pageTitle || 'Blogs',
            isUserLoggedIn: data.isUserLoggedIn || req.session && req.session.user_id ? true : false,
            name:  req.session && req.session.username ? req.session.username : "",
            username: req.session && req.session.username ? req.session.username : "",
            records: data.records || [],
            error: data.error || "",
            message: data.message || "",
            blogtitle: data.blogtitle || "",
            content: data.content || "",
            pageUrl: data.pageUrl || '/user/post'
    
        }
        let page = data.page || 'index'
        return res.render(page, resposne)
    } catch (error) {
        return res.render("index", {
            title: 'Blogs',
            isUserLoggedIn:  false,
            name:"",
            username:"",
            records: [],
            error: "",
            message: "",
            blogtitle: "",
            content:"",
            pageUrl: '/user/post'
        })
    }

}

// This function is used for exexute the query in sql
module.exports.queryExecution = async (query, values) => {
    console.log("Query", query);
    return new Promise((resolve, reject) => {
        values = values && values.length ? values : [];
        if (values.length) {
            con.query(query, values, (error, rows, fields) => {
                if (error) {
                    console.log("query error", error);
                    return reject(error)
                }
                return resolve(rows);
            });
        } else {
            con.query(query, (error, rows, fields) => {
                if (error) {
                    console.log("query error", error);
                    return reject(error)
                }
                return resolve(rows);
            });
        }

    })
}

module.exports.handleValidation = function (err) {
    const messages = [];
    for (let field in err.errors) {
        return err.errors[field].message;
    }
    return messages;
};

module.exports.checkBlank = function (arr) {
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

module.exports.validatioReqBody = (req, res, data) => {
    let schema, validateId = false, idEvalation = true, id;
    switch (data) {
        case "login":
            schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required()
            }).unknown();
            break;
        case "register":
            schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                username: Joi.string().required()
            }).unknown();

            break;
        case "createPost":
            schema = Joi.object({
                title: Joi.string().required(),
                content: Joi.string().required()
            }).unknown();
            break;
        case "updateUserName":
            schema = Joi.object({
                newName: Joi.string().required()
            }).unknown();
            break;

        case "changePassword":
            schema = Joi.object({
                currentPassword: Joi.string().required(),
                newPassword: Joi.string().required()
            }).unknown();
            break;
        case "deleteUser":
            schema = Joi.object({
                password: Joi.string().required()
            }).unknown();
            break;

        case "vaildateId":
            validateId = true;
            id = req.params.id && req.params.id.length ? Number(req.params.id) : req.params.id;
            idEvalation = id && id !== NaN ? true : false;
        case "updatePost":
            schema = Joi.object({
                title: Joi.string().required(),
                content: Joi.string().required()
            }).unknown();;
            id = req.params.id && req.params.id.length ? Number(req.params.id) : req.params.id;
            idEvalation = id && id !== NaN ? true : false;
            break;

        default:
            idEvalation = true;
            break;
    }
    if (validateId) {
        return idEvalation
    }
    const { error } = schema.validate(req.body);
    // Validate user input
    if (error) {
        return error.details[0].message;
    }
    return idEvalation;
}