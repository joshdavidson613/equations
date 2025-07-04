const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates work done based on force, displacement, and angle. W = F * Δs * cos(θ).
 * Assumes F and Δs are magnitudes, and θ is the angle between their directions. If F or Δs
 * are components, the formula is valid as dot product of vectors.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F). Can be positive, negative, or zero (as a component).
 * @param {number} params.deltaS - Displacement (Δs). Can be positive, negative, or zero (as a component).
 * @param {number} params.theta - Angle between force and displacement vectors (theta in radians). Can be any angle.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Work done (W).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateWork = ({ F, deltaS, theta, digits = 4 }) => {
   // Force F can be positive, negative, or zero (as a component). No specific check needed.
   validateNumber(F, "F");
   // Displacement deltaS can be positive, negative, or zero (as a component). No specific check needed.
   validateNumber(deltaS, "deltaS");
   // Angle theta can be any angle. No specific check needed for theta.
   validateNumber(theta, "theta");
   return formatNumber(F * deltaS * Math.cos(theta), digits);
};

/**
 * Calculates kinetic energy using KE = 0.5 * m * v^2.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m). Must be non-negative.
 * @param {number} params.v - Velocity (v). Can be positive, negative, or zero (as a component).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Kinetic energy (KE). Will be non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateKineticEnergy = ({ m, v, digits = 4 }) => {
   // Mass m must be non-negative.
   validateNumber(m, "m", { checkNonNegative: true });
   // Velocity v can be positive, negative, or zero (as a component). v^2 makes the sign irrelevant for KE magnitude. No specific check needed for v.
   validateNumber(v, "v");
   return formatNumber(0.5 * m * v * v, digits);
};

/**
 * Calculates kinetic energy from momentum using KE = p^2 / (2 * m).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.p - Momentum (p). Can be positive, negative, or zero (as a component).
 * @param {number} params.m - Mass (m). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Kinetic energy (KE). Will be non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateKineticEnergyFromMomentum = ({ p, m, digits = 4 }) => {
   // Momentum p can be positive, negative, or zero (as a component). p^2 makes the sign irrelevant for KE magnitude. No specific check needed for p.
   validateNumber(p, "p");
   // Mass m must be positive (in denominator).
   validateNumber(m, "m", { checkPositive: true });
   return formatNumber((p * p) / (2 * m), digits);
};

/**
 * Calculates gravitational potential energy change using ΔPE = mgΔh.
 * Assumes g and Δh are vector components along the same axis.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m). Must be non-negative.
 * @param {number} params.g - Acceleration due to gravity (g). Can be positive or negative (as a component).
 * @param {number} params.deltaH - Change in height (Δh). Can be positive, negative, or zero.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Gravitational potential energy change (ΔPE).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateGravitationalPotentialEnergy = ({ m, g, deltaH, digits = 4 }) => {
   // Mass m must be non-negative.
   validateNumber(m, "m", { checkNonNegative: true });
   // Acceleration due to gravity g can be positive or negative (as a component). No specific check needed for g.
   validateNumber(g, "g");
   // Change in height deltaH can be positive, negative, or zero. No specific check needed for deltaH.
   validateNumber(deltaH, "deltaH");
   return formatNumber(m * g * deltaH, digits);
};

/**
 * Calculates efficiency using η = W_out / E_in.
 * Where W_out is useful work output and E_in is total energy input (typically positive magnitude).
 * Efficiency is usually between 0 and 1 (or 0% and 100%).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.Wout - Useful Work output (W_out). Can be positive, negative, or zero.
 * @param {number} params.Ein - Total Energy input (E_in). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Efficiency (η).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateEfficiency = ({ Wout, Ein, digits = 4 }) => {
   // Useful Work output Wout can be positive, negative, or zero. No specific check needed.
   validateNumber(Wout, "Wout");
   // Total Energy input Ein must be positive (in denominator).
   validateNumber(Ein, "Ein", { checkPositive: true });
   // Physical constraint |Wout| <= |Ein| for efficiency <= 1 is not enforced by validateNumber.
   return formatNumber(Wout / Ein, digits);
};

/**
 * Calculates average power using P_avg = ΔW / Δt.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.deltaW - Change in work (ΔW). Can be positive, negative, or zero.
 * @param {number} params.deltaT - Time interval (Δt). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Average Power (P_avg).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculatePower = ({ deltaW, deltaT, digits = 4 }) => {
   // Change in work deltaW can be positive, negative, or zero. No specific check needed.
   validateNumber(deltaW, "deltaW");
   // Time interval deltaT must be positive (in denominator, duration).
   validateNumber(deltaT, "deltaT", { checkPositive: true });
   return formatNumber(deltaW / deltaT, digits);
};

/**
 * Calculates instantaneous power from force and velocity using P = Fv cos(θ).
 * Assumes F and v are magnitudes, and θ is the angle between their directions. If F or v
 * are components, the formula is valid as dot product of vectors.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F). Can be positive, negative, or zero (as a component).
 * @param {number} params.v - Velocity (v). Can be positive, negative, or zero (as a component).
 * @param {number} params.theta - Angle between force and velocity vectors (theta in radians). Can be any angle.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Instantaneous Power (P).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculatePowerVelocity = ({ F, v, theta, digits = 4 }) => {
   // Force F can be positive, negative, or zero (as a component). No specific check needed.
   validateNumber(F, "F");
   // Velocity v can be positive, negative, or zero (as a component). No specific check needed.
   validateNumber(v, "v");
   // Angle theta can be any angle. No specific check needed for theta.
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