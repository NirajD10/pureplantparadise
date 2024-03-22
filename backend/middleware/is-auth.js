const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not Autheticated(Not Allowed)');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;

    // console.log(token);

    try {
        decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET_MESSAGE);
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    if(!decodedToken){
        const error = new Error('Not Autheticated');
        error.statusCode = 401;
        throw error;
    }
    
    req.userId = decodedToken.userId;
    next();
}