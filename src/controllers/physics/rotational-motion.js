const {validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates angular velocity based on change in angle and time.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.deltaTheta - Change in angle (Δθ).
 * @param {number} params.deltaT - Time interval (Δt).
 * @returns {number} Angular velocity (ω).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateAngularVelocity = ({ deltaTheta, deltaT  , digits = 4}) => {
    validateNumber(deltaTheta, "deltaTheta");
    validateNumber(deltaT, "deltaT", {checkZero: true}); // deltaT cannot be zero
    return formatNumber(deltaTheta / deltaT, digits);
 };
 
 /**
  * Calculates angular acceleration based on change in angular velocity and time.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.deltaOmega - Change in angular velocity (Δω).
  * @param {number} params.deltaT - Time interval (Δt).
  * @returns {number} Angular acceleration (α).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateAngularAcceleration = ({ deltaOmega, deltaT  , digits = 4}) => {
    validateNumber(deltaOmega, "deltaOmega");
    validateNumber(deltaT, "deltaT");
    return formatNumber(deltaOmega / deltaT, digits);
 };
 
 /**
  * Calculates final angular velocity using ω = ω0 + αt.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.omega0 - Initial angular velocity (ω0).
  * @param {number} params.alpha - Angular acceleration (α).
  * @param {number} params.t - Time (t).
  * @returns {number} Final angular velocity (ω).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateRotationOmega = ({ omega0, alpha, t  , digits = 4}) => {
    validateNumber(omega0, "omega0");
    validateNumber(alpha, "alpha");
    validateNumber(t, "t");
    return formatNumber(omega0 + alpha * t, digits);
 };
 
 /**
  * Calculates angular position using θ = θ0 + ω0t + 0.5αt^2.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.theta0 - Initial angular position (θ0).
  * @param {number} params.omega0 - Initial angular velocity (ω0).
  * @param {number} params.t - Time (t).
  * @param {number} params.alpha - Angular acceleration (α).
  * @returns {number} Final angular position (θ).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateRotationTheta = ({ theta0, omega0, t, alpha  , digits = 4}) => {
    validateNumber(theta0, "theta0");
    validateNumber(omega0, "omega0");
    validateNumber(t, "t");
    validateNumber(alpha, "alpha");
    return formatNumber(theta0 + omega0 * t + 0.5 * alpha * t * t, digits);
 };
 
 /**
  * Calculates angular velocity squared using ω0^2 + 2α(θ - θ0).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.omega0 - Initial angular velocity (ω0).
  * @param {number} params.alpha - Angular acceleration (α).
  * @param {number} params.theta - Final angular position (θ).
  * @param {number} params.theta0 - Initial angular position (θ0).
  * @returns {number} Angular velocity squared.
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateRotationOmega2 = ({ omega0, alpha, theta, theta0  , digits = 4}) => {
    validateNumber(omega0, "omega0");
    validateNumber(alpha, "alpha");
    validateNumber(theta, "theta");
    validateNumber(theta0, "theta0");
    return formatNumber(omega0 * omega0 + 2 * alpha * (theta - theta0), digits);
 };
 
 /**
  * Calculates average angular velocity based on initial and final angular velocities.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.omega - Final angular velocity (ω).
  * @param {number} params.omega0 - Initial angular velocity (ω0).
  * @returns {number} Average angular velocity (ω_avg).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateRotationOmegaAvg = ({ omega, omega0  , digits = 4}) => {
    validateNumber(omega, "omega");
    validateNumber(omega0, "omega0");
    return formatNumber(0.5 * (omega + omega0), digits);
 };
 
 /**
  * Calculates torque using τ = rF sin(θ).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.r - Radius (r).
  * @param {number} params.F - Force (F).
  * @param {number} params.theta - Angle between force and radius (theta in radians).
  * @returns {number} Torque (τ).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateTorque = ({ r, F, theta  , digits = 4}) => {
    validateNumber(r, "r");
    validateNumber(F, "F");
    validateNumber(theta, "theta");
    return formatNumber(r * F * Math.sin(theta), digits);
 };
 
 
 /**
  * Calculates rotational form of Newton's second law using τ = Iα.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.I - Moment of inertia (I).
  * @param {number} params.alpha - Angular acceleration (α).
  * @returns {number} Torque (τ).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculate2ndLawRotation = ({ I, alpha  , digits = 4}) => {
    validateNumber(I, "I");
    validateNumber(alpha, "alpha");
    return formatNumber(I * alpha, digits);
 };
 
 /**
  * Calculates moment of inertia for a point mass using I = mr^2.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.m - Mass (m).
  * @param {number} params.r - Distance from axis of rotation (r).
  * @returns {number} Moment of inertia (I).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateMomentOfInertia = ({ m, r  , digits = 4}) => {
    validateNumber(m, "m");
    validateNumber(r, "r");
    return formatNumber(m * r * r, digits); // Simplified for point mass
 };
 
 /**
  * Calculates rotational work using W = τΔθ.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.tau - Torque (τ).
  * @param {number} params.deltaTheta - Change in angular position (Δθ).
  * @returns {number} Rotational work (W).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateRotationalWork = ({ tau, deltaTheta  , digits = 4}) => {
    validateNumber(tau, "tau");
    validateNumber(deltaTheta, "deltaTheta");
    return formatNumber(tau * deltaTheta, digits);
 };
 
 /**
  * Calculates rotational power using P = τω cos(θ).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.tau - Torque (τ).
  * @param {number} params.omega - Angular velocity (ω).
  * @param {number} params.theta - Angle (theta in radians).
  * @returns {number} Rotational power (P).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateRotationalPower = ({ tau, omega, theta  , digits = 4}) => {
    validateNumber(tau, "tau");
    validateNumber(omega, "omega");
    validateNumber(theta, "theta");
    return formatNumber(tau * omega * Math.cos(theta), digits);
 };
 
 /**
  * Calculates rotational kinetic energy using KE = 0.5Iω^2.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.I - Moment of inertia (I).
  * @param {number} params.omega - Angular velocity (ω).
  * @returns {number} Rotational kinetic energy (KE).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateRotationalKE = ({ I, omega  , digits = 4}) => {
    validateNumber(I, "I");
    validateNumber(omega, "omega");
    return formatNumber(0.5 * I * omega * omega, digits);
 };
 
 /**
  * Calculates angular momentum using L = mrv sin(θ).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.m - Mass (m).
  * @param {number} params.r - Radius (r).
  * @param {number} params.v - Linear velocity (v).
  * @param {number} params.theta - Angle (theta in radians).
  * @returns {number} Angular momentum (L).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateAngularMomentum = ({ m, r, v, theta  , digits = 4}) => {
    validateNumber(m, "m");
    validateNumber(r, "r");
    validateNumber(v, "v");
    validateNumber(theta, "theta");
    return formatNumber(m * r * v * Math.sin(theta), digits);
 };
 
 /**
  * Calculates angular impulse using J = τΔt.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.tau - Torque (τ).
  * @param {number} params.deltaT - Time interval (Δt).
  * @returns {number} Angular impulse (J).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateAngularImpulse = ({ tau, deltaT  , digits = 4}) => {
    validateNumber(tau, "tau");
    validateNumber(deltaT, "deltaT");
    return formatNumber(tau * deltaT, digits);
 };
 

class rationalMotionController {
    calculateAngularVelocity = calculateAngularVelocity;
    calculateAngularAcceleration = calculateAngularAcceleration;
    calculateRotationOmega = calculateRotationOmega;
    calculateRotationTheta = calculateRotationTheta;
    calculateRotationOmega2 = calculateRotationOmega2;
    calculateRotationOmegaAvg = calculateRotationOmegaAvg;
    calculateTorque = calculateTorque;
    calculate2ndLawRotation = calculate2ndLawRotation;
    calculateMomentOfInertia = calculateMomentOfInertia;
    calculateRotationalWork = calculateRotationalWork;
    calculateRotationalPower = calculateRotationalPower;
    calculateRotationalKE = calculateRotationalKE;
    calculateAngularMomentum = calculateAngularMomentum;
    calculateAngularImpulse = calculateAngularImpulse;
    
}

module.exports = new rationalMotionController();