const { validateNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates density using ρ = m/V.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m).
 * @param {number} params.V - Volume (V).
 * @returns {number} Density (ρ).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateDensity = ({ m, V  , digits = 4}) => {
   validateNumber(m, "m");
   validateNumber(V, "V");
   return formatNumber(m / V, digits);
};

/**
 * Calculates pressure using P = F/A.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F).
 * @param {number} params.A - Area (A).
 * @returns {number} Pressure (P).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculatePressure = ({ F, A  , digits = 4}) => {
   validateNumber(F, "F");
   validateNumber(A, "A");
   return formatNumber(F / A, digits);
};

/**
 * Calculates pressure in a fluid using P = P0 + ρgh.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.P0 - Atmospheric pressure (P0).
 * @param {number} params.rho - Fluid density (ρ).
 * @param {number} params.g - Acceleration due to gravity (g).
 * @param {number} params.h - Depth (h).
 * @returns {number} Pressure (P).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculatePressureInFluid = ({ P0, rho, g, h  , digits = 4}) => {
   validateNumber(P0, "P0");
   validateNumber(rho, "rho");
   validateNumber(g, "g");
   validateNumber(h, "h");
   return formatNumber(P0 + rho * g * h, digits);
};

/**
 * Calculates buoyancy force using F_b = ρgV_displaced.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.rho - Fluid density (ρ).
 * @param {number} params.g - Acceleration due to gravity (g).
 * @param {number} params.Vdisplaced - Volume displaced (V_displaced).
 * @returns {number} Buoyancy force (F_b).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateBuoyancy = ({ rho, g, Vdisplaced  , digits = 4}) => {
   validateNumber(rho, "rho");
   validateNumber(g, "g");
   validateNumber(Vdisplaced, "Vdisplaced");
   return formatNumber(rho * g * Vdisplaced, digits);
};

/**
 * Calculates mass flow rate using ṁ = Δm/Δt.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.deltaM - Change in mass (Δm).
 * @param {number} params.deltaT - Time interval (Δt).
 * @returns {number} Mass flow rate (ṁ).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateMassFlowRate = ({ deltaM, deltaT  , digits = 4}) => {
   validateNumber(deltaM, "deltaM");
   validateNumber(deltaT, "deltaT");
   return formatNumber(deltaM / deltaT, digits);
};

/**
 * Calculates volume flow rate using Q = ΔV/Δt.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.deltaV1 - Change in volume (ΔV).
 * @param {number} params.deltaT1 - Time interval (Δt).
 * @returns {number} Volume flow rate (Q).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateVolumeFlowRate = ({ deltaV1, deltaT1  , digits = 4}) => {
   validateNumber(deltaV1, "deltaV1");
   validateNumber(deltaT1, "deltaT1");
   return formatNumber(deltaV1 / deltaT1, digits);
};

/**
 * Calculates a portion of Bernoulli's equation.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.P1 - Pressure 1 (P1).
 * @param {number} params.rho - Fluid density (ρ).
 * @param {number} params.g - Acceleration due to gravity (g).
 * @param {number} params.y1 - Height 1 (y1).
 * @param {number} params.v1 - Velocity 1 (v1).
 * @param {number} params.P2 - Pressure 2 (P2).
 * @param {number} params.y2 - Height 2 (y2).
 * @param {number} params.v2 - Velocity 2 (v2).
 * @returns {boolean} True if both sides of the equation are equal.
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateBernoulliEquation = ({ P1, rho, g, y1, v1, P2, y2, v2  , digits = 4}) => {
   validateNumber(P1, "P1");
   validateNumber(rho, "rho");
   validateNumber(g, "g");
   validateNumber(y1, "y1");
   validateNumber(v1, "v1");
   validateNumber(P2, "P2");
   validateNumber(y2, "y2");
   validateNumber(v2, "v2");
   return formatNumber(P1 + rho * g * y1 + 0.5 * rho * v1 * v1 === P2 + rho * g * y2 + 0.5 * rho * v2 * v2, digits);
};

/**
 * Calculates dynamic viscosity using η = F * Δy / (A * Δvx).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F).
 * @param {number} params.deltaVx - Change in velocity (Δvx).
 * @param {number} params.A - Area (A).
 * @param {number} params.deltaY - Change in height (Δy).
 * @returns {number} Dynamic viscosity (η).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateDynamicViscosity = ({ F, deltaVx, A, deltaY  , digits = 4}) => {
   validateNumber(F, "F");
   validateNumber(deltaVx, "deltaVx");
   validateNumber(A, "A");
   validateNumber(deltaY, "deltaY");
   return formatNumber((F * deltaY) / (A * deltaVx), digits);
};

/**
 * Calculates kinematic viscosity using ν = η / ρ.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.eta - Dynamic viscosity (η).
 * @param {number} params.rho - Fluid density (ρ).
 * @returns {number} Kinematic viscosity (ν).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateKinematicViscosity = ({ eta, rho  , digits = 4}) => {
   validateNumber(eta, "eta");
   validateNumber(rho, "rho");
   return formatNumber(eta / rho, digits);
};

/**
 * Calculates drag force using F_d = 0.5 * ρ * C_A * v^2.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.rho - Fluid density (ρ).
 * @param {number} params.CA - Drag coefficient (C_A).
 * @param {number} params.v - Velocity (v).
 * @returns {number} Drag force (F_d).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateDrag = ({ rho, CA, v  , digits = 4}) => {
   validateNumber(rho, "rho");
   validateNumber(CA, "CA");
   validateNumber(v, "v");
   return formatNumber(0.5 * rho * CA * v * v, digits);
};

/**
 * Calculates the Mach number using M = v/c.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.v - Velocity (v).
 * @param {number} params.c - Speed of sound (c).
 * @returns {number} Mach number (M).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateMachNumber = ({ v, c  , digits = 4}) => {
   validateNumber(v, "v");
   validateNumber(c, "c");
   return formatNumber(v / c, digits);
};

/**
 * Calculates Reynolds number using Re = (ρ * v * D) / η.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.rho - Fluid density (ρ).
 * @param {number} params.v - Velocity (v).
 * @param {number} params.D - Characteristic length (D).
 * @param {number} params.eta - Dynamic viscosity (η).
 * @returns {number} Reynolds number (Re).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateReynoldsNumber = ({ rho, v, D, eta  , digits = 4}) => {
   validateNumber(rho, "rho");
   validateNumber(v, "v");
   validateNumber(D, "D");
   validateNumber(eta, "eta");
   return formatNumber((rho * v * D) / eta, digits);
};

/**
 * Calculates Froude number using Fr = v / √(g * l).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.v - Velocity (v).
 * @param {number} params.g - Acceleration due to gravity (g).
 * @param {number} params.l - Characteristic length (l).
 * @returns {number} Froude number (Fr).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateFroudeNumber = ({ v, g, l  , digits = 4}) => {
   validateNumber(v, "v");
   validateNumber(g, "g");
   validateNumber(l, "l");
   return formatNumber(v / Math.sqrt(g * l), digits);
};

/**
 * Calculates surface tension using γ = F / l.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.F - Force (F).
 * @param {number} params.l - Length (l).
 * @returns {number} Surface tension (γ).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateSurfaceTension = ({ F, l  , digits = 4}) => {
   validateNumber(F, "F");
   validateNumber(l, "l");
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
