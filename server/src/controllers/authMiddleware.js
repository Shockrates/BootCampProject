import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. Invalid token format." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use the same key you signed in JWT
    req.userId = decoded.id; // 👈 decoded.id not decoded.userId
    next();
  } catch (error) {
    console.error("JWT verify error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
}
