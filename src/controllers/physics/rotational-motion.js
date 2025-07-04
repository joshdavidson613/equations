const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates angular velocity based on change in angle and time.
 * ω = Δθ / Δt
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.deltaTheta - Change in angle (Δθ).
 * @param {number} params.deltaT - Time interval (Δt).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Angular velocity (ω).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateAngularVelocity = ({ deltaTheta, deltaT, digits = 4 }) => {
    // Change in angle can be positive, negative, or zero. No specific check needed for deltaTheta.
    validateNumber(deltaTheta, "deltaTheta");
    // Time interval (duration) must be positive for a rate calculation (cannot be zero).
    validateNumber(deltaT, "deltaT", { checkPositive: true });
    return formatNumber(deltaTheta / deltaT, digits);
 };

 /**
  * Calculates angular acceleration based on change in angular velocity and time.
  * α = Δω / Δt
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.deltaOmega - Change in angular velocity (Δω).
  * @param {number} params.deltaT - Time interval (Δt).
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Angular acceleration (α).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateAngularAcceleration = ({ deltaOmega, deltaT, digits = 4 }) => {
    // Change in angular velocity can be positive, negative, or zero. No specific check needed for deltaOmega.
    validateNumber(deltaOmega, "deltaOmega");
    // Time interval (duration) must be positive for a rate calculation (cannot be zero).
    validateNumber(deltaT, "deltaT", { checkPositive: true });
    return formatNumber(deltaOmega / deltaT, digits);
 };

 /**
  * Calculates final angular velocity using ω = ω0 + αt.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.omega0 - Initial angular velocity (ω0).
  * @param {number} params.alpha - Angular acceleration (α).
  * @param {number} params.t - Time (t).
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Final angular velocity (ω).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateRotationOmega = ({ omega0, alpha, t, digits = 4 }) => {
    // Initial angular velocity can be positive, negative, or zero. No specific check needed for omega0.
    validateNumber(omega0, "omega0");
    // Angular acceleration can be positive, negative, or zero. No specific check needed for alpha.
    validateNumber(alpha, "alpha");
    // Time elapsed should be non-negative.
    validateNumber(t, "t", { checkNonNegative: true });
    return formatNumber(omega0 + alpha * t, digits);
 };

 /**
  * Calculates angular position using θ = θ0 + ω0t + 0.5αt^2.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.theta0 - Initial angular position (θ0).
  * @param {number} params.omega0 - Initial angular velocity (ω0).
  * @param {number} params.t - Time (t).
  * @param {number} params.alpha - Angular acceleration (α).
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Final angular position (θ).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateRotationTheta = ({ theta0, omega0, t, alpha, digits = 4 }) => {
    // Initial angular position can be any angle. No specific check needed for theta0.
    validateNumber(theta0, "theta0");
    // Initial angular velocity can be positive, negative, or zero. No specific check needed for omega0.
    validateNumber(omega0, "omega0");
    // Time elapsed should be non-negative.
    validateNumber(t, "t", { checkNonNegative: true });
    // Angular acceleration can be positive, negative, or zero. No specific check needed for alpha.
    validateNumber(alpha, "alpha");
    return formatNumber(theta0 + omega0 * t + 0.5 * alpha * t * t, digits);
 };

 /**
  * Calculates angular velocity squared using ω^2 = ω0^2 + 2α(θ - θ0).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.omega0 - Initial angular velocity (ω0).
  * @param {number} params.alpha - Angular acceleration (α).
  * @param {number} params.theta - Final angular position (θ).
  * @param {number} params.theta0 - Initial angular position (θ0).
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Angular velocity squared.
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateRotationOmega2 = ({ omega0, alpha, theta, theta0, digits = 4 }) => {
    // Angular velocities and positions can be positive, negative, or zero. No specific checks needed.
    validateNumber(omega0, "omega0");
    validateNumber(alpha, "alpha");
    validateNumber(theta, "theta");
    validateNumber(theta0, "theta0");
    // Note: The result of omega^2 should ideally be non-negative for real velocities,
    // but the inputs themselves don't strictly require constraints that guarantee this
    // if the physics is non-standard or the inputs represent an impossible scenario.
    return formatNumber(omega0 * omega0 + 2 * alpha * (theta - theta0), digits);
 };

 /**
  * Calculates average angular velocity based on initial and final angular velocities.
  * ω_avg = 0.5 * (ω + ω0)
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.omega - Final angular velocity (ω).
  * @param {number} params.omega0 - Initial angular velocity (ω0).
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Average angular velocity (ω_avg).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateRotationOmegaAvg = ({ omega, omega0, digits = 4 }) => {
    // Angular velocities can be positive, negative, or zero. No specific checks needed.
    validateNumber(omega, "omega");
    validateNumber(omega0, "omega0");
    return formatNumber(0.5 * (omega + omega0), digits);
 };

 /**
  * Calculates torque using τ = rF sin(θ).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.r - Radius (r). Must be non-negative.
  * @param {number} params.F - Force (F). Must be non-negative (assuming F is magnitude).
  * @param {number} params.theta - Angle between radius and force (theta in radians). Can be any angle.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Torque (τ).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateTorque = ({ r, F, theta, digits = 4 }) => {
    // Radius (distance from axis) should be non-negative.
    validateNumber(r, "r", { checkNonNegative: true });
    // Force magnitude should be non-negative. (Assuming F here is magnitude)
    validateNumber(F, "F", { checkNonNegative: true });
    // Angle can be any angle. No specific check needed for theta.
    validateNumber(theta, "theta");
    return formatNumber(r * F * Math.sin(theta), digits);
 };


 /**
  * Calculates rotational form of Newton's second law using τ = Iα.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.I - Moment of inertia (I). Must be non-negative.
  * @param {number} params.alpha - Angular acceleration (α). Can be positive, negative, or zero.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Torque (τ).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculate2ndLawRotation = ({ I, alpha, digits = 4 }) => {
    // Moment of inertia is always non-negative.
    validateNumber(I, "I", { checkNonNegative: true });
    // Angular acceleration can be positive, negative, or zero. No specific check needed for alpha.
    validateNumber(alpha, "alpha");
    return formatNumber(I * alpha, digits);
 };

 /**
  * Calculates moment of inertia for a point mass using I = mr^2.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.m - Mass (m). Must be non-negative.
  * @param {number} params.r - Distance from axis of rotation (r). Must be non-negative.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Moment of inertia (I). Will be non-negative.
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateMomentOfInertia = ({ m, r, digits = 4 }) => {
    // Mass must be non-negative.
    validateNumber(m, "m", { checkNonNegative: true });
    // Distance from axis must be non-negative.
    validateNumber(r, "r", { checkNonNegative: true });
    return formatNumber(m * r * r, digits); // Simplified for point mass
 };

 /**
  * Calculates rotational work using W = τΔθ.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.tau - Torque (τ). Can be positive, negative, or zero.
  * @param {number} params.deltaTheta - Change in angular position (Δθ). Can be positive, negative, or zero.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Rotational work (W).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateRotationalWork = ({ tau, deltaTheta, digits = 4 }) => {
    // Torque can be positive, negative, or zero. No specific check needed for tau.
    validateNumber(tau, "tau");
    // Change in angular position can be positive, negative, or zero. No specific check needed for deltaTheta.
    validateNumber(deltaTheta, "deltaTheta");
    return formatNumber(tau * deltaTheta, digits);
 };

 /**
  * Calculates rotational power using P = τω cos(θ).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.tau - Torque (τ). Can be positive, negative, or zero.
  * @param {number} params.omega - Angular velocity (ω). Can be positive, negative, or zero.
  * @param {number} params.theta - Angle between torque and angular velocity vectors (theta in radians). Can be any angle.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Rotational power (P).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateRotationalPower = ({ tau, omega, theta, digits = 4 }) => {
    // Torque can be positive, negative, or zero. No specific check needed for tau.
    validateNumber(tau, "tau");
    // Angular velocity can be positive, negative, or zero. No specific check needed for omega.
    validateNumber(omega, "omega");
    // Angle can be any angle. No specific check needed for theta.
    validateNumber(theta, "theta");
    return formatNumber(tau * omega * Math.cos(theta), digits);
 };

 /**
  * Calculates rotational kinetic energy using KE = 0.5Iω^2.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.I - Moment of inertia (I). Must be non-negative.
  * @param {number} params.omega - Angular velocity (ω). Can be positive, negative, or zero.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Rotational kinetic energy (KE). Will be non-negative.
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateRotationalKE = ({ I, omega, digits = 4 }) => {
    // Moment of inertia is always non-negative.
    validateNumber(I, "I", { checkNonNegative: true });
    // Angular velocity can be positive, negative, or zero. (omega^2 handles sign). No specific check needed for omega.
    validateNumber(omega, "omega");
    // Note: Kinetic energy is always non-negative for physical systems. This is
    // guaranteed by I >= 0 and omega^2 >= 0.
    return formatNumber(0.5 * I * omega * omega, digits);
 };

 /**
  * Calculates angular momentum for a point mass using L = mrv sin(θ).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.m - Mass (m). Must be non-negative.
  * @param {number} params.r - Distance from axis (r). Must be non-negative.
  * @param {number} params.v - Linear velocity (v). Must be non-negative (assuming v is speed magnitude).
  * @param {number} params.theta - Angle between position vector and velocity vector (theta in radians). Can be any angle.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Angular momentum (L).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateAngularMomentum = ({ m, r, v, theta, digits = 4 }) => {
    // Mass must be non-negative.
    validateNumber(m, "m", { checkNonNegative: true });
    // Distance from axis must be non-negative.
    validateNumber(r, "r", { checkNonNegative: true });
     // Linear velocity magnitude is typically used, so non-negative.
    validateNumber(v, "v", { checkNonNegative: true });
    // Angle can be any angle. No specific check needed for theta.
    validateNumber(theta, "theta");
    return formatNumber(m * r * v * Math.sin(theta), digits);
 };

 /**
  * Calculates angular impulse using J = τΔt.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.tau - Torque (τ). Can be positive, negative, or zero.
  * @param {number} params.deltaT - Time interval (Δt). Must be non-negative.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Angular impulse (J).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateAngularImpulse = ({ tau, deltaT, digits = 4 }) => {
    // Torque can be positive, negative, or zero. No specific check needed for tau.
    validateNumber(tau, "tau");
    // Time interval (duration over which torque is applied) should be non-negative.
    validateNumber(deltaT, "deltaT", { checkNonNegative: true });
    return formatNumber(tau * deltaT, digits);
 };


class rotationalMotionController {
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

module.exports = new rotationalMotionController();