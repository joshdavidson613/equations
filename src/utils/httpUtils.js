const { httpCodes } = require("../enums/enums.js");
const supabaseConfig = require("../config/supabase.js");
const supabase = supabaseConfig.supabase;

/**
 * Sends a standardized API response.
 *
 * @param {object} res - The Express.js response object.
 * @param {object} httpCode - An object containing the HTTP code and description (e.g., `{ code: 200, desc: "OK" }`).
 * @param {string} message - A human-readable message to include in the response.
 * @param {*} content - The data or content to include in the response (can be null).
 */
async function sendRes(res, httpCode, message, content = {}) {
   if (!httpCode) {
      console.error(message, " | ", JSON.stringify(content)); // Log the details of the error being sent
     return  res.status(httpCodes.InternalServerError.code).json({
         message: "HTTP code was not provided for error: " + message,
         error: content,
      });
   } else {
      if (httpCode.code != httpCodes.OK.code && httpCode.code != httpCodes.Created.code) {
         if (content) {
            delete content.stack; // Remove the stack trace from the content if it exists
         }
         await addToAuditLog(res.req, httpCode, message, content);
         console.error(message, "|", JSON.stringify(content)); // Log the details of the error being sent
      }

      if(Array.isArray(content)) {
         return res.status(httpCode.code).json({ result: content }); // so express doesn't wrap the array in an object
      }
      return res.status(httpCode.code).json({ ...content });
   }
}

/**
 * Extracts the IP address of the client making the request.
 *
 * This function checks multiple sources within the request object to
 * retrieve the most accurate IP address. It prioritizes values from the
 * `x-original-forwarded-for` header, as it is often set by reverse proxies.
 * Fallbacks include `connection.remoteAddress`, `socket.remoteAddress`,
 * and `connection.socket.remoteAddress` for environments where the IP is stored
 * differently.
 *
 * @param {Object} request - The HTTP request object from the client.
 * @returns {string|null} - The client's IP address, or null if none is found.
 */
function getIp(request) {
   // Destructure relevant properties from the request object.
   const { headers, connection, socket } = request;

   // If 'connection' exists, check if it has a 'socket' property.
   const connectionSocket = connection && connection.socket;

   // Return the first available IP address or null if none is found.
   return (
      // Check the 'x-original-forwarded-for' header for the client's IP.
      // This is typically used in environments with reverse proxies or load balancers.
      (headers && headers["x-original-forwarded-for"]) ||
      // Fallback to 'remoteAddress' in the connection object.
      (connection && connection.remoteAddress) ||
      // Fallback to 'remoteAddress' in the socket object.
      (socket && socket.remoteAddress) ||
      // Fallback to 'remoteAddress' in the connection's nested socket object.
      (connectionSocket && connectionSocket.remoteAddress) ||
      // If none of the above succeed, return null.
      null
   );
}

/**
 * Adds either a single object {field: msg} or an array of objects to a target array.
 *
 * @param {Array} arr The array to which objects should be added.
 * @param {string} field The field name for the object.
 * @param {any|Array} err Either a single message to add, or an array of messages to add.
 * @returns {Array} The modified arr (for chaining, if desired).
 */
function addErrors(arr, field, err) {
   if (!Array.isArray(arr)) {
      throw new TypeError("arr must be an array.");
   }

   if (typeof field !== "string") {
      throw new TypeError("field must be a string.");
   }

   if (Array.isArray(err)) {
      err.forEach((msg) => {
         arr.push({ [field]: msg }); // Push an object for each message in the array
      });
   } else {
      if (err) {
         arr.push({ [field]: err }); // Push a single object
      }
   }

   return arr; // Return the modified array for chaining
}

async function addToAuditLog(req, httpCode, message, content) {
   const ip = getIp(req);
   if (false && ip === "::1") {
      return;
   }
   console.error("Error: ", content); // Log the IP address for debugging
   return;

   if (!req.user) {
      req.user = { id: null, email: null };
   }
   const { data, error } = await supabase.from("auditLog").insert([
      {
         userId: req.user.id,
         email: req.user.email,
         ipAddress: ip,
         httpCode: httpCode.code,
         httpDesc: httpCode.desc,
         httpMethod: req.method,
         httpEndpoint: req.url,
         returnMessage: message,
         content: content || null,
      },
   ]);

   if (error) {
      console.error("Error inserting auditLog record:", error);
   }
}
module.exports = {
   sendRes,
   getIp,
   addErrors,
};
