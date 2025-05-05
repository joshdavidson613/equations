const {validateNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary


/**
 * Calculates Cherenkov angle using θ_C = arccos(c/nv_p).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.c - Speed of light (c).
 * @param {number} params.n - Refractive index (n).
 * @param {number} params.vp - Speed of particle (v_p).
 * @returns {number} Cherenkov angle (θ_C).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateCerenkovAngle = ({ c, n, vp  , digits = 4}) => {
    validateNumber(c, "c");
    validateNumber(n, "n");
    validateNumber(vp, "vp");
    return formatNumber(Math.acos(c / (n * vp)), digits);
 };
 
 /**
  * Calculates interference fringes using y_n = (nλL)/d.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.lambda - Wavelength (λ).
  * @param {number} params.d - Slit separation (d).
  * @param {number} params.L - Distance from slit to screen (L).
  * @param {number} params.n - Fringe order (n).
  * @returns {number} Position of nth fringe (y_n).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateInterferenceFringes = ({ lambda, d, L, n  , digits = 4}) => {
    validateNumber(lambda, "lambda");
    validateNumber(d, "d");
    validateNumber(L, "L");
    validateNumber(n, "n");
    return formatNumber((n * lambda * L) / d, digits);
 };
 
 /**
  * Calculates the index of refraction using n = c/v.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.c - Speed of light in vacuum (c).
  * @param {number} params.v - Speed of light in medium (v).
  * @returns {number} Index of refraction (n).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateIndexofRefraction = ({ c, v  , digits = 4}) => {
    validateNumber(c, "c");
    validateNumber(v, "v");
    return formatNumber(c / v, digits);
 };
 
 /**
  * Validates Snell's Law using n1*sen(θ1) = n2*sen(θ2).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.n1 - Index of refraction 1 (n1).
  * @param {number} params.theta1 - Angle of incidence (θ1).
  * @param {number} params.n2 - Index of refraction 2 (n2).
  * @param {number} params.theta2 - Angle of refraction (θ2).
  * @returns {boolean} True if Snell's law holds.
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateSnellsLaw = ({ n1, theta1, n2, theta2  , digits = 4}) => {
    validateNumber(n1, "n1");
    validateNumber(theta1, "theta1");
    validateNumber(n2, "n2");
    validateNumber(theta2, "theta2");
    return formatNumber(n1 * Math.sin(theta1) === n2 * Math.sin(theta2), digits);
 };
 
 /**
  * Calculates critical angle using θ_c = arcsin(n2/n1).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.n1 - Index of refraction of medium 1 (n1).
  * @param {number} params.n2 - Index of refraction of medium 2 (n2).
  * @returns {number} Critical angle (θ_c).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateCriticalAngle = ({ n1, n2  , digits = 4}) => {
    validateNumber(n1, "n1");
    validateNumber(n2, "n2");
    return formatNumber(Math.asin(n2 / n1), digits);
 };
 
 /**
  * Calculates image location using 1/f = 1/do + 1/di.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.f - Focal length (f).
  * @param {number} params.doValue - Object distance (do).
  * @param {number} params.diValue - Image distance (di).
  * @returns {boolean} True if lens equation holds.
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateImageLocation = ({ f, doValue, diValue  , digits = 4}) => {
    validateNumber(f, "f");
    validateNumber(doValue, "doValue");
    validateNumber(diValue, "diValue");
    return formatNumber(1 / f === 1 / doValue + 1 / diValue, digits);
 };
 
 /**
  * Calculates image size using h'/h = di/do.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.hiValue - Image height (h').
  * @param {number} params.hoValue - Object height (h).
  * @param {number} params.diValue - Image distance (di).
  * @param {number} params.doValue - Object distance (do).
  * @returns {boolean} True if magnification equation holds.
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateImageSize = ({ hiValue, hoValue, diValue, doValue  , digits = 4}) => {
    validateNumber(hiValue, "hiValue");
    validateNumber(hoValue, "hoValue");
    validateNumber(diValue, "diValue");
    validateNumber(doValue, "doValue");
    return formatNumber(hiValue / hoValue === diValue / doValue, digits);
 };
 
 /**
  * Calculates focal length for a spherical mirror using f = r/2.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.r - Radius of curvature (r).
  * @returns {number} Focal length (f).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateSphericalMirror = ({ r  , digits = 4}) => {
    validateNumber(r, "r");
    return formatNumber(r / 2, digits);
 };
 

class opticsController {
    calculateCerenkovAngle = calculateCerenkovAngle;
    calculateInterferenceFringes = calculateInterferenceFringes;
    calculateIndexofRefraction = calculateIndexofRefraction;
    calculateSnellsLaw = calculateSnellsLaw;
    calculateCriticalAngle = calculateCriticalAngle;
    calculateImageLocation = calculateImageLocation;
    calculateImageSize = calculateImageSize;
    calculateSphericalMirror = calculateSphericalMirror;
}    

module.exports = new opticsController();