export function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
}

export function requireAdmin(req, res, next) {
  if (!req.session.userRole || req.session.userRole !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  return next();
}
