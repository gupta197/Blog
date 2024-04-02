module.exports.sendResponse = async (req, res, data) => {
    let resposne = {
        title: data.pageTitle || 'Blogs',
        isUserLoggedIn: req.session.user_id ? true : false,
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