const dotenv = require("dotenv");

function checkAuth(req, res, next) {
   const referer = req.headers["referer"];
   if (referer && referer.includes("localhost")) {
      return next(); // Allow requests from localhost without authentication
   }
   if(referer && referer.includes("https://d709b619-af57-4d79-8978-89d2776b900e.us-east-1.cloud.genez.io")){
        return next(); // Allow requests from the Genez.io domain without authentication
   }
   
   const privateSecret = process.env.VITE_RAPIDAPI_PROXY_SECRET;
   const proxySecret = req.headers["X-RapidAPI-Proxy-Secret"] || req.headers["x-rapidapi-proxy-secret"];

   if (!proxySecret || proxySecret !== privateSecret) {
      return res.status(403).json({ message: "Forbidden: Invalid API key" });
   }
   next(); // Middleware passed, continue to route handler
}

module.exports = { checkAuth };
