const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary
const PHYSICS_CONSTANTS = require("../../enums/physics"); // Adjust the path as necessary   
/**
 * Calculates the Lorentz factor (γ) for a given velocity relative to the speed of light.
 * γ = 1 / √(1 - (v^2/c^2)).
 * Requires v <= c.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.v - Velocity (must be in the same units as c).
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in the same units as v). Defaults to the standard value in m/s.
 * @returns {number} The dimensionless Lorentz factor (γ).
 * @throws {Error} If inputs are invalid (not finite numbers, c is zero, or v >= c).
 */
const calculateLorentzFactor = ({ v, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(v, "v");
   validateNumber(c, "c", { checkZero: true });

   const speedRatioSquared = (v * v) / (c * c);

   if (speedRatioSquared > 1) {
      throw new Error("Velocity (v) cannot be greater than the speed of light (c).");
   }

   // Handle v = c case explicitly to return Infinity
   if (speedRatioSquared === 1) {
      return formatNumber(Infinity, digits);
   }

   return formatNumber(1 / Math.sqrt(1 - speedRatioSquared), digits);
};

/**
 * Calculates time dilation (t') for a time interval (t0) observed in a moving frame.
 * t' = γ * t0 = t0 / √(1 - (v^2/c^2)).
 * Requires v <= c.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.t0 - Proper time (time measured in the moving object's rest frame). Must be non-negative.
 * @param {number} params.v - Velocity (must be in the same units as c).
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in the same units as v). Defaults to the standard value in m/s.
 * @returns {number} The dilated time (t') measured in the observer's frame (same units as t0). Returns Infinity if v=c.
 * @throws {Error} If inputs are invalid (not finite numbers, c is zero, v >= c, or t0 is negative).
 */
const calculateTimeDilation = ({ t0, v, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(t0, "t0", { checkNonNegative: true });
   validateNumber(v, "v");
   validateNumber(c, "c", { checkZero: true });

   const speedRatioSquared = (v * v) / (c * c);

   if (speedRatioSquared > 1) {
      throw new Error("Velocity (v) cannot be greater than the speed of light (c).");
   }

   // Handle v = c case explicitly
   if (speedRatioSquared === 1) {
      return formatNumber(Infinity, digits); // Time dilation is infinite at the speed of light
   }

   return formatNumber(t0 / Math.sqrt(1 - speedRatioSquared), digits);
};

/**
 * Calculates length contraction (L') for a length (L0) measured in a moving frame.
 * L' = L0 / γ = L0 * √(1 - (v^2/c^2)).
 * Requires v <= c.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.L0 - Proper length (length measured in the moving object's rest frame). Must be non-negative.
 * @param {number} params.v - Velocity (must be in the same units as c).
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in the same units as v). Defaults to the standard value in m/s.
 * @returns {number} The contracted length (L') measured in the observer's frame (same units as L0). Returns 0 if v=c.
 * @throws {Error} If inputs are invalid (not finite numbers, c is zero, v >= c, or L0 is negative).
 */
const calculateLengthContraction = ({ L0, v, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(L0, "L0", { checkNonNegative: true });
   validateNumber(v, "v");
   validateNumber(c, "c", { checkZero: true });

   const speedRatioSquared = (v * v) / (c * c);

   if (speedRatioSquared > 1) {
      throw new Error("Velocity (v) cannot be greater than the speed of light (c).");
   }

   // Handle v = c case explicitly
   if (speedRatioSquared === 1) {
      return formatNumber(0, digits); // Length contracts to zero at the speed of light
   }

   return formatNumber(L0 * Math.sqrt(1 - speedRatioSquared), digits);
};

/**
 * Calculates the relative velocity (u') of two objects moving along the same line (1D)
 * according to relativistic velocity addition.
 * u' = (u + v) / (1 + uv/c^2).
 * Requires |u| < c, |v| < c, and c !== 0.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.u - Velocity of one object relative to a frame (e.g., frame S).
 * @param {number} params.v - Velocity of another frame (e.g., frame S') relative to the first frame (S).
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in consistent units). Defaults to the standard value in m/s).
 * @returns {number} The resulting relative velocity (u') of the first object (u) as measured in the second frame (S') (same units as u and v).
 * @throws {Error} If inputs are invalid (not finite numbers, c is zero, or denominator is zero).
 */
const calculateRelativeVelocity = ({ u, v, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(u, "u");
   validateNumber(v, "v");
   validateNumber(c, "c", { checkZero: true });

   // Theoretical check for denominator being zero, although unlikely if |u|, |v| < c
   const denominator = 1 + (u * v) / (c * c);
   if (denominator === 0) {
      // This case occurs if uv/c^2 = -1. If c is finite and non-zero, this
      // would mean u*v = -c^2. If |u| < c and |v| < c, then |u*v| < c^2,
      // so u*v > -c^2, and the denominator is always positive.
      // However, checking avoids potential division by zero errors if inputs
      // somehow allow this mathematically.
      throw new Error("Invalid input velocities (u, v) or speed of light (c) causing division by zero.");
   }

   return formatNumber((u + v) / denominator, digits);
};

/**
 * Calculates the total relativistic energy (E) of an object.
 * E = γmc^2 = mc^2 / √(1 - (v^2/c^2)).
 * Requires v <= c. Assumes mc^2 is rest energy.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Rest mass of the object. Must be non-negative.
 * @param {number} params.v - Velocity of the object (must be in the same units as c).
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in the same units as v). Defaults to the standard value in m/s.
 * @returns {number} The total relativistic energy (E). Units depend on the units of m and c (e.g., Joules if m in kg, c in m/s). Returns Infinity if v=c and m > 0. Returns 0 if m=0.
 * @throws {Error} If inputs are invalid (not finite numbers, c is zero, v > c, or m is negative).
 */
const calculateRelativisticEnergy = ({ m, v, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(m, "m", { checkNonNegative: true });
   validateNumber(v, "v");
   validateNumber(c, "c", { checkZero: true });

   // Handle the case of massless particles (like photons)
   if (m === 0) {
      // For massless particles, E = pc. This equation E=gamma*mc^2 is not directly applicable.
      // However, Math.sqrt(1 - v*v/c*c) becomes 0 for v=c. If m=0, 0/0 is indeterminate.
      // Physically, massless particles *only* travel at c. Their energy is E=pc.
      // This function is designed for massive particles. Let's explicitly check v for massless case.
      if (Math.abs(v) !== c) {
         throw new Error("Massless particles (m=0) must travel at the speed of light (v=c).");
      }
      // If m=0 and v=c, the E=pc equation is needed. This function can't calculate that
      // without momentum. It's better to state this function is for massive particles.
      throw new Error(
         "This function calculateRelativisticEnergy(m, v, c) is primarily for particles with rest mass (m > 0). Use calculateEnergyMomentumRelation for massless particles (E=pc)."
      );
   }

   // Now handle m > 0
   const speedRatioSquared = (v * v) / (c * c);

   if (speedRatioSquared > 1) {
      throw new Error("Velocity (v) cannot be greater than the speed of light (c).");
   }

   // Handle v = c case for m > 0
   if (speedRatioSquared === 1) {
      return formatNumber(Infinity, digits); // Energy is infinite for massive particles at the speed of light
   }

   const mc2 = m * c * c;
   return formatNumber(mc2 / Math.sqrt(1 - speedRatioSquared), digits);
};

/**
 * Calculates the relativistic momentum (p) of an object.
 * p = γmv = mv / √(1 - (v^2/c^2)).
 * Requires v < c. Assumes m is rest mass.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Rest mass of the object. Must be non-negative.
 * @param {number} params.v - Velocity of the object (must be in the same units as c).
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in the same units as v). Defaults to the standard value in m/s.
 * @returns {number} The relativistic momentum (p). Units depend on the units of m and v (e.g., kg·m/s). Returns Infinity if v=c and m > 0. Returns 0 if m=0.
 * @throws {Error} If inputs are invalid (not finite numbers, c is zero, or v >= c).
 */
const calculateRelativisticMomentum = ({ m, v, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(m, "m", { checkNonNegative: true });
   validateNumber(v, "v");
   validateNumber(c, "c", { checkZero: true });

   // Handle the case of massless particles (like photons)
   if (m === 0) {
      // For massless particles, E = pc, so p = E/c. This function needs E or f or lambda.
      // Like calculateRelativisticEnergy, this form is for massive particles.
      if (Math.abs(v) !== c) {
         throw new Error("Massless particles (m=0) must travel at the speed of light (v=c).");
      }
      // If m=0 and v=c, the p=E/c equation is needed.
      throw new Error(
         "This function calculateRelativisticMomentum(m, v, c) is primarily for particles with rest mass (m > 0). Use calculatePhotonMomentumFromWavelength or calculateEnergyMomentumRelation for massless particles."
      );
   }

   // Now handle m > 0
   const speedRatioSquared = (v * v) / (c * c);

   if (speedRatioSquared > 1) {
      throw new Error("Velocity (v) cannot be greater than the speed of light (c).");
   }

   // Handle v = c case for m > 0
   if (speedRatioSquared === 1) {
      // Momentum is infinite for massive particles at the speed of light
      return formatNumber(v > 0 ? Infinity : v < 0 ? -Infinity : 0, digits); // Retain sign of v
   }

   const mv = m * v; // Classical momentum-like term
   return formatNumber(mv / Math.sqrt(1 - speedRatioSquared), digits);
};

/**
 * Calculates the total energy (E) of an object using the energy-momentum relation.
 * E^2 = (pc)^2 + (mc^2)^2  => E = √((pc)^2 + (mc^2)^2)
 * Where p is relativistic momentum and m is rest mass.
 * This equation is valid for both massive (m>0) and massless (m=0) particles.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.p - Relativistic momentum. Must be non-negative (magnitude).
 * @param {number} params.m - Rest mass. Must be non-negative.
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in consistent units). Defaults to the standard value in m/s).
 * @returns {number} The total energy (E). Units depend on the units of p, m, and c (e.g., Joules if p in kg·m/s, m in kg, c in m/s).
 * @throws {Error} If inputs are invalid (not finite numbers, c is zero, p or m is negative).
 */
const calculateEnergyMomentumRelation = ({ p, m, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   // Renamed from calculateEnergyMomentum for clarity, as the previous one didn't use momentum.
   validateNumber(p, "p", { checkNonNegative: true }); // Usually use momentum magnitude
   validateNumber(m, "m", { checkNonNegative: true });
   validateNumber(c, "c", { checkZero: true });

   const pcSquared = p * c * (p * c);
   const mc2Squared = m * c * c * (m * c * c);

   return formatNumber(Math.sqrt(pcSquared + mc2Squared), digits);
};

/**
 * Calculates mass-energy equivalence (rest energy) using E0 = mc^2.
 * This is the energy contained in the mass of an object when it is at rest.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Rest mass (m). Must be non-negative.
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in consistent units). Defaults to the standard value in m/s).
 * @returns {number} Rest energy (E0). Units depend on the units of m and c (e.g., Joules if m in kg, c in m/s).
 * @throws {Error} If inputs are invalid (not finite numbers, c is zero, or m is negative).
 */
const calculateMassEnergyEquivalence = ({ m, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   // Renamed from calculateMassEnergy for clarity (it calculates REST energy).
   validateNumber(m, "m", { checkNonNegative: true });
   validateNumber(c, "c", { checkZero: true });

   return formatNumber(m * c * c, digits);
};

/**
 * Calculates the relativistic kinetic energy (KE) of an object.
 * KE = E - E0 = γmc^2 - mc^2 = (γ - 1)mc^2 = (1/√(1 - (v^2/c^2)) - 1)mc^2.
 * Requires v < c. Assumes mc^2 is rest energy.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Rest mass of the object. Must be non-negative.
 * @param {number} params.v - Velocity of the object (must be in the same units as c).
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in the same units as v). Defaults to the standard value in m/s).
 * @returns {number} The relativistic kinetic energy (KE). Units depend on the units of m and c (e.g., Joules). Returns 0 if v=0 or m=0. Returns Infinity if v=c and m > 0.
 * @throws {Error} If inputs are invalid (not finite numbers, c is zero, v >= c, or m is negative).
 */
const calculateRelativisticKE = ({ m, v, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(m, "m", { checkNonNegative: true });
   validateNumber(v, "v");
   validateNumber(c, "c", { checkZero: true });

   // Handle v = 0 case separately (KE is 0)
   if (v === 0) {
      return formatNumber(0, digits);
   }

   // Handle m = 0 case separately (KE is total energy for massless particles, which is E=pc, not (gamma-1)mc^2)
   if (m === 0) {
      throw new Error(
         "Relativistic kinetic energy (KE) is typically calculated for particles with rest mass (m > 0). For massless particles, KE = Total Energy (E = pc)."
      );
   }

   const speedRatioSquared = (v * v) / (c * c);

   if (speedRatioSquared >= 1) {
      // KE is infinite at or above c for m>0
      throw new Error(
         "Velocity (v) must be less than the speed of light (c) for finite kinetic energy calculation with rest mass."
      );
   }

   const lorentzFactor = 1 / Math.sqrt(1 - speedRatioSquared);
   const restEnergy = m * c * c;

   return formatNumber((lorentzFactor - 1) * restEnergy, digits);
};

/**
 * Calculates the observed wavelength (λ') due to the relativistic longitudinal Doppler effect.
 * This describes the change in wavelength when the source and observer are moving
 * directly towards or away from each other.
 * λ' = λ₀√((1 + v_rel/c)/(1 - v_rel/c)).
 * v_rel is the relative velocity: positive if source and observer are moving away,
 * negative if moving towards.
 * Requires |v_rel| < c, λ₀ > 0, c > 0.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.lambda0 - Emitted (proper) wavelength in the source's rest frame. Must be positive.
 * @param {number} params.v_rel - Relative velocity between observer and source. Positive for recession (moving away), negative for approach (moving towards). Must be in the same units as c.
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in the same units as v_rel). Defaults to the standard value in m/s).
 * @returns {number} The observed wavelength (λ'). Units are the same as lambda0. Returns Infinity if v_rel=c. Returns 0 if v_rel=-c.
 * @throws {Error} If inputs are invalid (not finite numbers, c is zero, lambda0 is not positive, or |v_rel| >= c).
 */
const calculateRelativisticDopplerEffect = ({ lambda0, v_rel, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   // Renamed v to v_rel for clarity on its meaning
   validateNumber(lambda0, "lambda0", { checkPositive: true });
   validateNumber(v_rel, "v_rel");
   validateNumber(c, "c", { checkPositive: true }); // Speed of light should be positive

   const speedRatio = v_rel / c;

   if (Math.abs(speedRatio) >= 1) {
      throw new Error(
         "Relative velocity (v_rel) must be less than the speed of light (c) for the square root to be real and the denominator non-zero."
      );
   }

   const factor = Math.sqrt((1 + speedRatio) / (1 - speedRatio));

   return formatNumber(lambda0 * factor, digits);
};

// --- Quantum Mechanics / Photon Functions ---

/**
 * Calculates photon energy (E) from its frequency (f) using Planck's relation.
 * E = hf.
 * Requires h > 0, f >= 0.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.f - Frequency (f). Must be non-negative.
 * @param {number} [params.h=PHYSICS_CONSTANTS.H] - Planck's constant (h). Defaults to the standard value in J·s. Ensure units are consistent (e.g., if h is in J·s, f should be in Hz (s⁻¹), and E will be in Joules).
 * @returns {number} Photon energy (E). Units depend on the units of h and f.
 * @throws {Error} If inputs are invalid (not finite numbers, h not positive, or f negative).
 */
const calculatePhotonEnergyFromFrequency = ({ f, h = PHYSICS_CONSTANTS.H, digits = 4 }) => {
   // Renamed from calculatePhotonEnergy for clarity (uses frequency)
   validateNumber(f, "f", { checkNonNegative: true });
   validateNumber(h, "h", { checkPositive: true }); // Planck's constant must be positive
   return formatNumber(h * f, digits);
};

/**
 * Calculates photon momentum (p) from its wavelength (λ) using the de Broglie relation for photons.
 * p = h/λ.
 * Requires h > 0, λ > 0.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.lambda - Wavelength (λ). Must be positive.
 * @param {number} [params.h=PHYSICS_CONSTANTS.H] - Planck's constant (h). Defaults to the standard value in J·s. Ensure units are consistent (e.g., if h is in J·s, lambda should be in meters (m), and p will be in kg·m/s).
 * @returns {number} Photon momentum (p). Units depend on the units of h and lambda.
 * @throws {Error} If inputs are invalid (not finite numbers, h not positive, or lambda not positive).
 */
const calculatePhotonMomentumFromWavelength = ({ lambda, h = PHYSICS_CONSTANTS.H, digits = 4 }) => {
   // Renamed from calculatePhotonMomentum for clarity (uses wavelength)
   validateNumber(lambda, "lambda", { checkPositive: true }); // Wavelength must be positive
   validateNumber(h, "h", { checkPositive: true }); // Planck's constant must be positive
   return formatNumber(formatNumber(h / lambda, digits), digits);
};

/**
 * Calculates the maximum kinetic energy (KE_max) of emitted electrons in the photoelectric effect.
 * KE_max = hf - φ, but cannot be negative.
 * If hf <= φ, no electrons are emitted, and KE_max is 0.
 * Requires hf >= 0, φ >= 0.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.photonEnergy - The energy of the incoming photon (E = hf). Must be non-negative.
 * @param {number} params.phi - The work function (φ) of the metal (minimum energy required to remove an electron). Must be non-negative.
 * @returns {number} The maximum kinetic energy of an emitted electron. Units are the same as photonEnergy and phi. Returns 0 if photonEnergy <= phi.
 * @throws {Error} If inputs are invalid (not finite numbers, or photonEnergy or phi are negative).
 */
const calculatePhotoelectricEffectKE = ({ photonEnergy, phi, digits = 4 }) => {
   // Renamed from calculatePhotoelectricEffect for clarity (calculates KE)
   // Renamed E to photonEnergy for clarity
   validateNumber(photonEnergy, "photonEnergy", { checkNonNegative: true });
   validateNumber(phi, "phi", { checkNonNegative: true });

   // If photon energy is less than or equal to the work function, no electrons are emitted.
   const result = photonEnergy - phi;
   return formatNumber(Math.max(0, result), digits); // Kinetic energy cannot be negative
};

// --- Atomic Physics Functions ---

/**
 * Calculates the energy difference or wavenumber for an electron transition in a
 * hydrogen-like atom (an atom with only one electron, e.g., H, He+, Li++).
 * The equation used is proportional to Z^2 * (1/n_initial^2 - 1/n_final^2).
 * The output type (energy or wavenumber) depends on the units of the `constant`.
 *
 * For Energy: E_final - E_initial = R_y * Z^2 * (1/n_initial^2 - 1/n_final^2)
 *   (Uses Rydberg energy unit R_y, result is in energy units)
 *   Positive result: Absorption (n_final > n_initial)
 *   Negative result: Emission (n_final < n_initial)
 *
 * For Wavenumber: 1/lambda = R_inf * Z^2 * (1/n_initial^2 - 1/n_final^2)
 *   (Uses Rydberg constant R_inf, result is in reciprocal length units)
 *   Positive result: Emission (n_final < n_initial)
 *   Negative result: Absorption (n_final > n_initial)
 *
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.nInitial - Principal quantum number of the initial energy level. Must be a positive integer.
 * @param {number} params.nFinal - Principal quantum number of the final energy level. Must be a positive integer and different from nInitial.
 * @param {number} params.constant - The Rydberg constant value in desired units (e.g., PHYSICS_CONSTANTS.RYDBERG_ENERGY_EV for energy in eV, or PHYSICS_CONSTANTS.RYDBERG_CONSTANT_M_INV for wavenumber in m⁻¹). Must be positive.
 * @param {number} [params.atomicNumber=1] - The atomic number (Z) of the hydrogen-like atom. Must be a positive integer (default is 1 for Hydrogen).
 * @returns {number} The calculated energy difference or wavenumber based on the constant's units.
 * @throws {Error} If inputs are invalid (not positive integers for nInitial, nFinal, atomicNumber, nInitial === nFinal, or constant not positive).
 */
const calculateRydbergTransition = ({ nInitial, nFinal, constant, atomicNumber = 1, digits = 4 }) => {
   // This single function can calculate either energy or wavenumber depending on the 'constant' provided.
   // Let's use nInitial and nFinal consistently as the starting and ending levels.

   validateNumber(nInitial, "nInitial", { checkPositive: true, checkInteger: true });
   validateNumber(nFinal, "nFinal", { checkPositive: true, checkInteger: true });
   validateNumber(atomicNumber, "atomicNumber (Z)", { checkPositive: true, checkInteger: true });
   validateNumber(constant, "constant (Rydberg value)", { checkPositive: true }); // Rydberg constant should be positive

   if (nInitial === nFinal) {
      throw new Error("nInitial and nFinal must be different for a transition.");
   }

   const initialTerm = 1 / (nInitial * nInitial);
   const finalTerm = 1 / (nFinal * nFinal);

   // The equation R * Z^2 * (1/n_lower^2 - 1/n_upper^2) gives a positive value for emission.
   // To get a consistent sign convention where E_final - E_initial has meaning:
   // E_final - E_initial = Constant * Z^2 * (1/n_initial^2 - 1/n_final^2)
   // If using the negative of the binding energy equation:
   // E_n = -R_y * Z^2 / n^2
   // E_final - E_initial = (-R_y * Z^2 / nFinal^2) - (-R_y * Z^2 / nInitial^2)
   // = R_y * Z^2 * (1 / nInitial^2 - 1 / nFinal^2)

   const result = constant * (atomicNumber * atomicNumber) * (initialTerm - finalTerm);

   // The sign of the result:
   // If nFinal > nInitial (absorption), (1/nInitial^2 - 1/nFinal^2) is positive. Result is positive.
   // If nFinal < nInitial (emission), (1/nInitial^2 - 1/nFinal^2) is negative. Result is negative.
   // This sign convention is consistent with Delta E = E_final - E_initial.

   return formatNumber(result, digits);
};

// Define the controller class, assigning only the functions that actually exist
class relativityQuantumController {
   calculateLorentzFactor = calculateLorentzFactor;
   calculateTimeDilation = calculateTimeDilation;
   calculateLengthContraction = calculateLengthContraction;
   calculateRelativeVelocity = calculateRelativeVelocity;
   calculateRelativisticEnergy = calculateRelativisticEnergy;
   calculateRelativisticMomentum = calculateRelativisticMomentum;
   calculateMassEnergyEquivalence = calculateMassEnergyEquivalence; // Correct name
   calculateEnergyMomentumRelation = calculateEnergyMomentumRelation; // Correct name
   // Removed: calculateMassEnergy
   calculateRelativisticKE = calculateRelativisticKE;
   calculateRelativisticDopplerEffect = calculateRelativisticDopplerEffect;
   calculatePhotonEnergyFromFrequency = calculatePhotonEnergyFromFrequency; // Correct name
   calculatePhotonMomentumFromWavelength = calculatePhotonMomentumFromWavelength; // Correct name
   calculatePhotoelectricEffectKE = calculatePhotoelectricEffectKE; // Correct name
   calculateRydbergTransition = calculateRydbergTransition; // Correct name
}

module.exports = new relativityQuantumController();
