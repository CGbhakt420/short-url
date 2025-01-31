const jwt = require("jsonwebtoken");
const secretKey = "SanchitK@007"

function setUser(user){
    // sessionIdToUserMap.set(id, user);

    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secretKey)
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, secretKey)
    } catch (error) {
        return null;
    }
    
}

module.exports = {
    setUser,
    getUser
}

