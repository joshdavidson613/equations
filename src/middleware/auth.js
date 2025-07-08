const dotenv = require("dotenv");

function checkAuth(req, res, next) {
   const referer = req.headers["referer"];
   const origin = req.headers["origin"];
   const privateSecret = process.env.VITE_RAPIDAPI_PROXY_SECRET;
   const proxySecret = req.headers["X-RapidAPI-Proxy-Secret"] || req.headers["x-rapidapi-proxy-secret"];

   console.log("Referer:", referer);
   console.log("Origin:", origin);
   console.log("Proxy Secret:", proxySecret);
   if (!proxySecret || proxySecret !== privateSecret) {
      return res.status(403).json({ message: "Forbidden: Invalid API key" });
   }
   next(); // Middleware passed, continue to route handler
}

module.exports = { checkAuth };
