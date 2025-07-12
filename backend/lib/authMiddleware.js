const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

const JWT_SECRET = process.env.JWT_SECRET || "6c99953cd63ef7a0996d7e37a834cfcdd4b034c36c3a19b673be3e376f91673303d62fea517e6c076893f6845ea8db09";

// Helper function to handle re-authentication flow
function redirectToAuth(req, res) {
  // Clear all cookies that the server has set
  if (req.cookies) {
    for (const cookieName in req.cookies) {
      res.clearCookie(cookieName);
    }
  }
  // Redirect to the dashboard to start the auth process over
  // NOTE: On the frontend, you should have logic to detect a logged-out state and show a login button.
  return res.redirect("/dashboard"); 
}

module.exports = async function verifyGuildAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    // No token provided, user needs to authenticate.
    return redirectToAuth(req, res);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { discordId, access_token } = decoded;
    const guildId = req.params.guildId || req.body.guildId;

    const response = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    if (!response.ok) {
      // The user's Discord session is invalid, they must re-authenticate.
      return redirectToAuth(req, res);
    }
    
    const guilds = await response.json();

    const target = guilds.find(g => g.id === guildId);
    if (!target) {
      return res.status(403).json({ error: "You are not in this guild" });
    }

    const perms = parseInt(target.permissions);
    
    // ✅ FIX: This check is now identical to the one in `auth.js`.
    // It relies solely on the reliable permissions bitfield.
    const isAdmin = (perms & 0x20) === 0x20 || (perms & 0x8) === 0x8;

    if (!isAdmin) {
      // This is a correct permission error. The user is in the server but lacks permissions.
      return res.status(403).json({ error: "You must be owner or admin of the guild" });
    }

    req.discordId = discordId;
    req.access_token = access_token;
    next();
  } catch (err) {
    // This catches an invalid or expired JWT. User needs to re-authenticate.
    return redirectToAuth(req, res);
  }
};