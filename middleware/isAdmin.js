const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access denied" });
  }

  next(); // user is admin, allow access
};

module.exports = isAdmin;
