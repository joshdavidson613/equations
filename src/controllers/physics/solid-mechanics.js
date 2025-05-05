const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates force of a spring using Hooke's Law: F = -k * Δx.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Spring constant (k).
 * @param {number} params.deltaX - Displacement from equilibrium (Δx).
 * @returns {number} Spring force (F).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateHookesLaw = ({ k, deltaX, digits = 4 }) => {
   validateNumber(k, "k");
   validateNumber(deltaX, "deltaX");
   console.log(`Calculating Hooke's Law: F = -${k} * ${deltaX}`);
   return formatNumber(-k * deltaX, digits);
};
/**
 * Calculates Young's Modulus using E = (F * L0) / (A * ΔL).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F).
 * @param {number} params.deltaL - Change in length (ΔL).
 * @param {number} params.A - Cross-sectional area (A).
 * @param {number} params.L0 - Original length (L0).
 * @returns {number} Young's Modulus (E).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateYoungsModulus = ({ F, deltaL, A, L0, digits = 4 }) => {
   validateNumber(F, "F");
   validateNumber(deltaL, "deltaL");
   validateNumber(A, "A");
   validateNumber(L0, "L0");
   return formatNumber((F * L0) / (A * deltaL), digits);
};

/**
 * Calculates shear modulus using G = (F * y) / (A * Δx).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F).
 * @param {number} params.deltaX - Change in length (Δx).
 * @param {number} params.A - Cross-sectional area (A).
 * @param {number} params.y - Displacement (y).
 * @returns {number} Shear modulus (G).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateShearModulus = ({ F, deltaX, A, y, digits = 4 }) => {
   validateNumber(F, "F");
   validateNumber(deltaX, "deltaX");
   validateNumber(A, "A");
   validateNumber(y, "y");
   return formatNumber((F * y) / (A * deltaX), digits);
};

/**
 * Calculates bulk modulus using K = (F * V0) / (A * ΔV).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F).
 * @param {number} params.deltaV - Change in volume (ΔV).
 * @param {number} params.A - Cross-sectional area (A).
 * @param {number} params.V0 - Original volume (V0).
 * @returns {number} Bulk modulus (K).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateBulkModulus = ({ F, deltaV, A, V0, digits = 4 }) => {
   validateNumber(F, "F");
   validateNumber(deltaV, "deltaV");
   validateNumber(A, "A");
   validateNumber(V0, "V0");
   return formatNumber((F * V0) / (A * deltaV), digits);
};

class solidMechanicsController {
   calculateHookesLaw = calculateHookesLaw;
   calculateYoungsModulus = calculateYoungsModulus;
   calculateShearModulus = calculateShearModulus;
   calculateBulkModulus = calculateBulkModulus;
}

module.exports = new solidMechanicsController();
