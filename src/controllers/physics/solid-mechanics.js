const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates force of a spring using Hooke's Law: F = -k * Δx.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Spring constant (k). Must be non-negative.
 * @param {number} params.deltaX - Displacement from equilibrium (Δx). Can be positive, negative, or zero.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Spring force (F).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateHookesLaw = ({ k, deltaX, digits = 4 }) => {
   // Spring constant k must be non-negative for a standard spring.
   validateNumber(k, "k", { checkNonNegative: true });
   // Displacement deltaX can be positive, negative, or zero. No specific check needed for deltaX.
   validateNumber(deltaX, "deltaX");
   // Removed console.log
   return formatNumber(-k * deltaX, digits);
};

/**
 * Calculates Young's Modulus using E = (F * L0) / (A * ΔL).
 * Note: This is derived from Stress/Strain = (F/A) / (ΔL/L0).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F). Can be positive (tensile) or negative (compressive).
 * @param {number} params.deltaL - Change in length (ΔL). Can be positive or negative. Cannot be zero.
 * @param {number} params.A - Cross-sectional area (A). Must be positive.
 * @param {number} params.L0 - Original length (L0). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Young's Modulus (E).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateYoungsModulus = ({ F, deltaL, A, L0, digits = 4 }) => {
   // Force F can be positive or negative (tensile/compressive). No specific check needed.
   validateNumber(F, "F");
   // Change in length deltaL can be positive or negative, but cannot be zero (in denominator).
   validateNumber(deltaL, "deltaL", { checkZero: true });
   // Area A must be positive (in denominator).
   validateNumber(A, "A", { checkPositive: true });
   // Original length L0 must be positive (in numerator, typically length > 0).
   validateNumber(L0, "L0", { checkPositive: true });
   return formatNumber((F * L0) / (A * deltaL), digits);
};

/**
 * Calculates shear modulus using G = (F * y) / (A * Δx).
 * Note: This is derived from Shear Stress/Shear Strain = (F/A) / (Δx/y).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F). Can be positive or negative.
 * @param {number} params.deltaX - Shear displacement (Δx). Can be positive or negative. Cannot be zero.
 * @param {number} params.A - Area parallel to the force (A). Must be positive.
 * @param {number} params.y - Distance perpendicular to A over which shearing occurs (y). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Shear modulus (G).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateShearModulus = ({ F, deltaX, A, y, digits = 4 }) => {
   // Force F can be positive or negative. No specific check needed.
   validateNumber(F, "F");
   // Shear displacement deltaX can be positive or negative, but cannot be zero (in denominator).
   validateNumber(deltaX, "deltaX", { checkZero: true });
   // Area A must be positive (in denominator).
   validateNumber(A, "A", { checkPositive: true });
   // Distance y must be positive (in numerator, typically thickness > 0).
   validateNumber(y, "y", { checkPositive: true });
   return formatNumber((F * y) / (A * deltaX), digits);
};

/**
 * Calculates bulk modulus using K = -(ΔP) / (ΔV/V0) = -(F/A) / (ΔV/V0).
 * Note: The provided formula is K = (F * V0) / (A * ΔV), which is the magnitude and assumes F/A represents the pressure change magnitude.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F). Can be positive or negative (representing change in force or pressure magnitude * A).
 * @param {number} params.deltaV - Change in volume (ΔV). Can be positive or negative. Cannot be zero.
 * @param {number} params.A - Area (A). Must be positive.
 * @param {number} params.V0 - Original volume (V0). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Bulk modulus (K). Returns positive value assuming F/A and deltaV have opposite signs for compression (positive K) or expansion (negative K might be used for stability).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateBulkModulus = ({ F, deltaV, A, V0, digits = 4 }) => {
   // Force F can be positive or negative. No specific check needed.
   validateNumber(F, "F");
   // Change in volume deltaV can be positive or negative, but cannot be zero (in denominator).
   validateNumber(deltaV, "deltaV", { checkZero: true });
   // Area A must be positive (in denominator).
   validateNumber(A, "A", { checkPositive: true });
   // Original volume V0 must be positive (in numerator, volume > 0).
   validateNumber(V0, "V0", { checkPositive: true });
   return formatNumber((F * V0) / (A * deltaV), digits);
};

class solidMechanicsController {
   calculateHookesLaw = calculateHookesLaw;
   calculateYoungsModulus = calculateYoungsModulus;
   calculateShearModulus = calculateShearModulus;
   calculateBulkModulus = calculateBulkModulus;
}

module.exports = new solidMechanicsController();