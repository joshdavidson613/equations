const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary


/**
 * Calculates velocity based on displacement and time. v = Δs / Δt
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.deltaS - Displacement (Δs).
 * @param {number} params.deltaT - Time interval (Δt).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Velocity (v).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateVelocity = ({ deltaS, deltaT, digits = 4 }) => {
   // Displacement can be positive, negative, or zero. No specific check needed for deltaS.
   validateNumber(deltaS, "deltaS");
   // Time interval (duration) must be positive for a rate calculation (cannot be zero).
   validateNumber(deltaT, "deltaT", { checkPositive: true });
   return formatNumber(deltaS / deltaT, digits);
};

/**
 * Calculates acceleration based on change in velocity and time. a = Δv / Δt
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.deltaV - Change in velocity (Δv).
 * @param {number} params.deltaT - Time interval (Δt).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Acceleration (a).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateAcceleration = ({ deltaV, deltaT, digits = 4 }) => {
   // Change in velocity can be positive, negative, or zero. No specific check needed for deltaV.
   validateNumber(deltaV, "deltaV");
   // Time interval (duration) must be positive for a rate calculation (cannot be zero).
   validateNumber(deltaT, "deltaT", { checkPositive: true });
   return formatNumber(deltaV / deltaT, digits);
};

/**
 * Calculates final velocity using v = v0 + at.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.v0 - Initial velocity (v0).
 * @param {number} params.a - Acceleration (a).
 * @param {number} params.t - Time (t).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Final velocity (v).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateMotionV = ({ v0, a, t, digits = 4 }) => {
   // Initial velocity can be positive, negative, or zero. No specific check needed for v0.
   validateNumber(v0, "v0");
   // Acceleration can be positive, negative, or zero. No specific check needed for a.
   validateNumber(a, "a");
   // Time elapsed should be non-negative.
   validateNumber(t, "t", { checkNonNegative: true });
   return formatNumber(v0 + a * t, digits);
};

/**
 * Calculates the position based on initial position, initial velocity, time, and acceleration.
 * s = s0 + v0*t + 0.5*a*t^2
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.s0 - Initial position (s0).
 * @param {number} params.v0 - Initial velocity (v0).
 * @param {number} params.t - Time (t).
 * @param {number} params.a - Acceleration (a).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Final position (s).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateMotionS = ({ s0, v0, t, a, digits = 4 }) => {
   // Positions, initial velocity, and acceleration can be positive, negative, or zero. No specific checks needed.
   validateNumber(s0, "s0");
   validateNumber(v0, "v0");
   // Time elapsed should be non-negative.
   validateNumber(t, "t", { checkNonNegative: true });
   validateNumber(a, "a");
   return formatNumber(s0 + v0 * t + 0.5 * a * t * t, digits);
};

/**
 * Calculates final velocity squared using v^2 = v0^2 + 2a(s - s0).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.v0 - Initial velocity (v0).
 * @param {number} params.a - Acceleration (a).
 * @param {number} params.s - Final position (s).
 * @param {number} params.s0 - Initial position (s0).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Final velocity squared.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateMotionV2 = ({ v0, a, s, s0, digits = 4 }) => {
   // Velocities, acceleration, and positions can be positive, negative, or zero. No specific checks needed.
   validateNumber(v0, "v0");
   validateNumber(a, "a");
   validateNumber(s, "s");
   validateNumber(s0, "s0");
   // Note: The result v^2 should ideally be non-negative for real velocities,
   // but the inputs themselves don't strictly require constraints that guarantee this
   // if the physics is non-standard or the inputs represent an impossible scenario.
   return formatNumber(v0 * v0 + 2 * a * (s - s0), digits);
};

/**
 * Calculates the average velocity based on initial and final velocities.
 * v_avg = 0.5 * (v + v0)
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.v - Final velocity (v).
 * @param {number} params.v0 - Initial velocity (v0).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Average velocity (v_avg).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateMotionVAvg = ({ v, v0, digits = 4 }) => {
   // Velocities can be positive, negative, or zero. No specific checks needed.
   validateNumber(v, "v");
   validateNumber(v0, "v0");
   return formatNumber(0.5 * (v + v0), digits);
};

/**
 * Calculates force using F = ma.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m).
 * @param {number} params.a - Acceleration (a).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Force (F).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateForce = ({ m, a, digits = 4 }) => {
   // Mass must be non-negative.
   validateNumber(m, "m", { checkNonNegative: true });
   // Acceleration can be positive, negative, or zero. No specific check needed for a.
   validateNumber(a, "a");
   return formatNumber(m * a, digits);
};

/**
 * Calculates weight using W = mg.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m).
 * @param {number} params.g - Acceleration due to gravity (g).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Weight (W).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateWeight = ({ m, g, digits = 4 }) => {
   // Mass must be non-negative.
   validateNumber(m, "m", { checkNonNegative: true });
   // Acceleration due to gravity can be positive or negative depending on the coordinate system. No specific check needed for g.
   validateNumber(g, "g");
   return formatNumber(m * g, digits);
};

/**
 * Calculates maximum static friction using F_s_max = μ_s * N.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.muS - Coefficient of static friction (μ_s).
 * @param {number} params.N - Normal force (N).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Maximum static friction.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateDryFrictionStaticMax = ({ muS, N, digits = 4 }) => {
   // Coefficient of static friction must be non-negative. (Typically between 0 and ~1.5, but non-negative is the minimum physical constraint).
   validateNumber(muS, "muS", { checkNonNegative: true });
   // Normal force magnitude must be non-negative.
   validateNumber(N, "N", { checkNonNegative: true });
   return formatNumber(muS * N, digits);
};

/**
 * Calculates kinetic friction using F_k = μ_k * N.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.muK - Coefficient of kinetic friction (μ_k).
 * @param {number} params.N - Normal force (N).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Kinetic friction.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateDryFrictionKinetic = ({ muK, N, digits = 4 }) => {
   // Coefficient of kinetic friction must be non-negative. (Typically between 0 and ~1.5, but non-negative is the minimum physical constraint).
   validateNumber(muK, "muK", { checkNonNegative: true });
   // Normal force magnitude must be non-negative.
   validateNumber(N, "N", { checkNonNegative: true });
   return formatNumber(muK * N, digits);
};

class mechanicsController {
   calculateVelocity = calculateVelocity;
   calculateAcceleration = calculateAcceleration;
   calculateMotionV = calculateMotionV;
   calculateMotionS = calculateMotionS;
   calculateMotionV2 = calculateMotionV2;
   calculateMotionVAvg = calculateMotionVAvg;
   calculateForce = calculateForce;
   calculateWeight = calculateWeight;
   calculateDryFrictionStaticMax = calculateDryFrictionStaticMax;
   calculateDryFrictionKinetic = calculateDryFrictionKinetic;
}

module.exports = new mechanicsController();