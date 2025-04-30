const {validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates the centripetal acceleration of an object in circular motion.
 *
 * @param {object} params - An object containing the velocity and radius.
 * @param {number} params.v - The velocity of the object (m/s).
 * @param {number} params.r - The radius of the circular path (m).
 * @returns {number} The centripetal acceleration (m/s^2).
 * @throws {Error} If velocity or radius is not a number.
 * @throws {Error} If the radius is zero.
 */
const calculateCentripetalAcceleration = ({ v, r  , digits = 4}) => {
   validateNumber(v, "v");
   validateNumber(r, "r");
   if (r === 0) {
      throw new Error("Radius (r) cannot be zero.");
   }
   return formatNumber((v * v) / r, digits);
};


/**
 * Calculates the centripetal acceleration using angular velocity and radius.
 *
   return formatNumber(formatNumber(omega * omega * r, digits), digits);
 * @param {number} r - The radius of the circular path (in meters).
 * @returns {number} The centripetal acceleration (in meters per second squared).  Returns a negative value, indicating that the acceleration is directed towards the center.
 * @throws {Error} If omega or r are not numbers.
 */
const calculateCentripetalAccelerationAngular = ({ omega, r  , digits = 4}) => {
   validateNumber(omega, "omega");
   validateNumber(r, "r");
   return formatNumber(omega * omega * r, digits);
};

class CircularMotionController {
   calculateCentripetalAcceleration = calculateCentripetalAcceleration;
   calculateCentripetalAccelerationAngular = calculateCentripetalAccelerationAngular;
}

module.exports = new CircularMotionController();