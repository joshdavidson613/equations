const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates solid expansion length using ΔL = αL0ΔT.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.alpha - Coefficient of linear expansion (α).
 * @param {number} params.L0 - Original length (L0).
 * @param {number} params.deltaT - Change in temperature (ΔT).
 * @returns {number} Change in length (ΔL).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateSolidExpansionLength = ({ alpha, L0, deltaT, digits = 4 }) => {
   validateNumber(alpha, "alpha");
   validateNumber(L0, "L0");
   validateNumber(deltaT, "deltaT");
   return formatNumber(alpha * L0 * deltaT, digits);
};

/**
 * Calculates solid expansion area using ΔA = 2αA0ΔT.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.alpha - Coefficient of linear expansion (α).
 * @param {number} params.A0 - Original area (A0).
 * @param {number} params.deltaT - Change in temperature (ΔT).
 * @returns {number} Change in area (ΔA).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateSolidExpansionArea = ({ alpha, A0, deltaT, digits = 4 }) => {
   validateNumber(alpha, "alpha");
   validateNumber(A0, "A0");
   validateNumber(deltaT, "deltaT");
   return formatNumber(2 * alpha * A0 * deltaT, digits);
};

/**
 * Calculates solid expansion volume using ΔV = 3αV0ΔT.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.alpha - Coefficient of linear expansion (α).
 * @param {number} params.V0 - Original volume (V0).
 * @param {number} params.deltaT - Change in temperature (ΔT).
 * @returns {number} Change in volume (ΔV).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateSolidExpansionVolume = ({ alpha, V0, deltaT, digits = 4 }) => {
   validateNumber(alpha, "alpha");
   validateNumber(V0, "V0");
   validateNumber(deltaT, "deltaT");
   return formatNumber(3 * alpha * V0 * deltaT, digits);
};

/**
 * Calculates liquid expansion using ΔV = βV0ΔT.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.beta - Coefficient of volumetric expansion (β).
 * @param {number} params.V0 - Original volume (V0).
 * @param {number} params.deltaT - Change in temperature (ΔT).
 * @returns {number} Change in volume (ΔV).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateLiquidExpansion = ({ beta, V0, deltaT, digits = 4 }) => {
   validateNumber(beta, "beta");
   validateNumber(V0, "V0");
   validateNumber(deltaT, "deltaT");
   return formatNumber(beta * V0 * deltaT, digits);
};

/**
 * Calculates sensible heat using Q = mcΔT.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m).
 * @param {number} params.c - Specific heat capacity (c).
 * @param {number} params.deltaT - Change in temperature (ΔT).
 * @returns {number} Sensible heat (Q).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateSensibleHeat = ({ m, c, deltaT, digits = 4 }) => {
   validateNumber(m, "m");
   validateNumber(c, "c");
   validateNumber(deltaT, "deltaT");
   return formatNumber(m * c * deltaT, digits);
};

/**
 * Calculates latent heat using Q = mL.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Mass (m).
 * @param {number} params.L - Latent heat (L).
 * @returns {number} Latent heat (Q).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateLatentHeat = ({ m, L, digits = 4 }) => {
   validateNumber(m, "m");
   validateNumber(L, "L");
   return formatNumber(m * L, digits);
};

/**
 * Calculates ideal gas law using PV = nRT.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.P - Pressure (P).
 * @param {number} params.V - Volume (V).
 * @param {number} params.n - Number of moles (n).
 * @param {number} params.R - Ideal gas constant (R).
 * @param {number} params.T - Temperature (T).
 * @returns {boolean} True if the equation is satisfied.
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateIdealGasLaw = ({ P, V, n, R, T, digits = 4 }) => {
   validateNumber(P, "P");
   validateNumber(V, "V");
   validateNumber(n, "n");
   validateNumber(R, "R");
   validateNumber(T, "T");
   return formatNumber(P * V === n * R * T, digits);
};

/**
 * Calculates molecular kinetic energy using KE = (3/2)kT.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Boltzmann's constant (k).
 * @param {number} params.T - Temperature (T).
 * @returns {number} Molecular kinetic energy (KE).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateMolecularKE = ({ k, T, digits = 4 }) => {
   validateNumber(k, "k");
   validateNumber(T, "T");
   return formatNumber((3 / 2) * k * T, digits);
};

/**
 * Calculates molecular speed for Maxwell's distribution using v_p = √(2kT/m).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Boltzmann's constant (k).
 * @param {number} params.T - Temperature (T).
 * @param {number} params.m - Molecular mass (m).
 * @returns {number} Molecular speed (v_p).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateMolecularSpeedVP = ({ k, T, m, digits = 4 }) => {
   validateNumber(k, "k");
   validateNumber(T, "T");
   validateNumber(m, "m");
   return formatNumber(Math.sqrt((2 * k * T) / m), digits);
};

/**
 * Calculates average molecular speed using v_avg = √(8kT/(πm)).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Boltzmann's constant (k).
 * @param {number} params.T - Temperature (T).
 * @param {number} params.m - Molecular mass (m).
 * @returns {number} Average molecular speed (v_avg).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateMolecularSpeedAvg = ({ k, T, m, digits = 4 }) => {
   validateNumber(k, "k");
   validateNumber(T, "T");
   validateNumber(m, "m");
   return formatNumber(Math.sqrt((8 * k * T) / (Math.PI * m)), digits);
};

/**
 * Calculates root mean square molecular speed using v_rms = √(3kT/m).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Boltzmann's constant (k).
 * @param {number} params.T - Temperature (T).
 * @param {number} params.m - Molecular mass (m).
 * @returns {number} Root mean square molecular speed (v_rms).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateMolecularSpeedRMS = ({ k, T, m, digits = 4 }) => {
   validateNumber(k, "k");
   validateNumber(T, "T");
   validateNumber(m, "m");
   return formatNumber(Math.sqrt((3 * k * T) / m), digits);
};


/**
 * Calculates change in internal energy using ΔU = (3/2)nRTΔT.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.nR - moles times gas constant (nR).
 * @param {number} params.deltaT - Change in temperature (ΔT).
 * @returns {number} Change in internal energy (ΔU).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateInternalEnergyChange = ({ nR, deltaT, digits = 4 }) => {
   validateNumber(nR, "nR");
   validateNumber(deltaT, "deltaT");
   return formatNumber((3 / 2) * nR * deltaT, digits);
};

/**
 * Calculates thermodynamic work using W = -PΔV.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.P - Pressure (P).
 * @param {number} params.deltaV - Change in volume (ΔV).
 * @returns {number} Work done (W).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateThermodynamicWork = ({ P, deltaV  , digits = 4}) => {
    validateNumber(P, "P");
    validateNumber(deltaV, "deltaV");
    return formatNumber(-P * deltaV, digits); // Assumes constant pressure
 };
 
 /**
  * Calculates the efficiency of a real cycle using η_real = 1 - (Q_C / Q_H).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.QC - Heat rejected (Q_C).
  * @param {number} params.QH - Heat absorbed (Q_H).
  * @returns {number} Efficiency (η_real).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateEfficiencyReal = ({ QC, QH  , digits = 4}) => {
    validateNumber(QC, "QC");
    validateNumber(QH, "QH");
    return formatNumber(1 - QC / QH, digits);
 };
 
 /**
  * Calculates ideal efficiency using η_ideal = 1 - (T_C / T_H).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.TC - Cold reservoir temperature (T_C).
  * @param {number} params.TH - Hot reservoir temperature (T_H).
  * @returns {number} Ideal efficiency (η_ideal).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateEfficiencyIdeal = ({ TC, TH  , digits = 4}) => {
    validateNumber(TC, "TC");
    validateNumber(TH, "TH");
    return formatNumber(1 - TC / TH, digits);
 };
 
 /**
  * Calculates coefficient of performance for a real refrigerator using COP_real = QC / (QH - QC).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.QC - Heat removed from cold reservoir (Q_C).
  * @param {number} params.QH - Heat rejected to hot reservoir (Q_H).
  * @returns {number} Coefficient of performance (COP_real).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateCOPReal = ({ QC, QH  , digits = 4}) => {
    validateNumber(QC, "QC");
    validateNumber(QH, "QH");
    return formatNumber(QC / (QH - QC), digits);
 };
 
 /**
  * Calculates coefficient of performance for an ideal refrigerator using COP_ideal = TC / (TH - TC).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.TC - Cold reservoir temperature (T_C).
  * @param {number} params.TH - Hot reservoir temperature (T_H).
  * @returns {number} Coefficient of performance (COP_ideal).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateCOPIdeal = ({ TC, TH  , digits = 4}) => {
    validateNumber(TC, "TC");
    validateNumber(TH, "TH");
    return formatNumber(TC / (TH - TC), digits);
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
