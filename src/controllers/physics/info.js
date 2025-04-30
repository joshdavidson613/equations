const express = require("express");
const infoRouter = express.Router();
const { sendRes } = require("../../utils/httpUtils");
const dbUtils = require("../../utils/dbUtils.js");
// --- Calculation Functions --- (Keep these as they were)



/**
 * @swagger
 * /physics/{formula_id}/{language_code}:
 *   get:
 *     summary: Get formula information by ID and language
 *     description: Retrieves details for a specific formula based on its unique ID and the desired language.
 *                  Note - The language is extracted from the 'language_code' path parameter. The internal logic shown
 *                  in the code snippet also looks at a 'lang' query parameter, but this Swagger definition
 *                  documents the primary path parameters.
 *     tags:
 *       - Physics - Information
 *     parameters:
 *       - in: path
 *         name: formula_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the formula (e.g., 'centripetal-acceleration') which is the endpoint 
 *                      of the post request to generate a calculation.
 *                       
 *         example: centripetal-acceleration
 *       - in: path
 *         name: language_code
 *         schema:
 *           type: string
 *           # === Add the enum here to specify allowed values ===
 *           enum:
 *             - en
 *             - es
 *             - fr
 *             - de
 *             - it
 *             - ja
 *             - pl
 *             - nl
 *             - zh
 *             - he
 *             - ar
 *             - ru
 *             - pt
 *             - ko
 *             - tr
 *             - ur
 *           # ================================================
 *         required: true
 *         description: The language code for the formula details. Select from the supported list.
 *     responses:
 *       200:
 *         description: Successful response with formula details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subject:
 *                   type: string
 *                   description: The subject the formula belongs to.
 *                 formula_id:
 *                   type: string
 *                   description: The ID of the formula.
 *                 language_code:
 *                   type: string
 *                   description: The language code of the returned details (Note - Code uses 'lang' query param or defaults 'en').
 *               # Example of a successful response body (assuming the internal 'body' object structure)
 *               example:
 *                 subject: Physics
 *                 formula_id: centripetal-acceleration
 *                 language_code: en # Or 'es', 'fr' etc. based on request/logic
 *       400:
 *         description: Bad Request - Formula ID is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error.
 *               example:
 *                 error: Formula ID is required.
 *       # Add other potential responses like 404 Not Found if you implement that logic
 */infoRouter.get("/:formula_id/:language_code", async (req, res) => {
    const formula_id = req.params.formula_id;
    const language_code = req.params.language_code || "en"; // Default to English if not provided
  
    if(!formula_id){
        return sendRes(res, 400, { error: "Formula ID is required." });
    }
    const body = {
      subject: "Physics",
      formula_id: formula_id,
      language_code: language_code || "en", // Default to English
   };
   req.body = body; // Set the request body to the properties object
   const fields =['name', 'formula_id', 'language_code', 'formula_text', 'variables', 'description', 'subject', 'topic'];
   await dbUtils.getByProperties(req, res, "explanations",fields ); //search properties are stuffed into req.body;


});
module.exports = infoRouter;
