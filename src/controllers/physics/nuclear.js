const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates average activity in radioactive decay using A ≈ ΔN/Δt.
 * This is a simplified formula often used for average activity over a time interval.
 * Activity is typically defined as A = |dN/dt| = λN.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.nValue - Number of radioactive nuclei that decayed (ΔN).
 * @param {number} params.tValue - Time interval (Δt).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Average Activity (A).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateActivity = ({ nValue, tValue, digits = 4 }) => {
   // Number of decayed nuclei must be a non-negative integer count.
   validateNumber(nValue, "nValue", { checkNonNegative: true, checkInteger: true });
   // Time interval must be positive (cannot be zero for a rate).
   validateNumber(tValue, "tValue", { checkPositive: true });
   return formatNumber(nValue / tValue, digits);
};

/**
 * Calculates remaining quantity after time t for half-life decay using N = N0 * (1/2)^(t/Thalf).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.N0 - Initial quantity (N_0). Must be non-negative.
 * @param {number} params.tValue - Time elapsed (t). Must be non-negative.
 * @param {number} params.Thalf - Half-life (T_half). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Remaining quantity (N). Will be non-negative if N0 is non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateHalfLife = ({ N0, tValue, Thalf, digits = 4 }) => {
   // Initial quantity must be non-negative (e.g., number of nuclei, mass, activity).
   validateNumber(N0, "N0", { checkNonNegative: true });
   // Time elapsed must be non-negative.
   validateNumber(tValue, "tValue", { checkNonNegative: true });
   // Half-life must be positive (a non-zero decay rate is required for a defined half-life).
   validateNumber(Thalf, "Thalf", { checkPositive: true });
   return formatNumber(N0 * Math.pow(0.5, tValue / Thalf), digits);
};

/**
 * Calculates absorbed dose using D = E/m.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.EValue - Energy absorbed (E). Must be non-negative.
 * @param {number} params.mValue - Mass (m). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Absorbed dose (D). Will be non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateAbsorbedDose = ({ EValue, mValue, digits = 4 }) => {
   // Energy absorbed must be non-negative.
   validateNumber(EValue, "EValue", { checkNonNegative: true });
   // Mass must be positive (cannot be zero, division by m).
   validateNumber(mValue, "mValue", { checkPositive: true });
   return formatNumber(EValue / mValue, digits);
};

/**
 * Calculates equivalent dose using H = wR * D.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.wR - Radiation weighting factor (wR). Must be non-negative.
 * @param {number} params.DValue - Absorbed dose (D). Must be non-negative.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Equivalent dose (H). Will be non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateEquivalentDose = ({ wR, DValue, digits = 4 }) => {
   // Radiation weighting factor must be non-negative.
   validateNumber(wR, "wR", { checkNonNegative: true });
   // Absorbed dose must be non-negative (from calculateAbsorbedDose).
   validateNumber(DValue, "DValue", { checkNonNegative: true });
   return formatNumber(wR * DValue, digits);
};

/**
 * Calculates effective dose using E = wT * H.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.wT - Tissue weighting factor (wT). Must be non-negative.
 * @param {number} params.HValue - Equivalent dose (H). Must be non-negative.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Effective dose (E). Will be non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateEffectiveDose = ({ wT, HValue, digits = 4 }) => {
   // Tissue weighting factor must be non-negative.
   validateNumber(wT, "wT", { checkNonNegative: true });
   // Equivalent dose must be non-negative (from calculateEquivalentDose).
   validateNumber(HValue, "HValue", { checkNonNegative: true });
   return formatNumber(wT * HValue, digits);
};
class nuclearController {
   calculateActivity = calculateActivity;
   calculateHalfLife = calculateHalfLife;
   calculateAbsorbedDose = calculateAbsorbedDose;
   calculateEquivalentDose = calculateEquivalentDose;
   calculateEffectiveDose = calculateEffectiveDose;
}
module.exports = new nuclearController();