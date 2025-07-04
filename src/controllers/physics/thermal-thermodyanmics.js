const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates solid linear thermal expansion using ΔL = αL0ΔT.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.alpha - Coefficient of linear expansion (α). Can be positive or negative.
 * @param {number} params.L0 - Original length (L0). Must be non-negative.
 * @param {number} params.deltaT - Change in temperature (ΔT). Can be positive, negative, or zero.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Change in length (ΔL).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateSolidExpansionLength = ({ alpha, L0, deltaT, digits = 4 }) => {
   // Coefficient of linear expansion can be positive or negative (e.g., water below 4C). No specific check needed for alpha.
   validateNumber(alpha, "alpha");
   // Original length L0 must be non-negative.
   validateNumber(L0, "L0", { checkNonNegative: true });
   // Change in temperature deltaT can be positive, negative, or zero. No specific check needed for deltaT.
   validateNumber(deltaT, "deltaT");
   return formatNumber(alpha * L0 * deltaT, digits);
};

/**
 * Calculates solid area thermal expansion using ΔA ≈ 2αA0ΔT (for small changes in T).
 * Using the linear coefficient α.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.alpha - Coefficient of linear expansion (α). Can be positive or negative.
 * @param {number} params.A0 - Original area (A0). Must be non-negative.
 * @param {number} params.deltaT - Change in temperature (ΔT). Can be positive, negative, or zero.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Change in area (ΔA).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateSolidExpansionArea = ({ alpha, A0, deltaT, digits = 4 }) => {
   // Coefficient of linear expansion can be positive or negative. No specific check needed for alpha.
   validateNumber(alpha, "alpha");
   // Original area A0 must be non-negative.
   validateNumber(A0, "A0", { checkNonNegative: true });
   // Change in temperature deltaT can be positive, negative, or zero. No specific check needed for deltaT.
   validateNumber(deltaT, "deltaT");
   return formatNumber(2 * alpha * A0 * deltaT, digits);
};

/**
 * Calculates solid volume thermal expansion using ΔV ≈ 3αV0ΔT (for small changes in T).
 * Using the linear coefficient α (assuming isotropic material).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.alpha - Coefficient of linear expansion (α). Can be positive or negative.
 * @param {number} params.V0 - Original volume (V0). Must be non-negative.
 * @param {number} params.deltaT - Change in temperature (ΔT). Can be positive, negative, or zero.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Change in volume (ΔV).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateSolidExpansionVolume = ({ alpha, V0, deltaT, digits = 4 }) => {
   // Coefficient of linear expansion can be positive or negative. No specific check needed for alpha.
   validateNumber(alpha, "alpha");
   // Original volume V0 must be non-negative.
   validateNumber(V0, "V0", { checkNonNegative: true });
   // Change in temperature deltaT can be positive, negative, or zero. No specific check needed for deltaT.
   validateNumber(deltaT, "deltaT");
   return formatNumber(3 * alpha * V0 * deltaT, digits);
};

/**
 * Calculates liquid volume thermal expansion using ΔV = βV0ΔT.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.beta - Coefficient of volumetric expansion (β). Can be positive or negative.
 * @param {number} params.V0 - Original volume (V0). Must be non-negative.
 * @param {number} params.deltaT - Change in temperature (ΔT). Can be positive, negative, or zero.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Change in volume (ΔV).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateLiquidExpansion = ({ beta, V0, deltaT, digits = 4 }) => {
   // Coefficient of volumetric expansion can be positive or negative. No specific check needed for beta.
   validateNumber(beta, "beta");
   // Original volume V0 must be non-negative.
   validateNumber(V0, "V0", { checkNonNegative: true });
   // Change in temperature deltaT can be positive, negative, or zero. No specific check needed for deltaT.
   validateNumber(deltaT, "deltaT");
   return formatNumber(beta * V0 * deltaT, digits);
};

/**
 * Calculates sensible heat using Q = mcΔT.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m). Must be non-negative.
 * @param {number} params.c - Specific heat capacity (c). Must be non-negative.
 * @param {number} params.deltaT - Change in temperature (ΔT). Can be positive, negative, or zero.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Sensible heat (Q).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateSensibleHeat = ({ m, c, deltaT, digits = 4 }) => {
   // Mass m must be non-negative.
   validateNumber(m, "m", { checkNonNegative: true });
   // Specific heat capacity c must be non-negative.
   validateNumber(c, "c", { checkNonNegative: true });
   // Change in temperature deltaT can be positive, negative, or zero. No specific check needed for deltaT.
   validateNumber(deltaT, "deltaT");
   return formatNumber(m * c * deltaT, digits);
};

/**
 * Calculates latent heat using Q = mL.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m). Must be non-negative.
 * @param {number} params.L - Latent heat (L). Must be non-negative.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Latent heat (Q). Will be non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateLatentHeat = ({ m, L, digits = 4 }) => {
   // Mass m must be non-negative.
   validateNumber(m, "m", { checkNonNegative: true });
   // Latent heat L (per unit mass) must be non-negative.
   validateNumber(L, "L", { checkNonNegative: true });
   return formatNumber(m * L, digits);
};

/**
 * Validates ideal gas law using PV = nRT.
 * Assumes P, V, n, T are positive for an ideal gas.
 * @param {object} params - Parameters for the validation.
 * @param {number} params.P - Absolute Pressure (P). Must be non-negative.
 * @param {number} params.V - Volume (V). Must be non-negative.
 * @param {number} params.n - Number of moles (n). Must be non-negative.
 * @param {number} params.R - Ideal gas constant (R). Must be positive.
 * @param {number} params.T - Absolute Temperature (T). Must be non-negative.
 * @param {number} [params.digits=4] - Number of decimal places for formatting the boolean comparison result.
 * @returns {number} Formatted result of the equality check (1 for true, 0 for false).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateIdealGasLaw = ({ P, V, n, R, T, digits = 4 }) => {
   // Absolute Pressure must be non-negative.
   validateNumber(P, "P", { checkNonNegative: true });
   // Volume must be non-negative.
   validateNumber(V, "V", { checkNonNegative: true });
   // Number of moles must be non-negative.
   validateNumber(n, "n", { checkNonNegative: true });
   // Ideal gas constant R must be positive.
   validateNumber(R, "R", { checkPositive: true });
   // Absolute Temperature must be non-negative.
   validateNumber(T, "T", { checkNonNegative: true });
   // Note: Floating point comparison sensitive to precision.
   return formatNumber(P * V === n * R * T, digits);
};

/**
 * Calculates average molecular kinetic energy using KE_avg = (3/2)kT for a monatomic ideal gas.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Boltzmann's constant (k). Must be positive.
 * @param {number} params.T - Absolute Temperature (T). Must be non-negative.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Average molecular kinetic energy (KE_avg). Will be non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateMolecularKE = ({ k, T, digits = 4 }) => {
   // Boltzmann's constant k must be positive.
   validateNumber(k, "k", { checkPositive: true });
   // Absolute Temperature T must be non-negative.
   validateNumber(T, "T", { checkNonNegative: true });
   return formatNumber((3 / 2) * k * T, digits);
};

/**
 * Calculates the most probable molecular speed for Maxwell's distribution using v_p = √(2kT/m).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Boltzmann's constant (k). Must be positive.
 * @param {number} params.T - Absolute Temperature (T). Must be non-negative.
 * @param {number} params.m - Molecular mass (m). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Most probable molecular speed (v_p). Will be non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateMolecularSpeedVP = ({ k, T, m, digits = 4 }) => {
   // Boltzmann's constant k must be positive.
   validateNumber(k, "k", { checkPositive: true });
   // Absolute Temperature T must be non-negative (inside sqrt numerator).
   validateNumber(T, "T", { checkNonNegative: true });
   // Molecular mass m must be positive (in denominator and inside sqrt).
   validateNumber(m, "m", { checkPositive: true });
   return formatNumber(Math.sqrt((2 * k * T) / m), digits);
};

/**
 * Calculates average molecular speed using v_avg = √(8kT/(πm)).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Boltzmann's constant (k). Must be positive.
 * @param {number} params.T - Absolute Temperature (T). Must be non-negative.
 * @param {number} params.m - Molecular mass (m). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Average molecular speed (v_avg). Will be non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateMolecularSpeedAvg = ({ k, T, m, digits = 4 }) => {
   // Boltzmann's constant k must be positive.
   validateNumber(k, "k", { checkPositive: true });
   // Absolute Temperature T must be non-negative (inside sqrt numerator).
   validateNumber(T, "T", { checkNonNegative: true });
   // Molecular mass m must be positive (in denominator and inside sqrt).
   validateNumber(m, "m", { checkPositive: true });
   // Math.PI is a positive constant, no check needed.
   return formatNumber(Math.sqrt((8 * k * T) / (Math.PI * m)), digits);
};

/**
 * Calculates root mean square molecular speed using v_rms = √(3kT/m).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Boltzmann's constant (k). Must be positive.
 * @param {number} params.T - Absolute Temperature (T). Must be non-negative.
 * @param {number} params.m - Molecular mass (m). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Root mean square molecular speed (v_rms). Will be non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateMolecularSpeedRMS = ({ k, T, m, digits = 4 }) => {
   // Boltzmann's constant k must be positive.
   validateNumber(k, "k", { checkPositive: true });
   // Absolute Temperature T must be non-negative (inside sqrt numerator).
   validateNumber(T, "T", { checkNonNegative: true });
   // Molecular mass m must be positive (in denominator and inside sqrt).
   validateNumber(m, "m", { checkPositive: true });
   return formatNumber(Math.sqrt((3 * k * T) / m), digits);
};


/**
 * Calculates change in internal energy for a monatomic ideal gas using ΔU = (3/2)nRΔT.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.nR - Product of number of moles and ideal gas constant (nR). Must be non-negative (if n >= 0 and R > 0).
 * @param {number} params.deltaT - Change in temperature (ΔT). Can be positive, negative, or zero.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Change in internal energy (ΔU).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateInternalEnergyChange = ({ nR, deltaT, digits = 4 }) => {
   // nR is typically non-negative (number of moles >= 0, R > 0).
   validateNumber(nR, "nR", { checkNonNegative: true });
   // Change in temperature deltaT can be positive, negative, or zero. No specific check needed for deltaT.
   validateNumber(deltaT, "deltaT");
   return formatNumber((3 / 2) * nR * deltaT, digits);
};

/**
 * Calculates thermodynamic work using W = -PΔV.
 * This formula is for work done *by* the system *at constant pressure*.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.P - Absolute Pressure (P). Must be non-negative.
 * @param {number} params.deltaV - Change in volume (ΔV). Can be positive, negative, or zero.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Work done *by* the system (W).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateThermodynamicWork = ({ P, deltaV, digits = 4 }) => {
    // Absolute Pressure P must be non-negative.
    validateNumber(P, "P", { checkNonNegative: true });
    // Change in volume deltaV can be positive, negative, or zero. No specific check needed for deltaV.
    validateNumber(deltaV, "deltaV");
    return formatNumber(-P * deltaV, digits);
 };

 /**
  * Calculates the efficiency of a real heat engine using η_real = 1 - (Q_C / Q_H).
  * Requires QH != 0. For a heat engine, QH > 0.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.QC - Heat rejected to the cold reservoir (Q_C). Must be non-negative.
  * @param {number} params.QH - Heat absorbed from the hot reservoir (Q_H). Must be positive.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Efficiency (η_real).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateEfficiencyReal = ({ QC, QH, digits = 4 }) => {
    // Heat rejected QC must be non-negative.
    validateNumber(QC, "QC", { checkNonNegative: true });
    // Heat absorbed QH must be positive for a heat engine (in denominator).
    validateNumber(QH, "QH", { checkPositive: true });
    // Physically, for efficiency <= 1, QH >= QC. This isn't enforced by validateNumber.
    return formatNumber(1 - QC / QH, digits);
 };

 /**
  * Calculates ideal (Carnot) efficiency using η_ideal = 1 - (T_C / T_H).
  * Requires TH != 0. For a heat engine, TH > 0 and TH >= TC.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.TC - Absolute Cold reservoir temperature (T_C). Must be non-negative.
  * @param {number} params.TH - Absolute Hot reservoir temperature (T_H). Must be positive.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Ideal efficiency (η_ideal).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateEfficiencyIdeal = ({ TC, TH, digits = 4 }) => {
    // Absolute Cold reservoir temperature TC must be non-negative.
    validateNumber(TC, "TC", { checkNonNegative: true });
    // Absolute Hot reservoir temperature TH must be positive (in denominator). Also usually TH >= TC.
    validateNumber(TH, "TH", { checkPositive: true });
    // Physical constraint TH >= TC for positive efficiency is not enforced by validateNumber.
    return formatNumber(1 - TC / TH, digits);
 };

 /**
  * Calculates coefficient of performance for a real refrigerator using COP_real = QC / (QH - QC).
  * Requires QH > QC for positive COP and finite result.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.QC - Heat removed from cold reservoir (Q_C). Must be non-negative.
  * @param {number} params.QH - Heat rejected to hot reservoir (Q_H). Must be non-negative.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Coefficient of performance (COP_real).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateCOPReal = ({ QC, QH, digits = 4 }) => {
    // Heat removed QC must be non-negative.
    validateNumber(QC, "QC", { checkNonNegative: true });
    // Heat rejected QH must be non-negative.
    validateNumber(QH, "QH", { checkNonNegative: true });

    const denominator = QH - QC;
    if (denominator <= 0) {
       // COP for a refrigerator is defined for QH > QC. QH=QC implies infinite COP (impossible for real device).
       // QH < QC implies heat spontaneously flows from cold to hot, violating 2nd Law unless work is done,
       // but the COP definition requires work input W = QH - QC > 0.
       // Let's enforce QH > QC for a valid refrigerator COP.
       throw new Error("Heat rejected (QH) must be greater than heat removed (QC) for a valid refrigerator COP.");
    }

    return formatNumber(QC / denominator, digits);
 };

 /**
  * Calculates coefficient of performance for an ideal refrigerator using COP_ideal = TC / (TH - TC).
  * Requires TH > TC for positive COP and finite result.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.TC - Absolute Cold reservoir temperature (T_C). Must be non-negative.
  * @param {number} params.TH - Absolute Hot reservoir temperature (T_H). Must be non-negative.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Coefficient of performance (COP_ideal).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateCOPIdeal = ({ TC, TH, digits = 4 }) => {
    // Absolute Cold reservoir temperature TC must be non-negative.
    validateNumber(TC, "TC", { checkNonNegative: true });
    // Absolute Hot reservoir temperature TH must be non-negative.
    validateNumber(TH, "TH", { checkNonNegative: true });

    const denominator = TH - TC;
    if (denominator <= 0) {
       // COP for a refrigerator is defined for TH > TC. TH=TC implies infinite COP.
       // TH < TC implies heat spontaneously flows from cold to hot, violating 2nd Law.
       // Let's enforce TH > TC for a valid refrigerator COP.
       throw new Error("Hot reservoir temperature (TH) must be greater than cold reservoir temperature (TC) for a valid refrigerator COP.");
    }

    return formatNumber(TC / denominator, digits);
 };


class thermalThermaldynamicsController {
    calculateThermodynamicWork = calculateThermodynamicWork;
    calculateEfficiencyReal = calculateEfficiencyReal;
    calculateEfficiencyIdeal = calculateEfficiencyIdeal;
    calculateCOPReal = calculateCOPReal;
    calculateCOPIdeal = calculateCOPIdeal;
   calculateSolidExpansionLength = calculateSolidExpansionLength;
   calculateSolidExpansionArea = calculateSolidExpansionArea;
   calculateSolidExpansionVolume = calculateSolidExpansionVolume;
   calculateLiquidExpansion = calculateLiquidExpansion;
   calculateSensibleHeat = calculateSensibleHeat;
   calculateLatentHeat = calculateLatentHeat;
   calculateIdealGasLaw = calculateIdealGasLaw;
   calculateMolecularKE = calculateMolecularKE;
   calculateMolecularSpeedVP = calculateMolecularSpeedVP;
   calculateMolecularSpeedAvg = calculateMolecularSpeedAvg;
   calculateMolecularSpeedRMS = calculateMolecularSpeedRMS;
   calculateInternalEnergyChange = calculateInternalEnergyChange;
}

module.exports = new thermalThermaldynamicsController();