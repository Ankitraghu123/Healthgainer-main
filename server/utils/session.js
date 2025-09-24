const { v4: uuidv4 } = require("uuid");
<<<<<<< HEAD
const isProd = process.env.NODE_ENV === "production";
=======
>>>>>>> completed

// Middleware: check or create sessionId
function sessionMiddleware(req, res, next) {
  let sessionId = req.cookies.sessionId;

  if (!sessionId) {
    sessionId = uuidv4();
    res.cookie("sessionId", sessionId, {
      httpOnly: true, // JS से access नहीं कर सकते
<<<<<<< HEAD
      secure: isProd, // env-aware
      sameSite: isProd ? "none" : "lax", // CSRF से बचाव
=======
      secure: true, // सिर्फ https में
      sameSite: "lax", // CSRF से बचाव
>>>>>>> completed
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
  }

  req.sessionId = sessionId;
  next();
}

module.exports = sessionMiddleware;
