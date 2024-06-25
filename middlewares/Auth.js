import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = 'Dabbemein4098';
const JWT_EXPIRATION = '1d'; // 1 day


export const jwtAuthMiddleware = (req, res, next) => {
    // Check header or query parameters or post parameters for token
    const token = req.headers.authorization;
  
    // Decode token
    if (token) {
      // Verify JWT
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Failed to authenticate token.' });
        } else {
          // Save to request for use in other routes
          req.user = decoded;
          next();
        }
      });
    } else {
      // If there is no token return error
      return res.status(403).json({ message: 'No token provided.' });
    }
  };
  