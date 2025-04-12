import jwt from 'jsonwebtoken';
export const SECRET = 'SecretKey';
export const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; 
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userId = user.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

//Authorization MiddleWare
export const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Unauthorized: Insufficient role' });
  }
};