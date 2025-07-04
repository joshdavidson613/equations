const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates density using ρ = m/V.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m).
 * @param {number} params.V - Volume (V).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Density (ρ).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateDensity = ({ m, V, digits = 4 }) => {
   // Mass is typically non-negative.
   validateNumber(m, "m", { checkNonNegative: true });
   // Volume is typically non-negative and cannot be zero (division by V).
   validateNumber(V, "V", { checkZero: true, checkNonNegative: true });
   return formatNumber(m / V, digits);
};

/**
 * Calculates pressure using P = F/A.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F).
 * @param {number} params.A - Area (A).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Pressure (P).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculatePressure = ({ F, A, digits = 4 }) => {
   // Force can be positive, negative, or zero. No specific check needed for F.
   validateNumber(F, "F");
   // Area is typically non-negative and cannot be zero (division by A).
   validateNumber(A, "A", { checkZero: true, checkNonNegative: true });
   return formatNumber(F / A, digits);
};

/**
 * Calculates pressure in a fluid using P = P0 + ρgh.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.P0 - Atmospheric pressure (P0).
 * @param {number} params.rho - Fluid density (ρ).
 * @param {number} params.g - Acceleration due to gravity (g).
 * @param {number} params.h - Depth (h).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Pressure (P).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculatePressureInFluid = ({ P0, rho, g, h, digits = 4 }) => {
   // Atmospheric pressure is typically non-negative (absolute pressure).
   validateNumber(P0, "P0", { checkNonNegative: true });
   // Density is typically non-negative.
   validateNumber(rho, "rho", { checkNonNegative: true });
   // Acceleration due to gravity magnitude is typically positive.
   validateNumber(g, "g", { checkPositive: true });
   // Depth can be positive, negative, or zero. No specific check needed for h.
   validateNumber(h, "h");
   return formatNumber(P0 + rho * g * h, digits);
};

/**
 * Calculates buoyancy force using F_b = ρgV_displaced.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.rho - Fluid density (ρ).
 * @param {number} params.g - Acceleration due to gravity (g).
 * @param {number} params.Vdisplaced - Volume displaced (V_displaced).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Buoyancy force (F_b).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateBuoyancy = ({ rho, g, Vdisplaced, digits = 4 }) => {
   // Density is typically non-negative.
   validateNumber(rho, "rho", { checkNonNegative: true });
   // Acceleration due to gravity magnitude is typically positive.
   validateNumber(g, "g", { checkPositive: true });
   // Volume displaced is typically non-negative.
   validateNumber(Vdisplaced, "Vdisplaced", { checkNonNegative: true });
   return formatNumber(rho * g * Vdisplaced, digits);
};

/**
 * Calculates mass flow rate using ṁ = Δm/Δt.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.deltaM - Change in mass (Δm).
 * @param {number} params.deltaT - Time interval (Δt).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Mass flow rate (ṁ).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateMassFlowRate = ({ deltaM, deltaT, digits = 4 }) => {
   // Change in mass can be positive, negative, or zero. No specific check needed for deltaM.
   validateNumber(deltaM, "deltaM");
   // Time interval must be positive (cannot be zero for rate).
   validateNumber(deltaT, "deltaT", { checkPositive: true });
   return formatNumber(deltaM / deltaT, digits);
};

/**
 * Calculates volume flow rate using Q = ΔV/Δt.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.deltaV1 - Change in volume (ΔV).
 * @param {number} params.deltaT1 - Time interval (Δt).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Volume flow rate (Q).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateVolumeFlowRate = ({ deltaV1, deltaT1, digits = 4 }) => {
   // Change in volume can be positive, negative, or zero. No specific check needed for deltaV1.
   validateNumber(deltaV1, "deltaV1");
   // Time interval must be positive (cannot be zero for rate).
   validateNumber(deltaT1, "deltaT1", { checkPositive: true });
   return formatNumber(deltaV1 / deltaT1, digits);
};

/**
 * Calculates a portion of Bernoulli's equation and checks equality.
 * NOTE: The description says it returns boolean, but the code formats the result.
 * It formats 0 for false, 1 for true.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.P1 - Pressure 1 (P1).
 * @param {number} params.rho - Fluid density (ρ).
 * @param {number} params.g - Acceleration due to gravity (g).
 * @param {number} params.y1 - Height 1 (y1).
 * @param {number} params.v1 - Velocity 1 (v1).
 * @param {number} params.P2 - Pressure 2 (P2).
 * @param {number} params.y2 - Height 2 (y2).
 * @param {number} params.v2 - Velocity 2 (v2).
 * @param {number} [params.digits=4] - Number of decimal places for formatting (applied to the boolean comparison result).
 * @returns {number} Formatted result of the equality check (1 for true, 0 for false).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateBernoulliEquation = ({ P1, rho, g, y1, v1, P2, y2, v2, digits = 4 }) => {
   // Pressure is typically non-negative (absolute pressure).
   validateNumber(P1, "P1", { checkNonNegative: true });
   // Density is typically non-negative.
   validateNumber(rho, "rho", { checkNonNegative: true });
   // Acceleration due to gravity magnitude is typically positive.
   validateNumber(g, "g", { checkPositive: true });
   // Height can be positive, negative, or zero. No specific check needed for y1, y2.
   validateNumber(y1, "y1");
   // Velocity can be positive, negative, or zero. No specific check needed for v1, v2.
   validateNumber(v1, "v1");
   // Pressure is typically non-negative (absolute pressure).
   validateNumber(P2, "P2", { checkNonNegative: true });
    // Height can be positive, negative, or zero.
   validateNumber(y2, "y2");
   // Velocity can be positive, negative, or zero.
   validateNumber(v2, "v2");

   // Note: Formatting a boolean result (true/false) usually results in 1/0.
   // If exact equality is sensitive to floating point precision, you might need
   // a tolerance check instead of strict ===.
   return formatNumber(P1 + rho * g * y1 + 0.5 * rho * v1 * v1 === P2 + rho * g * y2 + 0.5 * rho * v2 * v2, digits);
};

/**
 * Calculates dynamic viscosity using η = F * Δy / (A * Δvx).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F).
 * @param {number} params.deltaVx - Change in velocity (Δvx).
 * @param {number} params.A - Area (A).
 * @param {number} params.deltaY - Change in height (Δy).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Dynamic viscosity (η).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateDynamicViscosity = ({ F, deltaVx, A, deltaY, digits = 4 }) => {
   // Force can be positive, negative, or zero. No specific check needed for F.
   validateNumber(F, "F");
   // Change in velocity can be positive, negative, or zero.
   // It is part of the denominator (A * deltaVx), so it cannot be zero if A is non-zero.
   validateNumber(deltaVx, "deltaVx", { checkZero: true });
   // Area is typically non-negative. It's part of the denominator and cannot be zero.
   validateNumber(A, "A", { checkZero: true, checkNonNegative: true });
   // Change in height can be positive, negative, or zero. No specific check needed for deltaY.
   validateNumber(deltaY, "deltaY"); // deltaY is in the numerator, can be zero.
   // Note: The formula involves A * deltaVx in the denominator. Both A and deltaVx
   // must be non-zero simultaneously for a valid calculation. The current validation
   // checks A and deltaVx individually for zero.
   return formatNumber((F * deltaY) / (A * deltaVx), digits);
};

/**
 * Calculates kinematic viscosity using ν = η / ρ.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.eta - Dynamic viscosity (η).
 * @param {number} params.rho - Fluid density (ρ).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Kinematic viscosity (ν).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateKinematicViscosity = ({ eta, rho, digits = 4 }) => {
   // Dynamic viscosity is typically non-negative.
   validateNumber(eta, "eta", { checkNonNegative: true });
   // Fluid density is typically non-negative and cannot be zero (division by rho).
   // Corrected syntax here: validateNumber(rho, "rho", { checkZero: true, checkNonNegative: true });
   validateNumber(rho, "rho", { checkZero: true, checkNonNegative: true });
   return formatNumber(eta / rho, digits);
};

/**
 * Calculates drag force using F_d = 0.5 * ρ * C_A * v^2.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.rho - Fluid density (ρ).
 * @param {number} params.CA - Drag coefficient (C_A).
 * @param {number} params.v - Velocity (v).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Drag force (F_d).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateDrag = ({ rho, CA, v, digits = 4 }) => {
   // Fluid density is typically non-negative.
   validateNumber(rho, "rho", { checkNonNegative: true });
   // Drag coefficient is typically non-negative.
   validateNumber(CA, "CA", { checkNonNegative: true });
   // Velocity can be positive, negative, or zero. (v^2 makes the direction irrelevant for magnitude).
   validateNumber(v, "v");
   return formatNumber(0.5 * rho * CA * v * v, digits);
};

/**
 * Calculates the Mach number using M = v/c.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.v - Velocity (v).
 * @param {number} params.c - Speed of sound (c).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Mach number (M).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateMachNumber = ({ v, c, digits = 4 }) => {
   // Velocity can be positive, negative, or zero.
   validateNumber(v, "v");
   // Speed of sound must be positive (cannot be zero).
   validateNumber(c, "c", { checkPositive: true });
   return formatNumber(v / c, digits);
};

/**
 * Calculates Reynolds number using Re = (ρ * v * D) / η.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.rho - Fluid density (ρ).
 * @param {number} params.v - Velocity (v).
 * @param {number} params.D - Characteristic length (D).
 * @param {number} params.eta - Dynamic viscosity (η).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Reynolds number (Re).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateReynoldsNumber = ({ rho, v, D, eta, digits = 4 }) => {
   // Fluid density is typically non-negative.
   validateNumber(rho, "rho", { checkNonNegative: true });
   // Velocity magnitude is typically used, so non-negative.
   validateNumber(v, "v", { checkNonNegative: true });
   // Characteristic length is typically non-negative.
   validateNumber(D, "D", { checkNonNegative: true });
   // Dynamic viscosity is typically non-negative and cannot be zero (division by eta).
   validateNumber(eta, "eta", { checkZero: true, checkNonNegative: true });
   return formatNumber((rho * v * D) / eta, digits);
};

/**
 * Calculates Froude number using Fr = v / √(g * l).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.v - Velocity (v).
 * @param {number} params.g - Acceleration due to gravity (g).
 * @param {number} params.l - Characteristic length (l).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Froude number (Fr).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateFroudeNumber = ({ v, g, l, digits = 4 }) => {
   // Velocity magnitude is typically used, so non-negative.
   validateNumber(v, "v", { checkNonNegative: true });
   // Acceleration due to gravity magnitude must be positive (inside sqrt and denominator).
   validateNumber(g, "g", { checkPositive: true });
   // Characteristic length must be positive (inside sqrt and denominator).
   validateNumber(l, "l", { checkPositive: true });
   return formatNumber(v / Math.sqrt(g * l), digits);
};

/**
 * Calculates surface tension using γ = F / l.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F).
 * @param {number} params.l - Length (l).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Surface tension (γ).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateSurfaceTension = ({ F, l, digits = 4 }) => {
   // Force can be positive, negative, or zero. No specific check needed for F.
   validateNumber(F, "F");
   // Length is typically non-negative and cannot be zero (division by l).
   validateNumber(l, "l", { checkZero: true, checkNonNegative: true });
   return formatNumber(F / l, digits);
};

class fluidsThermodynamicsController {
   calculateDensity = calculateDensity;
   calculatePressure = calculatePressure;
   calculatePressureInFluid = calculatePressureInFluid;
   calculateBuoyancy = calculateBuoyancy;
   calculateMassFlowRate = calculateMassFlowRate;
   calculateVolumeFlowRate = calculateVolumeFlowRate;
   calculateBernoulliEquation = calculateBernoulliEquation;
   calculateDynamicViscosity = calculateDynamicViscosity;
   calculateKinematicViscosity = calculateKinematicViscosity;
   calculateDrag = calculateDrag;
   calculateMachNumber = calculateMachNumber;
   calculateReynoldsNumber = calculateReynoldsNumber;
   calculateFroudeNumber = calculateFroudeNumber;
   calculateSurfaceTension = calculateSurfaceTension;
}

module.exports = new fluidsThermodynamicsController();