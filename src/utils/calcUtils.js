const { sendRes } = require("./httpUtils"); // Import the sendRes function from responseUtils
const { httpCodes } = require("../enums/enums"); // Import the httpCodes object from httpUtils
// Helper middleware/function to handle calculation requests generically
// It expects the calculation function to accept a single object parameter (the request body).
// If the input includes a 'digits' parameter (a non-negative integer), the calculated result
// will be rounded to that many decimal places before being returned.
const handleCalculationRequest = (calculationFn) => {
   return (req, res) => {
      const inputs = req.body; // Pass the entire request body object to the calculation function

      try {
         // Call the calculation function with the parsed inputs
         let result = calculationFn(inputs); // Use 'let' as we might modify the result

         // Send the response with the (potentially rounded) result and the inputs
         sendRes(res, httpCodes.OK, "Calculation successful", {
            result: result,
            inputs: inputs, // Show inputs actually used (including defaults if applicable logic is in fn)
         });
      } catch (error) {
         // Log the error internally for debugging
         console.error(`Calculation Error on ${req.path}: ${error.message}`, { inputs: req.body });
         // Return a 400 Bad Request response with the error message to the client
         res.status(400).json({ error: error.message });
      }
   };
};

/**
 * Validates if a value is a finite number, and optionally checks for non-zero, positive, or integer constraints.
 * @param {any} value - The value to validate.
 * @param {string} name - The name of the value (for error messages).
 * @param {object} [options={}] - Validation options.
 * @param {boolean} [options.checkZero=false] - Throw error if value is zero.
 * @param {boolean} [options.checkPositive=false] - Throw error if value is not strictly positive (> 0).
 * @param {boolean} [options.checkNonNegative=false] - Throw error if value is negative (< 0).
 * @param {boolean} [options.checkInteger=false] - Throw error if value is not an integer.
 * @throws {Error} If the validation fails.
 */
const validateNumber = (value, name, options = {}) => {
   if (typeof value !== "number" || !isFinite(value)) {
      throw new Error(`${name} must be a finite number.`);
   }
   if (options.checkZero && value === 0) {
      throw new Error(`${name} cannot be zero.`);
   }
   if (options.checkPositive && value <= 0) {
      throw new Error(`${name} must be a positive number.`);
   }
   if (options.checkNonNegative && value < 0) {
      throw new Error(`${name} cannot be negative.`);
   }
   if (options.checkInteger && !Number.isInteger(value)) {
      throw new Error(`${name} must be an integer.`);
   }
};

function formatNumber(number, trailingDigits) {
    if (typeof number !== "number") {
      return "Invalid input: Number must be a number.";
   }

   if (typeof trailingDigits !== "number" || !Number.isInteger(trailingDigits) || trailingDigits < 0) {
      return "Invalid input: trailingDigits must be a non-negative integer.";
   }

   const trillion = 1e12; // 1 trillion
   const absNumber = Math.abs(number);

   if (number === 0) {
      return 0;
   }

   let exponent = 0;
   let regular = 0; // Initialize number to avoid reference errors

   //handles both positive and negative numbers
   if (absNumber >= trillion) {
      return Number(number.toExponential(trailingDigits)); // Format as x.xxx-e for large numbers
   }
   const strNumber = number.toFixed(trailingDigits); //Convert to string with trailing digits
  
   if ((absNumber < 1 && absNumber > 0) || (absNumber > -1 && absNumber < 0)) {
      let zeros = 0;
      for (let i = 0; i < strNumber.length; i++) {
         if (strNumber[i] === "0") {
            zeros++;
         }
      }
      if (zeros >= strNumber.length / 2) {
         //Check for at least 1/2 being zeros\
         exponent = Number(number.toExponential(trailingDigits));
         return exponent;
      } else {
         regular = Number(strNumber).toFixed(trailingDigits); //Convert back to number       
         return regular;
      }
   }
   regular = +Number(strNumber).toFixed(trailingDigits); //Convert back to number
   return regular; // otherwise, keep the decimal format
}

module.exports = { handleCalculationRequest, validateNumber, formatNumber }; // Export the middleware function for use in routes
