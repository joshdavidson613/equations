const {validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary


/**
 * Calculates wave speed using v = fλ.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.f - Frequency (f).
 * @param {number} params.lambda - Wavelength (λ).
 * @returns {number} Wave speed (v).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculatePeriodicWaveVelocity = ({ f, lambda  , digits = 4}) => {
    validateNumber(f, "f");
    validateNumber(lambda, "lambda");
    return formatNumber(f * lambda, digits);
 };
 
 /**
  * Calculates intensity using I = P/A.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.avgPower - Average power (P).
  * @param {number} params.A - Area (A).
  * @returns {number} Intensity (I).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateIntensity = ({ avgPower, A  , digits = 4}) => {
    validateNumber(avgPower, "avgPower");
    validateNumber(A, "A");
    return formatNumber(avgPower / A, digits);
 };
 
 /**
  * Calculates intensity level using L = 10 log10(I/I0).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.I - Intensity (I).
  * @param {number} params.I0 - Reference intensity (I0).
  * @returns {number} Intensity level (L).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateIntensityLevel = ({ I, I0  , digits = 4}) => {
    validateNumber(I, "I");
    validateNumber(I0, "I0");
    return formatNumber(10 * Math.log10(I / I0), digits);
 };
 
 /**
  * Calculates sound pressure level in decibels using L = 20 log10(ΔP/ΔP0).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.deltaP - Pressure change (ΔP).
  * @param {number} params.deltaP0 - Reference pressure change (ΔP0).
  * @returns {number} Pressure level (L).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculatePressureLevel = ({ deltaP, deltaP0  , digits = 4}) => {
    validateNumber(deltaP, "deltaP");
    validateNumber(deltaP0, "deltaP0");
    return formatNumber(20 * Math.log10(deltaP / deltaP0), digits);
 };
 
 /**
  * Calculates the Doppler effect for moving sources and observers using f' = (c + v_o) / (c - v_s).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.c - Speed of sound (c).
  * @param {number} params.vo - Speed of observer (v_o).
  * @param {number} params.vs - Speed of source (v_s).
  * @returns {number} Observed frequency (f').
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateDopplerEffect = ({ c, vo, vs  , digits = 4}) => {
    validateNumber(c, "c");
    validateNumber(vo, "vo");
    validateNumber(vs, "vs");
    return formatNumber((c + vo) / (c - vs), digits);
 };
 
 /**
  * Calculates Mach angle using θ_M = arcsin(c/v).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.c - Speed of sound (c).
  * @param {number} params.v - Speed of object (v).
  * @returns {number} Mach angle (θ_M).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateMachAngle = ({ c, v  , digits = 4}) => {
    validateNumber(c, "c");
    validateNumber(v, "v");
    return formatNumber(Math.asin(c / v), digits);
 };
 
 

class wavesOpticsController {
    calculatePeriodicWaveVelocity = calculatePeriodicWaveVelocity;
    calculateIntensity = calculateIntensity;
    calculateIntensityLevel = calculateIntensityLevel;
    calculatePressureLevel = calculatePressureLevel;
    calculateDopplerEffect = calculateDopplerEffect;
    calculateMachAngle = calculateMachAngle;
    
}

module.exports = new wavesOpticsController();