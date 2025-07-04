const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary


/**
 * Calculates thermal conduction using Q = (kAΔT) / L.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Thermal conductivity (k).
 * @param {number} params.A - Cross-sectional area (A).
 * @param {number} params.deltaT - Temperature difference (ΔT).
 * @param {number} params.L - Thickness (L).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Heat transferred (Q).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateThermalConduction = ({ k, A, deltaT, L, digits = 4 }) => {
   // Thermal conductivity is typically non-negative.
   validateNumber(k, "k", { checkNonNegative: true });
   // Area must be non-negative.
   validateNumber(A, "A", { checkNonNegative: true });
   // Temperature difference can be positive, negative, or zero. No specific check needed for deltaT.
   validateNumber(deltaT, "deltaT");
   // Thickness L must be positive (cannot be zero, division by L).
   validateNumber(L, "L", { checkPositive: true });
   return formatNumber((k * A * deltaT) / L, digits);
};

/**
 * Calculates Stefan-Boltzmann Law for radiation using P = εσA(T^4 - T0^4). (Note: The original JSDoc says Q, but the formula is for Power P).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.epsilon - Emissivity (ε).
 * @param {number} params.sigma - Stefan-Boltzmann constant (σ).
 * @param {number} params.A - Area (A).
 * @param {number} params.T - Absolute temperature of the object (T).
 * @param {number} params.T0 - Absolute temperature of the surroundings (T0).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Net radiated power (P).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateStefanBoltzmannLaw = ({ epsilon, sigma, A, T, T0, digits = 4 }) => {
   // Emissivity ε is between 0 and 1. Check non-negative. (Assuming check within [0,1] is not available in validateNumber)
   validateNumber(epsilon, "epsilon", { checkNonNegative: true }); // Could add custom check for <= 1 if needed
   // Stefan-Boltzmann constant σ is a fixed positive value.
   validateNumber(sigma, "sigma", { checkPositive: true });
   // Area must be non-negative.
   validateNumber(A, "A", { checkNonNegative: true });
   // Temperatures T and T0 must be absolute temperatures, hence non-negative.
   validateNumber(T, "T", { checkNonNegative: true });
   validateNumber(T0, "T0", { checkNonNegative: true });
   return formatNumber(epsilon * sigma * A * (Math.pow(T, 4) - Math.pow(T0, 4)), digits);
};

/**
 * Calculates maximum wavelength using Wien's Law: λ_max = b/T.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.b - Wien's displacement constant (b).
 * @param {number} params.T - Absolute temperature (T).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Maximum wavelength (λ_max).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateWienLawLambdaMax = ({ b, T, digits = 4 }) => {
   // Wien's displacement constant b is a fixed positive value.
   validateNumber(b, "b", { checkPositive: true });
   // Absolute temperature T must be positive (cannot be zero, division by T).
   validateNumber(T, "T", { checkPositive: true });
   return formatNumber(b / T, digits);
};

/**
 * Calculates frequency related to peak spectral radiance using Wien's Law: f_peak = b' * T.
 * (Note: The original JSDoc says f_max, but the formula uses b' and refers to peak radiance in *frequency* space).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.bPrime - Modified Wien's constant (b').
 * @param {number} params.T - Absolute temperature (T).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Frequency (f_peak).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateWienLawFMax = ({ bPrime, T, digits = 4 }) => {
   // Modified Wien's constant b' is a fixed positive value.
   validateNumber(bPrime, "bPrime", { checkPositive: true });
   // Absolute temperature T must be non-negative.
   validateNumber(T, "T", { checkNonNegative: true });
   return formatNumber(bPrime * T, digits);
};

class heatTransferController {
   calculateThermalConduction = calculateThermalConduction;
   calculateStefanBoltzmannLaw = calculateStefanBoltzmannLaw;
   calculateWienLawLambdaMax = calculateWienLawLambdaMax;
   calculateWienLawFMax = calculateWienLawFMax;
}

module.exports = new heatTransferController();