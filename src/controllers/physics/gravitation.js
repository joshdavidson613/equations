const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates gravitational force between two masses using F = -Gm1m2/r^2.
 * The negative sign indicates an attractive force. The magnitude is Gm1m2/r^2.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.G - Gravitational constant (G).
 * @param {number} params.m1 - Mass 1 (m1).
 * @param {number} params.m2 - Mass 2 (m2).
 * @param {number} params.r - Distance between masses (r).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Gravitational force (F).
 * @throws {Error} If inputs are not finite numbers or fail validation rules.
 */
const calculateUniversalGravitation = ({ G, m1, m2, r, digits = 4 }) => {
    // Gravitational constant G is a fixed positive value.
    validateNumber(G, "G", { checkPositive: true });
    // Masses m1 and m2 must be non-negative.
    validateNumber(m1, "m1", { checkNonNegative: true });
    validateNumber(m2, "m2", { checkNonNegative: true });
    // Distance r must be positive (cannot be zero, division by r^2).
    validateNumber(r, "r", { checkPositive: true });
    return formatNumber((-G * m1 * m2) / (r * r), digits);
 };

 /**
  * Calculates gravitational field using g = -Gm/r^2.
  * The negative sign indicates the field points inward. The magnitude is Gm/r^2.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.G - Gravitational constant (G).
  * @param {number} params.m - Mass (m).
  * @param {number} params.r - Distance from mass (r).
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Gravitational field strength (g).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateGravitationalField = ({ G, m, r, digits = 4 }) => {
    // Gravitational constant G is a fixed positive value.
    validateNumber(G, "G", { checkPositive: true });
    // Mass m must be non-negative.
    validateNumber(m, "m", { checkNonNegative: true });
    // Distance r must be positive (cannot be zero, division by r^2).
    validateNumber(r, "r", { checkPositive: true });
    return formatNumber((-G * m) / (r * r), digits);
 };

 /**
  * Calculates gravitational potential energy between two masses. PE = -Gm1m2/r.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.G - Gravitational constant (G).
  * @param {number} params.m1 - Mass 1 (m1).
  * @param {number} params.m2 - Mass 2 (m2).
  * @param {number} params.r - Distance between masses (r).
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Gravitational potential energy (PE).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateGravitationalPE = ({ G, m1, m2, r, digits = 4 }) => {
    // Gravitational constant G is a fixed positive value.
    validateNumber(G, "G", { checkPositive: true });
    // Masses m1 and m2 must be non-negative.
    validateNumber(m1, "m1", { checkNonNegative: true });
    validateNumber(m2, "m2", { checkNonNegative: true });
    // Distance r must be positive (cannot be zero, division by r).
    validateNumber(r, "r", { checkPositive: true });
    return formatNumber((-G * m1 * m2) / r, digits);
 };

 /**
  * Calculates gravitational potential using V_g = -Gm/r.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.G - Gravitational constant (G).
  * @param {number} params.m - Mass (m).
  * @param {number} params.r - Distance from mass (r).
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Gravitational potential (V_g).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateGravitationalPotential = ({ G, m, r, digits = 4 }) => {
    // Gravitational constant G is a fixed positive value.
    validateNumber(G, "G", { checkPositive: true });
    // Mass m must be non-negative.
    validateNumber(m, "m", { checkNonNegative: true });
    // Distance r must be positive (cannot be zero, division by r).
    validateNumber(r, "r", { checkPositive: true });
    return formatNumber((-G * m) / r, digits);
 };

 /**
  * Calculates orbital speed using v = sqrt(Gm/r).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.G - Gravitational constant (G).
  * @param {number} params.m - Mass (m) of the central body.
  * @param {number} params.r - Orbital radius (r).
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Orbital speed (v).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateOrbitalSpeed = ({ G, m, r, digits = 4 }) => {
    // Gravitational constant G is a fixed positive value.
    validateNumber(G, "G", { checkPositive: true });
    // Mass m must be non-negative.
    validateNumber(m, "m", { checkNonNegative: true });
    // Orbital radius r must be positive (inside sqrt and denominator).
    validateNumber(r, "r", { checkPositive: true });
    return formatNumber(Math.sqrt((G * m) / r), digits);
 };

 /**
  * Calculates escape speed using v = sqrt(2Gm/r).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.G - Gravitational constant (G).
  * @param {number} params.m - Mass (m) of the central body.
  * @param {number} params.r - Distance from mass (r).
  * @param {number} [params.digits=4] - Number of decimal places for formatting.
  * @returns {number} Escape speed (v).
  * @throws {Error} If inputs are not finite numbers or fail validation rules.
  */
 const calculateEscapeSpeed = ({ G, m, r, digits = 4 }) => {
    // Gravitational constant G is a fixed positive value.
    validateNumber(G, "G", { checkPositive: true });
    // Mass m must be non-negative.
    validateNumber(m, "m", { checkNonNegative: true });
    // Distance r must be positive (inside sqrt and denominator).
    validateNumber(r, "r", { checkPositive: true });
    return formatNumber(Math.sqrt((2 * G * m) / r), digits);
 };


class gravitationController  {
    calculateUniversalGravitation = calculateUniversalGravitation;
    calculateGravitationalField = calculateGravitationalField;
    calculateGravitationalPE = calculateGravitationalPE;
    calculateGravitationalPotential = calculateGravitationalPotential;
    calculateOrbitalSpeed = calculateOrbitalSpeed;
    calculateEscapeSpeed = calculateEscapeSpeed;
}

module.exports = new gravitationController();