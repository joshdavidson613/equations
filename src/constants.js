/**
 * @module Constants
 * @description Defines common physics constants.
 */

/**
 * Gravitational Constant (m³ kg⁻¹ s⁻²)
 * @type {number}
 */
const G = 6.67430e-11;

/**
 * Coulomb Constant (N m² C⁻²) (often k_e = 1 / (4πε₀))
 * @type {number}
 */
const K_COULOMB = 8.9875517923e9;

/**
 * Permittivity of Free Space (F/m)
 * @type {number}
 */
const EPSILON_0 = 8.8541878128e-12;

/**
 * Permeability of Free Space (N/A²)
 * @type {number}
 */
const MU_0 = 4 * Math.PI * 1e-7;

/**
 * Speed of Light in Vacuum (m/s)
 * @type {number}
 */
const C = 299792458;

/**
 * Planck Constant (J s)
 * @type {number}
 */
const H = 6.62607015e-34;

/**
 * Reduced Planck Constant (J s) (h / 2π)
 * @type {number}
 */
const H_BAR = H / (2 * Math.PI);

/**
 * Boltzmann Constant (J/K)
 * @type {number}
 */
const K_BOLTZMANN = 1.380649e-23;

/**
 * Universal Gas Constant (J/(mol·K))
 * @type {number}
 */
const R_GAS = 8.314462618;

/**
 * Stefan-Boltzmann Constant (W m⁻² K⁻⁴)
 * @type {number}
 */
const SIGMA_STEFAN = 5.670374419e-8;

/**
 * Standard Gravity (m/s²) - average Earth surface gravity
 * @type {number}
 */
const G_EARTH = 9.80665;

// Add more constants as needed

module.exports = {
    G,
    K_COULOMB,
    EPSILON_0,
    MU_0,
    C,
    H,
    H_BAR,
    K_BOLTZMANN,
    R_GAS,
    SIGMA_STEFAN,
    G_EARTH,
};