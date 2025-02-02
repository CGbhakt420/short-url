const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
    const tokenValue = req.cookies?.uid;
    req.user = null;
    if(!tokenValue) return next();

    const token = tokenValue;
    const user = getUser(token);
    req.user = user;
    return next();
}

// async function restrictToLoggedInUserOnly(req, res, next) {
//     const userUid = req.cookies?.uid;

//     if(!userUid) return res.redirect("/login"); //no uid in cookie

//     const user = getUser(userUid);  //validate the jwt token in uid

//     if(!user) return res.redirect("/login");

//     req.user = user;
//     next();
    
// }


//Authorization

function restrictTo(roles=[]){
    return function(req, res, next){
        if(!req.user) return res.redirect('/login');

        if(!roles.includes(req.user.role)) return res.end("Unauthorized");

        return next();
    }
}



module.exports = {
    checkForAuthentication,
    restrictTo,
}