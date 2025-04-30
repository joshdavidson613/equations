PHYSICS_CONSTANTS = {
   /**
    * Gravitational Constant (m³ kg⁻¹ s⁻²)
    * @type {number}
    */
   G: 6.6743e-11,

   /**
    * Coulomb Constant (N m² C⁻²) (often k_e = 1 / (4πε₀))
    * @type {number}
    */
   K_COULOMB: 8.9875517923e9,

   /**
    * Permittivity of Free Space (F/m)
    * @type {number}
    */
   EPSILON_0: 8.8541878128e-12,

   /**
    * Permeability of Free Space (N/A²)
    * @type {number}
    */
   MU_0: 4 * Math.PI * 1e-7,

   /**
    * Speed of Light in Vacuum (m/s)
    * @type {number}
    */
   C: 299792458,

   /**
    * Planck Constant (J s)
    * @type {number}
    */
   H: 6.62607015e-34,

   /**
    * Reduced Planck Constant (J s) (h / 2π)
    * @type {number}
    */
   H_BAR: this.H / (2 * Math.PI),

   /**
    * Boltzmann Constant (J/K)
    * @type {number}
    */
   K_BOLTZMANN: 1.380649e-23,

   /**
    * Universal Gas Constant (J/(mol·K))
    * @type {number}
    */
   R_GAS: 8.314462618,

   /**
    * Stefan-Boltzmann Constant (W m⁻² K⁻⁴)
    * @type {number}
    */
   SIGMA_STEFAN: 5.670374419e-8,

   /**
    * Standard Gravity (m/s²) - average Earth surface gravity
    * @type {number}
    */
   G_EARTH: 9.80665,

   // Rydberg constant values
   RYDBERG_ENERGY_EV: 13.605693122994, // Rydberg energy unit (eV)
   RYDBERG_CONSTANT_M_INV: 10973731.568164, // Rydberg constant for infinite mass (m⁻¹)
};

module.exports= PHYSICS_CONSTANTS;
