const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary


/**
 * Calculates Cherenkov angle using θ_C = arccos(c/nv_p).
 * Requires n*v_p >= c for a real angle to exist (otherwise arccos returns NaN).
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.c - Speed of light in vacuum (c). Must be positive.
 * @param {number} params.n - Refractive index (n). Must be positive.
 * @param {number} params.vp - Speed of particle (v_p). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Cherenkov angle (θ_C) in radians, or NaN if v_p < c/n.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateCerenkovAngle = ({ c, n, vp, digits = 4 }) => {
    // Speed of light in vacuum is a positive constant.
    validateNumber(c, "c", { checkPositive: true });
    // Refractive index is typically >= 1, must be positive in the denominator.
    validateNumber(n, "n", { checkPositive: true });
    // Particle speed must be positive (it's a magnitude). Must be > c/n for real angle.
    validateNumber(vp, "vp", { checkPositive: true });
    // The physical condition vp > c/n for a real angle is not enforced by validateNumber.
    // Math.acos handles the case where c/(n*vp) > 1 by returning NaN.
    return formatNumber(Math.acos(c / (n * vp)), digits);
 };

 /**
  * Calculates interference fringes position using y_n = (nλL)/d.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.lambda - Wavelength (λ). Must be positive.
  * @param {number} params.d - Slit separation (d). Must be positive.
  * @param {number} params.L - Distance from slit to screen (L). Must be non-negative.
  * @param {number} params.n - Fringe order (n). Typically an integer (0, ±1, ±2...). Can be non-integer for dark fringes depending on convention. No check needed for sign.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Position of nth fringe (y_n).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateInterferenceFringes = ({ lambda, d, L, n, digits = 4 }) => {
    // Wavelength must be positive.
    validateNumber(lambda, "lambda", { checkPositive: true });
    // Slit separation must be positive (in the denominator).
    validateNumber(d, "d", { checkPositive: true });
    // Distance to screen must be non-negative.
    validateNumber(L, "L", { checkNonNegative: true });
    // Fringe order n can be any number (integer for bright, half-integer for dark, depending on setup). No specific check needed for n.
    validateNumber(n, "n");
    return formatNumber((n * lambda * L) / d, digits);
 };

 /**
  * Calculates the index of refraction using n = c/v.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.c - Speed of light in vacuum (c). Must be positive.
  * @param {number} params.v - Speed of light in medium (v). Must be positive.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Index of refraction (n). Will be >= 1.
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateIndexofRefraction = ({ c, v, digits = 4 }) => {
    // Speed of light in vacuum is a positive constant.
    validateNumber(c, "c", { checkPositive: true });
    // Speed of light in medium must be positive (in the denominator) and typically <= c.
    validateNumber(v, "v", { checkPositive: true });
    // The physical constraint v <= c (or n >= 1) is not enforced by validateNumber.
    return formatNumber(c / v, digits);
 };

 /**
  * Validates Snell's Law using n1*sin(θ1) = n2*sin(θ2).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.n1 - Index of refraction 1 (n1). Must be non-negative.
  * @param {number} params.theta1 - Angle of incidence (θ1). Can be any angle.
  * @param {number} params.n2 - Index of refraction 2 (n2). Must be non-negative.
  * @param {number} params.theta2 - Angle of refraction (θ2). Can be any angle.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Formatted result of the equality check (1 for true, 0 for false).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateSnellsLaw = ({ n1, theta1, n2, theta2, digits = 4 }) => {
    // Refractive indices must be non-negative.
    validateNumber(n1, "n1", { checkNonNegative: true });
    validateNumber(n2, "n2", { checkNonNegative: true });
    // Angles can be any value. No specific check needed for theta1, theta2.
    validateNumber(theta1, "theta1");
    validateNumber(theta2, "theta2");
    // Note: Floating point comparison sensitive to precision.
    return formatNumber(n1 * Math.sin(theta1) === n2 * Math.sin(theta2), digits);
 };

 /**
  * Calculates critical angle using θ_c = arcsin(n2/n1).
  * Requires n1 > n2 >= 0 for a real angle to exist, and n1 > 0.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.n1 - Index of refraction of medium 1 (n1). Must be positive.
  * @param {number} params.n2 - Index of refraction of medium 2 (n2). Must be non-negative.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Critical angle (θ_c) in radians, or NaN if n2/n1 > 1 or n1 <= 0.
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateCriticalAngle = ({ n1, n2, digits = 4 }) => {
    // n1 is in the denominator of arcsin argument, must be positive.
    validateNumber(n1, "n1", { checkPositive: true });
    // n2 must be non-negative. For real angle, n2/n1 <= 1 (n2 <= n1).
    validateNumber(n2, "n2", { checkNonNegative: true });
    // The physical condition n2 <= n1 for a real angle is not enforced by validateNumber.
    // Math.asin handles the case where n2/n1 > 1 by returning NaN.
    return formatNumber(Math.asin(n2 / n1), digits);
 };

 /**
  * Validates image location using 1/f = 1/do + 1/di (Thin Lens/Mirror Equation).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.f - Focal length (f). Cannot be zero. Can be positive or negative.
  * @param {number} params.doValue - Object distance (do). Cannot be zero. Can be positive or negative depending on convention.
  * @param {number} params.diValue - Image distance (di). Cannot be zero. Can be positive or negative depending on convention.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Formatted result of the equality check (1 for true, 0 for false).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateImageLocation = ({ f, doValue, diValue, digits = 4 }) => {
    // Focal length, object distance, and image distance are in the denominator and cannot be zero.
    validateNumber(f, "f", { checkZero: true });
    validateNumber(doValue, "doValue", { checkZero: true });
    validateNumber(diValue, "diValue", { checkZero: true });
    // Note: Floating point comparison sensitive to precision.
    return formatNumber(1 / f === 1 / doValue + 1 / diValue, digits);
 };

 /**
  * Validates magnification equation h'/h = di/do.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.hiValue - Image height (h'). Can be positive or negative.
  * @param {number} params.hoValue - Object height (h). Cannot be zero. Typically positive.
  * @param {number} params.diValue - Image distance (di). Can be positive or negative.
  * @param {number} params.doValue - Object distance (do). Cannot be zero. Typically positive.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Formatted result of the equality check (1 for true, 0 for false).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateImageSize = ({ hiValue, hoValue, diValue, doValue, digits = 4 }) => {
    // Image height and image distance can be positive, negative, or zero. No specific checks needed.
    validateNumber(hiValue, "hiValue");
    validateNumber(diValue, "diValue");
    // Object height and object distance are in the denominator and cannot be zero. Object height is typically positive. Object distance is typically positive.
    validateNumber(hoValue, "hoValue", { checkZero: true }); // Assuming object height cannot be zero for magnification calculation
    validateNumber(doValue, "doValue", { checkZero: true }); // Object distance cannot be zero
     // Note: Floating point comparison sensitive to precision.
    return formatNumber(hiValue / hoValue === diValue / doValue, digits);
 };

 /**
  * Calculates focal length for a spherical mirror using f = r/2.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.r - Radius of curvature (r). Can be positive or negative depending on convention.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Focal length (f).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateSphericalMirror = ({ r, digits = 4 }) => {
    // Radius of curvature can be positive or negative depending on convex/concave convention. No specific check needed for r.
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