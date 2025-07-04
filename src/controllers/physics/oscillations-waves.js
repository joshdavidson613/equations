const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates potential energy stored in a spring using PE = 0.5 * k * Δx^2.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Spring constant (k). Must be non-negative.
 * @param {number} params.deltaX - Displacement from equilibrium (Δx). Can be positive, negative, or zero.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Spring potential energy (PE). Will be non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateSpringPE = ({ k, deltaX, digits = 4 }) => {
   // Spring constant k must be non-negative.
   validateNumber(k, "k", { checkNonNegative: true });
   // Displacement deltaX can be positive, negative, or zero. No specific check needed for deltaX.
   validateNumber(deltaX, "deltaX");
   return formatNumber(0.5 * k * deltaX * deltaX, digits);
};

/**
 * Calculates the period of a simple harmonic oscillator (spring) using T = 2π√(m/k).
 * Requires m/k >= 0 and k != 0 for a real, finite period.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m). Must be non-negative.
 * @param {number} params.k - Spring constant (k). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Period (T). Will be non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateSHOPeriod = ({ m, k, digits = 4 }) => {
   // Mass m must be non-negative (inside sqrt numerator).
   validateNumber(m, "m", { checkNonNegative: true });
   // Spring constant k must be positive (inside sqrt denominator, cannot be zero).
   validateNumber(k, "k", { checkPositive: true });
   return formatNumber(2 * Math.PI * Math.sqrt(m / k), digits);
};

/**
 * Calculates period of a simple pendulum using T = 2π√(l/g).
 * Requires l/g >= 0 and g != 0 for a real, finite period.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.l - Length of the pendulum (l). Must be non-negative.
 * @param {number} params.g - Acceleration due to gravity (g). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Period (T). Will be non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateSimplePendulumPeriod = ({ l, g, digits = 4 }) => {
   // Length l must be non-negative (inside sqrt numerator).
   validateNumber(l, "l", { checkNonNegative: true });
   // Acceleration due to gravity g must be positive (inside sqrt denominator, cannot be zero).
   validateNumber(g, "g", { checkPositive: true });
   return formatNumber(2 * Math.PI * Math.sqrt(l / g), digits);
};

/**
 * Calculates frequency using f = 1/T.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.T - Period (T). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Frequency (f).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateFrequency = ({ T, digits = 4 }) => {
   // Period T must be positive (in denominator).
   validateNumber(T, "T", { checkPositive: true });
   return formatNumber(1 / T, digits);
};

/**
 * Calculates angular frequency using ω = 2πf.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.f - Frequency (f). Can be positive, negative, or zero.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Angular frequency (ω).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateAngularFrequency = ({ f, digits = 4 }) => {
   // Frequency f can be positive, negative, or zero. No specific check needed for f.
   validateNumber(f, "f");
   return formatNumber(2 * Math.PI * f, digits);
};

class oscillationsWavesController {
   // Corrected class name (assuming it should end in Controller)
   calculateSpringPE = calculateSpringPE;
   calculateSHOPeriod = calculateSHOPeriod;
   calculateSimplePendulumPeriod = calculateSimplePendulumPeriod;
   calculateFrequency = calculateFrequency;
   calculateAngularFrequency = calculateAngularFrequency;
}

module.exports = new oscillationsWavesController(); // Corrected class name
