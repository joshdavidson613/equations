const { validateNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary




/**
 * Calculates potential energy stored in a spring using PE = 0.5 * k * Δx^2.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Spring constant (k).
 * @param {number} params.deltaX - Displacement from equilibrium (Δx).
 * @returns {number} Spring potential energy (PE).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateSpringPE = ({ k, deltaX  , digits = 4}) => {
   validateNumber(k, "k");
   validateNumber(deltaX, "deltaX");
   return formatNumber(0.5 * k * deltaX * deltaX, digits);
};

/**
 * Calculates the period of a simple harmonic oscillator (spring) using T = 2π√(m/k).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m).
 * @param {number} params.k - Spring constant (k).
 * @returns {number} Period (T).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateSHOPeriod = ({ m, k  , digits = 4}) => {
   validateNumber(m, "m");
   validateNumber(k, "k");
   return formatNumber(2 * Math.PI * Math.sqrt(m / k), digits);
};

/**
 * Calculates period of a simple pendulum using T = 2π√(l/g).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.l - Length of the pendulum (l).
 * @param {number} params.g - Acceleration due to gravity (g).
 * @returns {number} Period (T).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateSimplePendulumPeriod = ({ l, g  , digits = 4}) => {
   validateNumber(l, "l");
   validateNumber(g, "g");
   return formatNumber(2 * Math.PI * Math.sqrt(l / g), digits);
};

/**
 * Calculates frequency using f = 1/T.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.T - Period (T).
 * @returns {number} Frequency (f).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateFrequency = ({ T  , digits = 4}) => {
   validateNumber(T, "T");
   return formatNumber(1 / T, digits);
};

/**
 * Calculates angular frequency using ω = 2πf.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.f - Frequency (f).
 * @returns {number} Angular frequency (ω).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateAngularFrequency = ({ f  , digits = 4}) => {
   validateNumber(f, "f");
   return formatNumber(2 * Math.PI * f, digits);
};


class oscillationsWavesRouter {
   calculateSpringPE = calculateSpringPE;
   calculateSHOPeriod = calculateSHOPeriod;
   calculateSimplePendulumPeriod = calculateSimplePendulumPeriod;
   calculateFrequency = calculateFrequency;
   calculateAngularFrequency = calculateAngularFrequency;
}

module.exports = new oscillationsWavesRouter();
