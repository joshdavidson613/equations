const { validateNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates activity in radioactive decay using A = N/t.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.nValue - Number of radioactive nuclei (N).
 * @param {number} params.tValue - Time (t).
 * @returns {number} Activity (A).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateActivity = ({ nValue, tValue  , digits = 4}) => {
   validateNumber(nValue, "nValue");
   validateNumber(tValue, "tValue");
   return formatNumber(nValue / tValue, digits);
};

/**
 * Calculates remaining quantity after time t for half-life decay using N = N0 * (1/2)^(t/Thalf).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.N0 - Initial quantity (N_0).
 * @param {number} params.tValue - Time (t).
 * @param {number} params.Thalf - Half-life (T_half).
 * @returns {number} Remaining quantity (N).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateHalfLife = ({ N0, tValue, Thalf  , digits = 4}) => {
   validateNumber(N0, "N0");
   validateNumber(tValue, "tValue");
   validateNumber(Thalf, "Thalf");
   return formatNumber(N0 * Math.pow(0.5, tValue / Thalf), digits);
};

/**
 * Calculates absorbed dose using D = E/m.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.EValue - Energy absorbed (E).
 * @param {number} params.mValue - Mass (m).
 * @returns {number} Absorbed dose (D).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateAbsorbedDose = ({ EValue, mValue  , digits = 4}) => {
   validateNumber(EValue, "EValue");
   validateNumber(mValue, "mValue");
   return formatNumber(EValue / mValue, digits);
};

/**
 * Calculates equivalent dose using H = wR * D.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.wR - Radiation weighting factor (wR).
 * @param {number} params.DValue - Absorbed dose (D).
 * @returns {number} Equivalent dose (H).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateEquivalentDose = ({ wR, DValue  , digits = 4}) => {
   validateNumber(wR, "wR");
   validateNumber(DValue, "DValue");
   return formatNumber(wR * DValue, digits);
};

/**
 * Calculates effective dose using E = wT * H.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.wT - Tissue weighting factor (wT).
 * @param {number} params.HValue - Equivalent dose (H).
 * @returns {number} Effective dose (E).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateEffectiveDose = ({ wT, HValue  , digits = 4}) => {
   validateNumber(wT, "wT");
   validateNumber(HValue, "HValue");
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
