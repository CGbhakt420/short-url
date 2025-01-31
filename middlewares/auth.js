const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;

    if(!userUid) return res.redirect("/login"); //no uid in cookie

    const user = getUser(userUid);  //validate the jwt token in uid

    if(!user) return res.redirect("/login");

    req.user = user;
    next();
    
}

async function checkAuth(req, res, next){
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}