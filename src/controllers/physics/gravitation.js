const {validateNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * Calculates gravitational force between two masses using F = -Gm1m2/r^2.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.G - Gravitational constant (G).
 * @param {number} params.m1 - Mass 1 (m1).
 * @param {number} params.m2 - Mass 2 (m2).
 * @param {number} params.r - Distance between masses (r).
 * @returns {number} Gravitational force (F).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateUniversalGravitation = ({ G, m1, m2, r  , digits = 4}) => {
    validateNumber(G, "G");
    validateNumber(m1, "m1");
    validateNumber(m2, "m2");
    validateNumber(r, "r");
    return formatNumber((-G * m1 * m2) / (r * r), digits);
 };
 
 /**
  * Calculates gravitational field using g = -Gm/r^2.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.G - Gravitational constant (G).
  * @param {number} params.m - Mass (m).
  * @param {number} params.r - Distance from mass (r).
  * @returns {number} Gravitational field strength (g).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateGravitationalField = ({ G, m, r  , digits = 4}) => {
    validateNumber(G, "G");
    validateNumber(m, "m");
    validateNumber(r, "r");
    return formatNumber((-G * m) / (r * r), digits);
 };
 
 /**
  * Calculates gravitational potential energy between two masses.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.G - Gravitational constant (G).
  * @param {number} params.m1 - Mass 1 (m1).
  * @param {number} params.m2 - Mass 2 (m2).
  * @param {number} params.r - Distance between masses (r).
  * @returns {number} Gravitational potential energy (PE).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateGravitationalPE = ({ G, m1, m2, r  , digits = 4}) => {
    validateNumber(G, "G");
    validateNumber(m1, "m1");
    validateNumber(m2, "m2");
    validateNumber(r, "r");
    return formatNumber((-G * m1 * m2) / r, digits);
 };
 
 /**
  * Calculates gravitational potential using V_g = -Gm/r.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.G - Gravitational constant (G).
  * @param {number} params.m - Mass (m).
  * @param {number} params.r - Distance from mass (r).
  * @returns {number} Gravitational potential (V_g).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateGravitationalPotential = ({ G, m, r  , digits = 4}) => {
    validateNumber(G, "G");
    validateNumber(m, "m");
    validateNumber(r, "r");
    return formatNumber((-G * m) / r, digits);
 };
 
 /**
  * Calculates orbital speed using v = sqrt(Gm/r).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.G - Gravitational constant (G).
  * @param {number} params.m - Mass (m).
  * @param {number} params.r - Orbital radius (r).
  * @returns {number} Orbital speed (v).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateOrbitalSpeed = ({ G, m, r  , digits = 4}) => {
    validateNumber(G, "G");
    validateNumber(m, "m");
    validateNumber(r, "r");
    return formatNumber(Math.sqrt((G * m) / r), digits);
 };
 
 /**
  * Calculates escape speed using v = sqrt(2Gm/r).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.G - Gravitational constant (G).
  * @param {number} params.m - Mass (m).
  * @param {number} params.r - Distance from mass (r).
  * @returns {number} Escape speed (v).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateEscapeSpeed = ({ G, m, r  , digits = 4}) => {
    validateNumber(G, "G");
    validateNumber(m, "m");
    validateNumber(r, "r");
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