const { validateNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates velocity based on displacement and time.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.deltaS - Displacement (deltaS).
 * @param {number} params.deltaT - Time interval (deltaT).
 * @returns {number} Velocity (v).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateVelocity = ({ deltaS, deltaT  , digits = 4}) => {
   validateNumber(deltaS, "deltaS");
   validateNumber(deltaT, "deltaT");
   return formatNumber(deltaS / deltaT, digits);
};

/**
 * Calculates acceleration based on change in velocity and time.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.deltaV - Change in velocity (deltaV).
 * @param {number} params.deltaT - Time interval (deltaT).
 * @returns {number} Acceleration (a).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateAcceleration = ({ deltaV, deltaT  , digits = 4}) => {
   validateNumber(deltaV, "deltaV");
   validateNumber(deltaT, "deltaT");
   return formatNumber(deltaV / deltaT, digits);
};

/**
 * Calculates final velocity using v = v0 + at.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.v0 - Initial velocity (v0).
 * @param {number} params.a - Acceleration (a).
 * @param {number} params.t - Time (t).
 * @returns {number} Final velocity (v).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateMotionV = ({ v0, a, t  , digits = 4}) => {
   validateNumber(v0, "v0");
   validateNumber(a, "a");
   validateNumber(t, "t");
   return formatNumber(v0 + a * t, digits);
};

/**
 * Calculates the position based on initial position, initial velocity, time, and acceleration.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.s0 - Initial position (s0).
 * @param {number} params.v0 - Initial velocity (v0).
 * @param {number} params.t - Time (t).
 * @param {number} params.a - Acceleration (a).
 * @returns {number} Final position (s).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateMotionS = ({ s0, v0, t, a  , digits = 4}) => {
   validateNumber(s0, "s0");
   validateNumber(v0, "v0");
   validateNumber(t, "t");
   validateNumber(a, "a");
   return formatNumber(s0 + v0 * t + 0.5 * a * t * t, digits);
};

/**
 * Calculates final velocity using v^2 = v0^2 + 2a(s - s0).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.v0 - Initial velocity (v0).
 * @param {number} params.a - Acceleration (a).
 * @param {number} params.s - Final position (s).
 * @param {number} params.s0 - Initial position (s0).
 * @returns {number} Final velocity squared.
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateMotionV2 = ({ v0, a, s, s0  , digits = 4}) => {
   validateNumber(v0, "v0");
   validateNumber(a, "a");
   validateNumber(s, "s");
   validateNumber(s0, "s0");
   return formatNumber(v0 * v0 + 2 * a * (s - s0), digits);
};

/**
 * Calculates the average velocity based on initial and final velocities.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.v - Final velocity (v).
 * @param {number} params.v0 - Initial velocity (v0).
 * @returns {number} Average velocity (v_avg).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateMotionVAvg = ({ v, v0  , digits = 4}) => {
   validateNumber(v, "v");
   validateNumber(v0, "v0");
   return formatNumber(0.5 * (v + v0), digits);
};

/**
 * Calculates force using F = ma.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m).
 * @param {number} params.a - Acceleration (a).
 * @returns {number} Force (F).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateForce = ({ m, a  , digits = 4}) => {
   validateNumber(m, "m");
   validateNumber(a, "a");
   return formatNumber(m * a, digits);
};

/**
 * Calculates weight using W = mg.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m).
 * @param {number} params.g - Acceleration due to gravity (g).
 * @returns {number} Weight (W).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateWeight = ({ m, g  , digits = 4}) => {
   validateNumber(m, "m");
   validateNumber(g, "g");
   return formatNumber(m * g, digits);
};

/**
 * Calculates maximum static friction using F_s = μ_s * N.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.muS - Coefficient of static friction (μ_s).
 * @param {number} params.N - Normal force (N).
 * @returns {number} Maximum static friction.
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateDryFrictionStaticMax = ({ muS, N  , digits = 4}) => {
   validateNumber(muS, "muS");
   validateNumber(N, "N");
   return formatNumber(muS * N, digits);
};

/**
 * Calculates kinetic friction using F_k = μ_k * N.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.muK - Coefficient of kinetic friction (μ_k).
 * @param {number} params.N - Normal force (N).
 * @returns {number} Kinetic friction.
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateDryFrictionKinetic = ({ muK, N  , digits = 4}) => {
   validateNumber(muK, "muK");
   validateNumber(N, "N");
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
