const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates wave speed using v = fλ. Assumes f and λ are positive magnitudes.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.f - Frequency (f). Must be non-negative.
 * @param {number} params.lambda - Wavelength (λ). Must be non-negative.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Wave speed (v). Will be non-negative.
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculatePeriodicWaveVelocity = ({ f, lambda, digits = 4 }) => {
    // Frequency f is typically treated as non-negative magnitude for speed calculation.
    validateNumber(f, "f", { checkNonNegative: true });
    // Wavelength lambda is typically treated as non-negative magnitude for speed calculation.
    validateNumber(lambda, "lambda", { checkNonNegative: true });
    return formatNumber(f * lambda, digits);
 };

 /**
  * Calculates intensity using I = P/A.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.avgPower - Average power (P). Must be non-negative.
  * @param {number} params.A - Area (A). Must be positive.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Intensity (I). Will be non-negative.
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateIntensity = ({ avgPower, A, digits = 4 }) => {
    // Average power P is typically non-negative.
    validateNumber(avgPower, "avgPower", { checkNonNegative: true });
    // Area A must be positive (in denominator).
    validateNumber(A, "A", { checkPositive: true });
    return formatNumber(avgPower / A, digits);
 };

 /**
  * Calculates intensity level in decibels using L = 10 log10(I/I0).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.I - Intensity (I). Must be positive.
  * @param {number} params.I0 - Reference intensity (I0). Must be positive.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Intensity level (L).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateIntensityLevel = ({ I, I0, digits = 4 }) => {
    // Intensity I must be positive (argument of log10 and numerator).
    validateNumber(I, "I", { checkPositive: true });
    // Reference intensity I0 must be positive (argument of log10 and denominator).
    validateNumber(I0, "I0", { checkPositive: true });
    return formatNumber(10 * Math.log10(I / I0), digits);
 };

 /**
  * Calculates sound pressure level in decibels using L = 20 log10(ΔP_rms/ΔP0_rms).
  * Assumes deltaP and deltaP0 are RMS pressure values or amplitudes.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.deltaP - Pressure change (ΔP). Must be positive.
  * @param {number} params.deltaP0 - Reference pressure change (ΔP0). Must be positive.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Pressure level (L).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculatePressureLevel = ({ deltaP, deltaP0, digits = 4 }) => {
    // Pressure change magnitude deltaP must be positive (argument of log10 and numerator).
    validateNumber(deltaP, "deltaP", { checkPositive: true });
    // Reference pressure change magnitude deltaP0 must be positive (argument of log10 and denominator).
    validateNumber(deltaP0, "deltaP0", { checkPositive: true });
    return formatNumber(20 * Math.log10(deltaP / deltaP0), digits);
 };

 /**
  * Calculates the Doppler effect for moving sources and observers in a medium using
  * f' = f_source * (c + v_observer) / (c - v_source).
  * Speeds v_observer and v_source are relative to the medium.
  * v_observer is positive if the observer moves TOWARDS the source.
  * v_source is positive if the source moves TOWARDS the observer.
  * Requires c > 0, f_source >= 0, and v_source != c. Standard formula is for |v_observer| < c and |v_source| < c.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.f_source - Frequency of the source (f_source). Must be non-negative.
  * @param {number} params.c - Speed of sound in the medium (c). Must be positive.
  * @param {number} params.v_observer - Speed of observer relative to the medium (v_o). Positive towards source, negative away.
  * @param {number} params.v_source - Speed of source relative to the medium (v_s). Positive towards observer, negative away.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Observed frequency (f'). Will be non-negative if f_source is non-negative and inputs are valid.
  * @throws {Error} If inputs are invalid (not finite numbers, c not positive, f_source negative, or v_source equals c).
  */
 const calculateDopplerEffect = ({ f_source, c, v_observer, v_source, digits = 4 }) => { // Added f_source param, renamed vo/vs
    validateNumber(f_source, "f_source", { checkNonNegative: true }); // Source frequency non-negative
    validateNumber(c, "c", { checkPositive: true }); // Speed of sound positive
    validateNumber(v_observer, "v_observer"); // Observer speed relative to medium (signed)
    validateNumber(v_source, "v_source"); // Source speed relative to medium (signed)

    const denominator = c - v_source;
    if (denominator === 0) {
       throw new Error("Source speed (v_source) cannot be equal to the speed of sound (c).");
    }

    // Calculate observed frequency using the standard formula
    // f_observed = f_source * (c + v_observer) / (c - v_source)
    const observedFrequency = f_source * (c + v_observer) / (c - v_source);

    // Although the formula can mathematically produce a negative frequency
    // if the numerator and denominator have opposite signs, physically
    // observed frequency is typically non-negative. However, some contexts
    // might interpret a negative frequency. Let's return the mathematical result.
    // Note: For v_s > c, the denominator is negative. For v_o < -c, the numerator is negative.
    // The standard formula applies for |v_observer| < c and |v_source| < c.
    // If |v_source| >= c, shock waves form and this formula is not strictly applicable.
    // We enforce v_source != c with the zero check, but don't strictly enforce |v|<c.

    return formatNumber(observedFrequency, digits);
 };

 /**
  * Calculates Mach angle using θ_M = arcsin(c/v). Requires v >= c.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.c - Speed of sound (c). Must be positive.
  * @param {number} params.v - Speed of object (v). Must be positive and greater than or equal to c.
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Mach angle (θ_M) in radians. Will be in [0, π/2]. Returns NaN if v < c.
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateMachAngle = ({ c, v, digits = 4 }) => {
    // Speed of sound c must be positive.
    validateNumber(c, "c", { checkPositive: true });
    // Speed of object v must be positive and >= c for real angle.
    validateNumber(v, "v", { checkPositive: true });

    // Check the condition for a real Mach angle
    if (v < c) {
        // Returns NaN implicitly from Math.asin if c/v > 1, but explicit check is clearer.
        throw new Error("Object speed (v) must be greater than or equal to the speed of sound (c) for a real Mach angle.");
    }
    // If v=c, c/v = 1, arcsin(1) = pi/2 (or 90 degrees).
    // If v > c, c/v < 1, arcsin(c/v) gives a value between 0 and pi/2.

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