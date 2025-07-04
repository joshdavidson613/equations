const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates momentum using p = mv.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m).
 * @param {number} params.v - Velocity (v).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Momentum (p).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateMomentum = ({ m, v, digits = 4 }) => {
   // Mass must be non-negative.
   validateNumber(m, "m", { checkNonNegative: true });
   // Velocity can be positive, negative, or zero (it's a vector component). No specific check needed for v.
   validateNumber(v, "v");
   return formatNumber(m * v, digits);
};

/**
 * Calculates impulse using J = F * Δt (assuming constant force or the magnitude if F is force magnitude).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F).
 * @param {number} params.deltaT - Time interval (Δt).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Impulse (J).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateImpulse = ({ F, deltaT, digits = 4 }) => {
   // Force can be positive, negative, or zero (it's a vector component). No specific check needed for F.
   validateNumber(F, "F");
   // Time interval (duration) should be non-negative.
   validateNumber(deltaT, "deltaT", { checkNonNegative: true });
   return formatNumber(F * deltaT, digits);
};

/**
 * Validates impulse-momentum theorem: F * Δt = m * Δv.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F).
 * @param {number} params.deltaT - Time interval (Δt).
 * @param {number} params.m - Mass (m).
 * @param {number} params.deltaV - Change in velocity (Δv).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Formatted result of the equality check (1 for true, 0 for false).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateImpulseMomentum = ({ F, deltaT, m, deltaV, digits = 4 }) => {
   // Force can be positive, negative, or zero. No specific check needed for F.
   validateNumber(F, "F");
   // Time interval (duration) should be non-negative.
   validateNumber(deltaT, "deltaT", { checkNonNegative: true });
   // Mass must be non-negative.
   validateNumber(m, "m", { checkNonNegative: true });
   // Change in velocity can be positive, negative, or zero. No specific check needed for deltaV.
   validateNumber(deltaV, "deltaV");
   // Note: Formatting a boolean result (true/false) usually results in 1/0.
   // If exact equality is sensitive to floating point precision, you might need
   // a tolerance check instead of strict ===.
   return formatNumber(F * deltaT === m * deltaV, digits);
};

class momentumController {
   // Corrected class name
   calculateMomentum = calculateMomentum;
   calculateImpulse = calculateImpulse;
   calculateImpulseMomentum = calculateImpulseMomentum;
}

module.exports = new momentumController(); // Corrected class name
