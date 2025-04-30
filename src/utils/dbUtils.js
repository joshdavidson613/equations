/**
 * @file dbUtils.js
 * @description This module provides utility functions for interacting with a Supabase database.
 * It includes functions for creating, updating, deleting, and retrieving records from the database.
 * It also handles error responses and formats the output for better readability.
 *
 * @requires supabase-js
 * @requires ../config/supabase.js
 * @requires ../utils/httpUtils.js
 * @requires ../enums/enums.js
 */

const { httpCodes } = require("../enums/enums.js");
const supabaseConfig = require("../config/supabase.js");
const { sendRes } = require("../utils/httpUtils.js");

const supabase = supabaseConfig.supabase;

function getObjName(tableName) {
   switch (tableName) {
      case "explanations":
         return "explanation";
         break;
      default:
         return tableName; // Fallback to the table name itself if no match found
   }
}

async function createRecord(req, res, tableName) {
   try {
      const requestData = req.body;
      const objName = getObjName(tableName);
      const { data, error } = await supabase.from(tableName).insert([requestData]).select("*").maybeSingle();

      if (error) {
         return sendRes(res, httpCodes.InternalServerError, `Error creating ${objName}`, error); // Fallback in case the previous return is ignored
      }
      if (!data) {
         return sendRes(res, httpCodes.NotFound, `Unable to find ${objName}`, null); // Return a 404 Not Found if no object was created
      }
      return sendRes(res, httpCodes.Created, `Successfully created ${objName}`, data); // Return a 201 Created response with the created object
   } catch (error) {
      return sendRes(res, httpCodes.InternalServerError, `Error creating ${objName}`, error); // Fallback in case the previous return is ignored
   }
}

/** */
async function updateRecord(req, res, tableName) {
   try {
      const { id } = req.params;
      const updateData = req.body;
      const objName = getObjName(tableName); // Get the object name for better error messages
      if (!id) {
         // Return a 400 Bad Request if no ID was provided in the request parameters
         return sendRes(res, httpCodes.BadRequest, `Missing id parameter for ${objName}`, null);
      }
      const { data, error } = await supabase
         .from(tableName)
         .update([updateData])
         .eq("id", id)
         .select("*")
         .maybeSingle();

      if (error) {
         return sendRes(res, httpCodes.InternalServerError, `Error updating ${objName} with id of ${id}`, error); // Fallback in case the previous return is ignored
      }
      if (!data) {
         return sendRes(res, httpCodes.NotFound, `Unable to find ${objName} with id of ${id}`, null); // Return a 404 Not Found if no profile was found
      }
      return sendRes(res, httpCodes.OK, `Successfully updated ${objName}`, data); // Return a 200 OK response with the profile data
   } catch (error) {
      sendRes(res, httpCodes.InternalServerError, `Error updating ${objName} with id of ${id}`, error);
   }
}

async function deleteRecord(req, res, tableName) {
   try {
      const { id } = req.params;
      const objName = getObjName(tableName); // Get the object name for better error messages
      if (!id) {
         // Return a 400 Bad Request if no ID was provided in the request parameters
         return sendRes(res, httpCodes.BadRequest, `Missing id parameter for ${objName}`, null);
      }

      //select("id") is used to return the id of the deleted object, so we can check if it was deleted or not
      const response = await supabase.from(tableName).delete().select("id").eq("id", id);

      if (response.data.length == 0) {
         return sendRes(res, httpCodes.NotFound, `Unable to delete ${objName} with id of ${id}`, null); // Return a 404 Not Found if no profile was found
      }
      if (response.data.length == 1) {
         return sendRes(res, httpCodes.OK, `Successfully deleted ${objName} with id of ${id}`, null);
      }
      return sendRes(res, httpCodes.InternalServerError, `Unable to delete ${objName} with id of ${id}`, response); // Return a 404 Not Found if no profile was found
   } catch (error) {
      sendRes(res, httpCodes.InternalServerError, `Error deleting ${objName} with id of ${id}`, error);
   }
}

async function getById(req, res, tableName) {
   try {
      const { id } = req.params;
      const objName = getObjName(tableName); // Get the object name for better error messages

      if (!id) {
         return sendRes(res, httpCodes.BadRequest, `Missing id parameter for ${objName}`, null); // Return a 400 Bad Request if no ID was provided
      }

      const { data, error } = await supabase.from(tableName).select("*").eq("id", id).maybeSingle(); // if .single then 0 rows will throw an error, maybeSingle will return 0 or 1 row or throw an error

      if (error) {
         return sendRes(res, httpCodes.InternalServerError, `Error getting ${objName} with id of ${id}`, error); // Fallback in case the previous return is ignored
      }
      if (!data) {
         return sendRes(res, httpCodes.NotFound, `Unable to find ${objName} with id of ${id}`, null); // Return a 404 Not Found if no profile was found
      }
      return sendRes(res, httpCodes.OK, `Successfully retrieved ${objName} `, data); // Return a 200 OK response with the profile data
   } catch (error) {
      return sendRes(res, httpCodes.InternalServerError, `Error finding ${objName} with id of ${id}`, error); // Fallback in case the previous return is ignored
   }
}

/**
 * Finds a single record in a table matching ALL properties provided in the request body.
 * @param {object} req - Express request object, expecting search criteria in req.body
 * @param {object} res - Express response object
 * @param {string} tableName - The name of the Supabase table to query
 */
/**
 * Finds a single record in a table matching ALL properties provided in the request body,
 * returning only the specified fields.
 * @param {object} req - Express request object, expecting search criteria in req.body
 * @param {object} res - Express response object
 * @param {string} tableName - The name of the Supabase table to query
 * @param {string[]} [fieldsToSelect=['*']] - Optional array of column names to select. Defaults to all columns ('*').
 */
async function getByProperties(req, res, tableName, fieldsToSelect) {
   let criteria = req.body; // Keep criteria accessible for error logging in catch block
   const objName = getObjName(tableName); // Get the object name for better error messages

   try {
      // --- Input Validation ---
      // Validate criteria
      if (!criteria || typeof criteria !== "object" || Object.keys(criteria).length === 0) {
         return sendRes(res, httpCodes.BadRequest, `Missing search criteria in request body for ${objName}`, null);
      }

      // Validate and prepare fieldsToSelect
      let selectString;
      // Check if fieldsToSelect is provided, is an array, and is not empty
      if (fieldsToSelect && Array.isArray(fieldsToSelect) && fieldsToSelect.length > 0) {
         // Basic validation: Ensure it doesn't contain empty strings or non-strings (optional but good practice)
         if (fieldsToSelect.some((field) => typeof field !== "string" || field.trim() === "")) {
            console.warn(
               `Invalid field names provided for ${tableName}. Falling back to selecting all columns ('*'). Fields:`,
               fieldsToSelect
            );
            selectString = "*"; // Fallback on invalid input
         } else {
            selectString = fieldsToSelect.join(","); // e.g., "id,name,email"
         }
      } else {
         // Default to selecting all columns if no specific fields are provided, it's not an array, or it's empty
         // console.warn(`No specific fields provided or invalid format for ${tableName}, selecting all columns ('*').`); // Optional: Log this if needed
         selectString = "*";
      }

      // --- Start building the query ---
      let query = supabase.from(tableName).select(selectString); // Use the generated select string

      // Dynamically add .eq() filters for each property in the criteria object
      for (const key in criteria) {
         if (Object.hasOwnProperty.call(criteria, key)) {
            query = query.eq(key, criteria[key]);
         }
      }

      // --- Execute the Query ---
      // Using maybeSingle() as before, assuming you want 0 or 1 result.
      // Adjust if you expect multiple results (remove maybeSingle, data will be an array).
      const { data, error } = await query.maybeSingle();

      // --- Handle Results ---
      if (error) {
         console.error(
            `Supabase error for ${objName} with criteria:`,
            criteria,
            `Selected fields: ${selectString}`,
            error
         );
         return sendRes(
            res,
            httpCodes.InternalServerError,
            `Error finding ${objName} matching specified criteria.`,
            criteria
         );
      }

      if (!data) {
         return sendRes(res, httpCodes.NotFound, `Unable to find ${objName} matching the specified criteria.`, {criteria: criteria});
      }

      // Success! Found a unique record matching all criteria with selected fields
      return sendRes(res, httpCodes.OK, `Successfully retrieved ${objName}`, data);
   } catch (error) {
      console.error(`Unexpected error in getByProperties for ${objName} with criteria:`, criteria, error);
      return sendRes(
         res,
         httpCodes.InternalServerError,
         `An unexpected error occurred while finding ${objName}.`,
         null
      );
   }
}

async function getByTeamId(req, res, tableName) {
   try {
      const { id } = req.params;
      const objName = getObjName(tableName); // Get the object name for better error messages

      if (!id) {
         return sendRes(res, httpCodes.BadRequest, `Missing team id parameter for ${objName}`, null); // Return a 400 Bad Request if no ID was provided
      }

      const { data, error } = await supabase.from(tableName).select("*").eq("teamId", id).maybeSingle(); // if .single then 0 rows will throw an error, maybeSingle will return 0 or 1 row or throw an error

      if (error) {
         return sendRes(res, httpCodes.InternalServerError, `Error getting ${objName} with team id of ${id}`, error); // Fallback in case the previous return is ignored
      }
      if (!data) {
         return sendRes(res, httpCodes.NotFound, `Unable to find ${objName} with team id of ${id}`, null); // Return a 404 Not Found if no profile was found
      }
      return sendRes(res, httpCodes.OK, `Successfully retrieved ${objName} `, data); // Return a 200 OK response with the profile data
   } catch (error) {
      return sendRes(res, httpCodes.InternalServerError, `Error finding ${objName} with team id of ${id}`, error); // Fallback in case the previous return is ignored
   }
}

async function getByOwnerId(req, res, tableName) {
   try {
      const { id } = req.params;
      const objName = getObjName(tableName); // Get the object name for better error messages

      if (!id) {
         return sendRes(res, httpCodes.BadRequest, `Missing owner id parameter for ${objName}`, null); // Return a 400 Bad Request if no ID was provided
      }

      const { data, error } = await supabase.from(tableName).select("*").eq("ownerId", id).maybeSingle(); // if .single then 0 rows will throw an error, maybeSingle will return 0 or 1 row or throw an error

      if (error) {
         return sendRes(res, httpCodes.InternalServerError, `Error getting ${objName} with owner id of ${id}`, error); // Fallback in case the previous return is ignored
      }
      if (!data) {
         return sendRes(res, httpCodes.NotFound, `Unable to find ${objName} with owner id of ${id}`, null); // Return a 404 Not Found if no profile was found
      }
      return sendRes(res, httpCodes.OK, `Successfully retrieved ${objName} `, data); // Return a 200 OK response with the profile data
   } catch (error) {
      return sendRes(res, httpCodes.InternalServerError, `Error finding ${objName} with owner id of ${id}`, error); // Fallback in case the previous return is ignored
   }
}

async function getAll(req, res, tableName) {
   let objName = getObjName(tableName); // Get the object name for better error messages
   if (objName == "country") {
      objName == "countries";
   } else {
      objName = objName + "s";
   }
   try {
      const { data, error } = await supabase.from(tableName).select("*");
      if (error) {
         return sendRes(res, httpCodes.InternalServerError, `Error getting all ${objName}`, error); // Fallback in case the previous return is ignored
      }

      return sendRes(res, httpCodes.OK, `Successfully retrieved all ${objName}`, data); // Return a 200 OK response with the list of all objects
   } catch (error) {
      return sendRes(res, httpCodes.InternalServerError, `Error getting all ${objName}`, error); // Fallback in case the previous return is ignored
   }
}

module.exports = {
   createRecord,
   updateRecord,
   deleteRecord,
   getById,
   getByProperties,
   getByTeamId,
   getByOwnerId,
   getAll,
};
