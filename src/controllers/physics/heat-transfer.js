const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary


/**
 * Calculates thermal conduction using Q = (kAΔT) / L.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Thermal conductivity (k).
 * @param {number} params.A - Cross-sectional area (A).
 * @param {number} params.deltaT - Temperature difference (ΔT).
 * @param {number} params.L - Thickness (L).
 * @returns {number} Heat transferred (Q).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateThermalConduction = ({ k, A, deltaT, L, digits = 4 }) => {
   validateNumber(k, "k");
   validateNumber(A, "A");
   validateNumber(deltaT, "deltaT");
   validateNumber(L, "L");
   return formatNumber((k * A * deltaT) / L, digits);
};

/**
 * Calculates Stefan-Boltzmann Law for radiation using Q = εσAT^4.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.epsilon - Emissivity (ε).
 * @param {number} params.sigma - Stefan-Boltzmann constant (σ).
 * @param {number} params.A - Area (A).
 * @param {number} params.T - Temperature (T).
 * @param {number} params.T0 - Reference temperature (T0).
 * @returns {number} Radiated power (Q).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateStefanBoltzmannLaw = ({ epsilon, sigma, A, T, T0, digits = 4 }) => {
   validateNumber(epsilon, "epsilon");
   validateNumber(sigma, "sigma");
   validateNumber(A, "A");
   validateNumber(T, "T");
   validateNumber(T0, "T0");
   return formatNumber(epsilon * sigma * A * (Math.pow(T, 4) - Math.pow(T0, 4)), digits);
};

/**
 * Calculates maximum wavelength using Wien's Law: λ_max = b/T.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.b - Wien's displacement constant (b).
 * @param {number} params.T - Temperature (T).
 * @returns {number} Maximum wavelength (λ_max).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateWienLawLambdaMax = ({ b, T, digits = 4 }) => {
   validateNumber(b, "b");
   validateNumber(T, "T");
   return formatNumber(b / T, digits);
};

/**
 * Calculates frequency using Wien's Law: f_max = b' * T.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.bPrime - Modified Wien's constant (b').
 * @param {number} params.T - Temperature (T).
 * @returns {number} Frequency (f_max).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateWienLawFMax = ({ bPrime, T, digits = 4 }) => {
   validateNumber(bPrime, "bPrime");
   validateNumber(T, "T");
   return formatNumber(bPrime * T, digits);
};

class heatTransferController {
   calculateThermalConduction = calculateThermalConduction;
   calculateStefanBoltzmannLaw = calculateStefanBoltzmannLaw;
   calculateWienLawLambdaMax = calculateWienLawLambdaMax;
   calculateWienLawFMax = calculateWienLawFMax;
}

module.exports = new heatTransferController();
