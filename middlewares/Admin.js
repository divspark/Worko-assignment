export const isAdmin = (req, res, next) => {
    // Assuming the user role is stored in the token
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admins only.' });
    }
  };
  