const jwt = require("jsonwebtoken");
const { UserModel } = require("../db/models");
const JWT_SECRET = process.env.JWT_SECRET;

async function authMiddleware(req, res, next) {
    let token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ 
            message: 'Authentication token required. Please log in.'
        });
    }
    token = token.slice(7);

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const userIdFromToken = payload.userId; 
        const userFound = await UserModel.findById(userIdFromToken); 
        
        if (!userFound) {
            return res.status(401).json({ 
                message: "Invalid token or user not found. Please log in again."
            });
        }

        req.userId = userFound._id;     
        req.user = userFound;

        next();

    } catch (err) {
        console.error('JWT Verification Error:', err); 
        let errorMessage = "Authentication failed. Please log in again.";
        if (err.name === 'TokenExpiredError') {
            errorMessage = 'Your session has expired. Please log in again.';
        } else if (err.name === 'JsonWebTokenError') {
            errorMessage = 'Invalid token. Please log in again.';
        }
        return res.status(401).json({ message: errorMessage });
    }
}

module.exports = authMiddleware;