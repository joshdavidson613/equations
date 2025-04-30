const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates work done based on force, displacement, and angle.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F).
 * @param {number} params.deltaS - Displacement (deltaS).
 * @param {number} params.theta - Angle between force and displacement (theta in radians).
 * @returns {number} Work done (W).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateWork = ({ F, deltaS, theta, digits = 4 }) => {
   validateNumber(F, "F");
   validateNumber(deltaS, "deltaS");
   validateNumber(theta, "theta");
   return formatNumber(F * deltaS * Math.cos(theta), digits);
};

/**
 * Calculates kinetic energy using KE = 0.5 * m * v^2.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m).
 * @param {number} params.v - Velocity (v).
 * @returns {number} Kinetic energy (KE).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateKineticEnergy = ({ m, v, digits = 4 }) => {
   validateNumber(m, "m");
   validateNumber(v, "v");
   return formatNumber(0.5 * m * v * v, digits);
};

/**
 * Calculates kinetic energy from momentum.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.p - Momentum (p).
 * @param {number} params.m - Mass (m).
 * @returns {number} Kinetic energy (KE).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateKineticEnergyFromMomentum = ({ p, m, digits = 4 }) => {
   validateNumber(p, "p");
   validateNumber(m, "m");
   return formatNumber((p * p) / (2 * m), digits);
};

/**
 * Calculates gravitational potential energy using PE = mgh.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m).
 * @param {number} params.g - Acceleration due to gravity (g).
 * @param {number} params.deltaH - Change in height (Δh).
 * @returns {number} Gravitational potential energy (PE).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateGravitationalPotentialEnergy = ({ m, g, deltaH, digits = 4 }) => {
   validateNumber(m, "m");
   validateNumber(g, "g");
   validateNumber(deltaH, "deltaH");
   return formatNumber(m * g * deltaH, digits);
};

/**
 * Calculates efficiency using η = W_out / W_in.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.Wout - Work output (W_out).
 * @param {number} params.Ein - Work input (W_in).
 * @returns {number} Efficiency (η).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateEfficiency = ({ Wout, Ein, digits = 4 }) => {
   validateNumber(Wout, "Wout");
   validateNumber(Ein, "Ein");
   return formatNumber(Wout / Ein, digits);
};

/**
 * Calculates power using P = ΔW / Δt.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.deltaW - Change in work (ΔW).
 * @param {number} params.deltaT - Time interval (Δt).
 * @returns {number} Power (P).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculatePower = ({ deltaW, deltaT, digits = 4 }) => {
   validateNumber(deltaW, "deltaW");
   validateNumber(deltaT, "deltaT");
   return formatNumber(deltaW / deltaT, digits);
};

/**
 * Calculates power from force and velocity using P = Fv cos(θ).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F).
 * @param {number} params.v - Velocity (v).
 * @param {number} params.theta - Angle between force and velocity (theta in radians).
 * @returns {number} Power (P).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculatePowerVelocity = ({ F, v, theta, digits = 4 }) => {
   validateNumber(F, "F");
   validateNumber(v, "v");
   validateNumber(theta, "theta");
   return formatNumber(F * v * Math.cos(theta), digits);
};

class workEnergyController {
   calculateWork = calculateWork;
   calculateKineticEnergy = calculateKineticEnergy;
   calculateKineticEnergyFromMomentum = calculateKineticEnergyFromMomentum;
   calculateGravitationalPotentialEnergy = calculateGravitationalPotentialEnergy;
   calculateEfficiency = calculateEfficiency;
   calculatePower = calculatePower;
   calculatePowerVelocity = calculatePowerVelocity;
}

module.exports = new workEnergyController();
