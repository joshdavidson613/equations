const {validateNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates momentum using p = mv.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m).
 * @param {number} params.v - Velocity (v).
 * @returns {number} Momentum (p).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateMomentum = ({ m, v  , digits = 4}) => {
    validateNumber(m, "m");
    validateNumber(v, "v");
    return formatNumber(m * v, digits);
 };
 
 /**
  * Calculates impulse using J = F * Δt.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.F - Force (F).
  * @param {number} params.deltaT - Time interval (Δt).
  * @returns {number} Impulse (J).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateImpulse = ({ F, deltaT  , digits = 4}) => {
    validateNumber(F, "F");
    validateNumber(deltaT, "deltaT");
    return formatNumber(F * deltaT, digits);
 };
 
 /**
  * Validates impulse-momentum theorem.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.F - Force (F).
  * @param {number} params.deltaT - Time interval (Δt).
  * @param {number} params.m - Mass (m).
  * @param {number} params.deltaV - Change in velocity (Δv).
  * @returns {boolean} True if impulse equals change in momentum.
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateImpulseMomentum = ({ F, deltaT, m, deltaV  , digits = 4}) => {
    validateNumber(F, "F");
    validateNumber(deltaT, "deltaT");
    validateNumber(m, "m");
    validateNumber(deltaV, "deltaV");
    return formatNumber(F * deltaT === m * deltaV, digits);
 };
class momenttumController {
    calculateMomentum = calculateMomentum;
    calculateImpulse = calculateImpulse;
    calculateImpulseMomentum = calculateImpulseMomentum;
    
}

module.exports = new momenttumController();