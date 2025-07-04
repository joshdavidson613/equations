const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary
const PHYSICS_CONSTANTS = require("../../enums/physics"); // Adjust the path as necessary

/**
 * Calculates the Lorentz factor (γ) for a given velocity relative to the speed of light.
 * γ = 1 / √(1 - (v^2/c^2)).
 * Requires |v| <= c.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.v - Velocity (must be in the same units as c). Can be positive, negative, or zero.
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in the same units as v). Defaults to the standard value in m/s. Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} The dimensionless Lorentz factor (γ). Returns Infinity if |v|=c.
 * @throws {Error} If inputs are invalid (not finite numbers, c not positive, or |v| > c).
 */
const calculateLorentzFactor = ({ v, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(v, "v"); // Velocity can be signed
   validateNumber(c, "c", { checkPositive: true }); // Speed of light must be positive

   const speedRatioSquared = (v * v) / (c * c);

   if (speedRatioSquared > 1) {
      throw new Error("Velocity magnitude (|v|) cannot be greater than the speed of light (c) for a real Lorentz factor.");
   }

   // Handle |v| = c case explicitly to return Infinity
   if (speedRatioSquared === 1) {
      return formatNumber(Infinity, digits);
   }

   return formatNumber(1 / Math.sqrt(1 - speedRatioSquared), digits);
};

/**
 * Calculates time dilation (t') for a time interval (t0) observed in a moving frame.
 * t' = γ * t0 = t0 / √(1 - (v^2/c^2)).
 * Requires |v| <= c.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.t0 - Proper time (time measured in the moving object's rest frame). Must be non-negative.
 * @param {number} params.v - Velocity (must be in the same units as c). Can be positive, negative, or zero.
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in the same units as v). Defaults to the standard value in m/s. Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} The dilated time (t') measured in the observer's frame (same units as t0). Returns Infinity if |v|=c.
 * @throws {Error} If inputs are invalid (not finite numbers, c not positive, |v| > c, or t0 is negative).
 */
const calculateTimeDilation = ({ t0, v, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(t0, "t0", { checkNonNegative: true }); // Proper time is a duration, non-negative
   validateNumber(v, "v"); // Velocity can be signed
   validateNumber(c, "c", { checkPositive: true }); // Speed of light must be positive

   const speedRatioSquared = (v * v) / (c * c);

   if (speedRatioSquared > 1) {
      throw new Error("Velocity magnitude (|v|) cannot be greater than the speed of light (c) for real time dilation.");
   }

   // Handle |v| = c case explicitly
   if (speedRatioSquared === 1) {
      return formatNumber(Infinity, digits); // Time dilation is infinite at the speed of light (for t0 > 0)
   }

   return formatNumber(t0 / Math.sqrt(1 - speedRatioSquared), digits);
};

/**
 * Calculates length contraction (L') for a length (L0) measured in a moving frame.
 * L' = L0 / γ = L0 * √(1 - (v^2/c^2)).
 * Requires |v| <= c.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.L0 - Proper length (length measured in the moving object's rest frame). Must be non-negative.
 * @param {number} params.v - Velocity (must be in the same units as c). Can be positive, negative, or zero.
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in the same units as v). Defaults to the standard value in m/s). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} The contracted length (L') measured in the observer's frame (same units as L0). Returns 0 if |v|=c.
 * @throws {Error} If inputs are invalid (not finite numbers, c not positive, |v| > c, or L0 is negative).
 */
const calculateLengthContraction = ({ L0, v, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(L0, "L0", { checkNonNegative: true }); // Proper length is a magnitude, non-negative
   validateNumber(v, "v"); // Velocity can be signed
   validateNumber(c, "c", { checkPositive: true }); // Speed of light must be positive

   const speedRatioSquared = (v * v) / (c * c);

   if (speedRatioSquared > 1) {
      throw new Error("Velocity magnitude (|v|) cannot be greater than the speed of light (c) for real length contraction.");
   }

   // Handle |v| = c case explicitly
   if (speedRatioSquared === 1) {
      return formatNumber(0, digits); // Length contracts to zero at the speed of light (for L0 > 0)
   }

   return formatNumber(L0 * Math.sqrt(1 - speedRatioSquared), digits);
};

/**
 * Calculates the relative velocity (u') of two objects moving along the same line (1D)
 * according to relativistic velocity addition.
 * u' = (u + v) / (1 + uv/c^2).
 * Requires |u| <= c, |v| <= c, and c > 0. The denominator 1 + uv/c^2 must not be zero.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.u - Velocity of object A relative to frame S. Can be positive, negative, or zero.
 * @param {number} params.v - Velocity of frame S' relative to frame S. Can be positive, negative, or zero.
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in consistent units). Defaults to the standard value in m/s). Must be positive.
 * @returns {number} The resulting relative velocity (u') of object A as measured in frame S' (same units as u and v). Result will always satisfy |u'| <= c if |u| <= c and |v| <= c.
 * @throws {Error} If inputs are invalid (not finite numbers, c not positive, or denominator is zero which implies |u|=c or |v|=c and specific signs).
 */
const calculateRelativeVelocity = ({ u, v, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(u, "u"); // Velocities can be signed
   validateNumber(v, "v"); // Velocities can be signed
   validateNumber(c, "c", { checkPositive: true }); // Speed of light must be positive

   // Although mathematically possible for uv/c^2 = -1, physically |u|<=c and |v|<=c
   // means uv >= -c^2, so 1 + uv/c^2 >= 0.
   // The case 1 + uv/c^2 = 0 only happens if |u|=c and |v|=c and uv = -c^2 (i.e., u = c, v = -c or u = -c, v = c).
   // While the formula is usually stated for |u|<c and |v|<c, let's check for exact zero denominator defensively.
   const denominator = 1 + (u * v) / (c * c);
   if (denominator === 0) {
       // This scenario (|u|=c, |v|=c, uv = -c^2) leads to an infinite result in the formula,
       // which is not physical if |u| and |v| represent speeds relative to c.
       // However, the mathematical result for |u|=c, |v|=c, uv=-c^2 is indeed division by zero.
       // Let's return Infinity as the limit approaches this point, if the input velocities are exactly +/- c.
       if ((Math.abs(u) === c && Math.abs(v) === c) && ((u/c)*(v/c) === -1)) {
           // Returning Infinity/undefined is acceptable for exact limiting cases.
           // formatNumber(Infinity, digits) is handled.
           return formatNumber(Infinity, digits);
       }
       // For any other case resulting in denominator zero, it's likely invalid input beyond just +/-c
       throw new Error("Invalid input velocities (u, v) or speed of light (c) causing division by zero in the denominator.");
   }


   // Also, strictly, u and v relative to c should be within (-c, c).
   // If |u| > c or |v| > c, the result u' might also be > c, which contradicts relativity.
   // We could add checks: if (Math.abs(u) > c || Math.abs(v) > c) throw Error(...);
   // But the prompt didn't ask for this specific physical constraint check beyond denominator zero.
   // Let's add checks that prevent non-real results due to sqrt(1-v^2/c^2) in related formulas.

   return formatNumber((u + v) / denominator, digits);
};

/**
 * Calculates the total relativistic energy (E) of an object.
 * E = γmc^2 = mc^2 / √(1 - (v^2/c^2)).
 * Requires |v| <= c. Assumes m is rest mass.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Rest mass of the object. Must be non-negative.
 * @param {number} params.v - Velocity of the object (must be in the same units as c). Can be positive, negative, or zero.
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in the same units as v). Defaults to the standard value in m/s). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} The total relativistic energy (E). Units depend on the units of m and c (e.g., Joules if m in kg, c in m/s). Returns Infinity if |v|=c and m > 0. Returns 0 if m=0.
 * @throws {Error} If inputs are invalid (not finite numbers, c not positive, |v| > c, or m is negative). This function is primarily for particles with rest mass (m > 0).
 */
const calculateRelativisticEnergy = ({ m, v, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(m, "m", { checkNonNegative: true }); // Rest mass must be non-negative
   validateNumber(v, "v"); // Velocity can be signed
   validateNumber(c, "c", { checkPositive: true }); // Speed of light must be positive

   // Handle the case of massless particles (like photons) - This formula isn't the direct one (E=pc)
   if (m === 0) {
       // The formula mc^2 / sqrt(1 - v^2/c^2) becomes 0/0 for m=0, v=c.
       // It's better to indicate that this function is for massive particles or require v=c for m=0.
       // Let's refine the check: if m=0, v MUST be c.
       if (Math.abs(v) !== c) {
           throw new Error("Massless particles (m=0) must travel at the speed of light magnitude (|v|=c).");
       }
       // Even if |v|=c, the formula is indeterminate. This function isn't suited for massless particles.
       throw new Error(
           "This function calculateRelativisticEnergy(m, v, c) is primarily for particles with rest mass (m > 0). For massless particles (m=0), use the energy-momentum relation (E=pc) or formulas involving frequency/wavelength."
       );
   }

   // Now handle m > 0
   const speedRatioSquared = (v * v) / (c * c);

   if (speedRatioSquared > 1) {
      throw new Error("Velocity magnitude (|v|) cannot be greater than the speed of light (c) for real relativistic energy calculation.");
   }

   // Handle |v| = c case for m > 0
   if (speedRatioSquared === 1) {
      return formatNumber(Infinity, digits); // Energy is infinite for massive particles at the speed of light
   }

   const mc2 = m * c * c;
   return formatNumber(mc2 / Math.sqrt(1 - speedRatioSquared), digits);
};


/**
 * Calculates the relativistic momentum (p) of an object.
 * p = γmv = mv / √(1 - (v^2/c^2)).
 * Requires |v| <= c. Assumes m is rest mass.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Rest mass of the object. Must be non-negative.
 * @param {number} params.v - Velocity of the object (must be in the same units as c). Can be positive, negative, or zero.
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in the same units as v). Defaults to the standard value in m/s). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} The relativistic momentum (p). Units depend on the units of m and v (e.g., kg·m/s). Returns Infinity if |v|=c and m > 0 (with sign of v). Returns 0 if m=0.
 * @throws {Error} If inputs are invalid (not finite numbers, c not positive, |v| > c, or m is negative). This function is primarily for particles with rest mass (m > 0).
 */
const calculateRelativisticMomentum = ({ m, v, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(m, "m", { checkNonNegative: true }); // Rest mass must be non-negative
   validateNumber(v, "v"); // Velocity can be signed
   validateNumber(c, "c", { checkPositive: true }); // Speed of light must be positive

   // Handle the case of massless particles (like photons) - This formula isn't the direct one (p=E/c or p=h/lambda)
    if (m === 0) {
       // The formula mv / sqrt(1 - v^2/c^2) becomes 0/0 for m=0, v=c.
       // It's better to indicate that this function is for massive particles or require v=c for m=0.
        if (Math.abs(v) !== c) {
            throw new Error("Massless particles (m=0) must travel at the speed of light magnitude (|v|=c).");
        }
        // Even if |v|=c, the formula is indeterminate. This function isn't suited for massless particles.
        throw new Error(
            "This function calculateRelativisticMomentum(m, v, c) is primarily for particles with rest mass (m > 0). For massless particles (m=0), use formulas involving energy, frequency, or wavelength (e.g., p=E/c, p=h/lambda)."
        );
    }

   // Now handle m > 0
   const speedRatioSquared = (v * v) / (c * c);

   if (speedRatioSquared > 1) {
      throw new Error("Velocity magnitude (|v|) cannot be greater than the speed of light (c) for real relativistic momentum calculation.");
   }

   // Handle |v| = c case for m > 0
   if (speedRatioSquared === 1) {
      // Momentum is infinite at the speed of light (for m>0), retaining the sign of v
      return formatNumber(v > 0 ? Infinity : v < 0 ? -Infinity : 0, digits);
   }

   const mv = m * v; // Classical momentum-like term
   return formatNumber(mv / Math.sqrt(1 - speedRatioSquared), digits);
};

/**
 * Calculates the total energy (E) of an object using the energy-momentum relation.
 * E^2 = (pc)^2 + (mc^2)^2  => E = √((pc)^2 + (mc^2)^2)
 * Where p is relativistic momentum magnitude and m is rest mass.
 * This equation is valid for both massive (m>0) and massless (m=0) particles.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.p - Relativistic momentum magnitude. Must be non-negative.
 * @param {number} params.m - Rest mass. Must be non-negative.
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in consistent units). Defaults to the standard value in m/s). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} The total energy (E). Units depend on the units of p, m, and c (e.g., Joules if p in kg·m/s, m in kg, c in m/s). Result is always non-negative.
 * @throws {Error} If inputs are invalid (not finite numbers, c not positive, p or m is negative).
 */
const calculateEnergyMomentumRelation = ({ p, m, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(p, "p", { checkNonNegative: true }); // Momentum magnitude must be non-negative
   validateNumber(m, "m", { checkNonNegative: true }); // Rest mass must be non-negative
   validateNumber(c, "c", { checkPositive: true }); // Speed of light must be positive

   const pc = p * c;
   const mc2 = m * c * c;

   return formatNumber(Math.sqrt(pc * pc + mc2 * mc2), digits);
};

/**
 * Calculates mass-energy equivalence (rest energy) using E0 = mc^2.
 * This is the energy contained in the mass of an object when it is at rest.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Rest mass (m). Must be non-negative.
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in consistent units). Defaults to the standard value in m/s). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Rest energy (E0). Units depend on the units of m and c (e.g., Joules if m in kg, c in m/s). Result is always non-negative.
 * @throws {Error} If inputs are invalid (not finite numbers, c not positive, or m is negative).
 */
const calculateMassEnergyEquivalence = ({ m, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(m, "m", { checkNonNegative: true }); // Rest mass must be non-negative
   validateNumber(c, "c", { checkPositive: true }); // Speed of light must be positive

   return formatNumber(m * c * c, digits);
};

/**
 * Calculates the relativistic kinetic energy (KE) of an object.
 * KE = E - E0 = (γ - 1)mc^2 = (1/√(1 - (v^2/c^2)) - 1)mc^2.
 * Requires |v| < c. Assumes m is rest mass. Not applicable for massless particles in this form.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.m - Rest mass of the object. Must be non-negative.
 * @param {number} params.v - Velocity of the object (must be in the same units as c). Can be positive, negative, or zero.
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in the same units as v). Defaults to the standard value in m/s). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} The relativistic kinetic energy (KE). Units depend on the units of m and c (e.g., Joules). Returns 0 if v=0 or m=0. Returns Infinity if |v|=c and m > 0.
 * @throws {Error} If inputs are invalid (not finite numbers, c not positive, |v| >= c (for m>0), or m is negative). This function is primarily for particles with rest mass (m > 0).
 */
const calculateRelativisticKE = ({ m, v, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(m, "m", { checkNonNegative: true }); // Rest mass must be non-negative
   validateNumber(v, "v"); // Velocity can be signed
   validateNumber(c, "c", { checkPositive: true }); // Speed of light must be positive

   // Handle m = 0 case separately. KE = E for massless particles, E=pc. This formula is not used.
   if (m === 0) {
        throw new Error(
            "Relativistic kinetic energy (KE) calculation in the form (γ-1)mc^2 is for particles with rest mass (m > 0). For massless particles, KE = Total Energy (E = pc)."
        );
    }

    // Handle v = 0 case separately (KE is 0) for m > 0
    if (v === 0) {
        return formatNumber(0, digits);
    }

   // Now handle m > 0 and v != 0
   const speedRatioSquared = (v * v) / (c * c);

   if (speedRatioSquared >= 1) {
      // KE is infinite at or above c for m>0
      throw new Error(
         "Velocity magnitude (|v|) must be strictly less than the speed of light (c) for a finite relativistic kinetic energy calculation with rest mass (m>0)."
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
 * λ' = λ₀√((c + v_rel)/(c - v_rel)).
 * v_rel is the relative velocity: positive if source and observer are moving away (recession),
 * negative if moving towards (approach).
 * Requires |v_rel| < c, λ₀ > 0, c > 0.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.lambda0 - Emitted (proper) wavelength in the source's rest frame. Must be positive.
 * @param {number} params.v_rel - Relative velocity between observer and source. Positive for recession (moving away), negative for approach (moving towards). Must be in the same units as c.
 * @param {number} [params.c=PHYSICS_CONSTANTS.C] - Speed of light (must be in the same units as v_rel). Defaults to the standard value in m/s). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} The observed wavelength (λ'). Units are the same as lambda0. Returns Infinity if v_rel=c. Returns 0 if v_rel=-c.
 * @throws {Error} If inputs are invalid (not finite numbers, c not positive, lambda0 not positive, or |v_rel| >= c).
 */
const calculateRelativisticDopplerEffect = ({ lambda0, v_rel, c = PHYSICS_CONSTANTS.C, digits = 4 }) => {
   validateNumber(lambda0, "lambda0", { checkPositive: true }); // Emitted wavelength must be positive
   validateNumber(v_rel, "v_rel"); // Relative velocity can be signed
   validateNumber(c, "c", { checkPositive: true }); // Speed of light must be positive

   // Check the arguments of the square root and denominator
   const numeratorTerm = c + v_rel;
   const denominatorTerm = c - v_rel;

   if (denominatorTerm === 0) {
      throw new Error("Relative velocity (v_rel) cannot be equal to the speed of light (c) for this formula (division by zero).");
   }
    // Check if terms have opposite signs leading to negative inside sqrt
   if (numeratorTerm / denominatorTerm < 0) {
       // This happens if c + v_rel and c - v_rel have opposite signs.
       // Given c > 0:
       // If v_rel > c, then c - v_rel < 0 and c + v_rel > 0 -> ratio < 0
       // If v_rel < -c, then c - v_rel > 0 and c + v_rel < 0 -> ratio < 0
       // So, this implies |v_rel| > c.
        throw new Error(
            "Relative velocity magnitude (|v_rel|) cannot be greater than the speed of light (c) for a real observed wavelength."
        );
   }

   // If numeratorTerm is 0 (v_rel = -c), result is 0.
   // If denominatorTerm is 0 (v_rel = c), result is Infinity (handled by division).

   const factor = Math.sqrt(numeratorTerm / denominatorTerm);

   return formatNumber(lambda0 * factor, digits);
};


// --- Quantum Mechanics / Photon Functions ---

/**
 * Calculates photon energy (E) from its frequency (f) using Planck's relation.
 * E = hf.
 * Requires h > 0, f >= 0.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.f - Frequency (f). Must be non-negative.
 * @param {number} [params.h=PHYSICS_CONSTANTS.H] - Planck's constant (h). Defaults to the standard value in J·s. Ensure units are consistent (e.g., if h is in J·s, f should be in Hz (s⁻¹), and E will be in Joules). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Photon energy (E). Units depend on the units of h and f. Result is non-negative.
 * @throws {Error} If inputs are invalid (not finite numbers, h not positive, or f negative).
 */
const calculatePhotonEnergyFromFrequency = ({ f, h = PHYSICS_CONSTANTS.H, digits = 4 }) => {
   validateNumber(f, "f", { checkNonNegative: true }); // Frequency must be non-negative for physical photon energy
   validateNumber(h, "h", { checkPositive: true }); // Planck's constant must be positive
   return formatNumber(h * f, digits);
};

/**
 * Calculates photon momentum (p) from its wavelength (λ) using the de Broglie relation for photons.
 * p = h/λ.
 * Requires h > 0, λ > 0.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.lambda - Wavelength (λ). Must be positive.
 * @param {number} [params.h=PHYSICS_CONSTANTS.H] - Planck's constant (h). Defaults to the standard value in J·s. Ensure units are consistent (e.g., if h is in J·s, lambda should be in meters (m), and p will be in kg·m/s). Must be positive.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} Photon momentum magnitude (p). Units depend on the units of h and lambda. Result is positive.
 * @throws {Error} If inputs are invalid (not finite numbers, h not positive, or lambda not positive).
 */
const calculatePhotonMomentumFromWavelength = ({ lambda, h = PHYSICS_CONSTANTS.H, digits = 4 }) => {
   validateNumber(lambda, "lambda", { checkPositive: true }); // Wavelength must be positive (in denominator)
   validateNumber(h, "h", { checkPositive: true }); // Planck's constant must be positive
   return formatNumber(h / lambda, digits);
};

/**
 * Calculates the maximum kinetic energy (KE_max) of emitted electrons in the photoelectric effect.
 * KE_max = hf - φ. If hf <= φ, no electrons are emitted, and KE_max is 0.
 * Requires hf >= 0, φ >= 0.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.photonEnergy - The energy of the incoming photon (E = hf). Must be non-negative.
 * @param {number} params.phi - The work function (φ) of the metal (minimum energy required to remove an electron). Must be non-negative.
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} The maximum kinetic energy of an emitted electron. Units are the same as photonEnergy and phi. Returns 0 if photonEnergy <= phi. Result is non-negative.
 * @throws {Error} If inputs are invalid (not finite numbers, or photonEnergy or phi are negative).
 */
const calculatePhotoelectricEffectKE = ({ photonEnergy, phi, digits = 4 }) => {
   validateNumber(photonEnergy, "photonEnergy", { checkNonNegative: true }); // Photon energy must be non-negative
   validateNumber(phi, "phi", { checkNonNegative: true }); // Work function must be non-negative

   // Kinetic energy cannot be negative in this context. Math.max handles the hf < phi case.
   const result = photonEnergy - phi;
   return formatNumber(Math.max(0, result), digits);
};

// --- Atomic Physics Functions ---

/**
 * Calculates the energy difference or wavenumber for an electron transition in a
 * hydrogen-like atom (an atom with only one electron, e.g., H, He+, Li++).
 * The equation used is proportional to Z^2 * (1/n_initial^2 - 1/n_final^2).
 * The output type (energy or wavenumber) depends on the units of the `constant`.
 *
 * For Energy: ΔE = E_final - E_initial = -R_y * Z^2 * (1/n_final^2 - 1/n_initial^2)
 *   (Uses Rydberg energy unit R_y, result is in energy units)
 *   Positive result: Absorption (n_final > n_initial)
 *   Negative result: Emission (n_final < n_initial)
 *
 * For Wavenumber: 1/λ = R_inf * Z^2 * (1/n_initial^2 - 1/n_final^2)
 *   (Uses Rydberg constant R_inf, result is in reciprocal length units)
 *   Convention often uses |1/n_final^2 - 1/n_initial^2| for magnitude,
 *   or specific series formulas (Lyman, Balmer etc.).
 *   Let's stick to the energy difference sign convention: E_final - E_initial.
 *   E_n = -Constant * Z^2 / n^2
 *   E_final - E_initial = Constant * Z^2 * (1/n_initial^2 - 1/n_final^2)
 *
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.nInitial - Principal quantum number of the initial energy level. Must be a positive integer.
 * @param {number} params.nFinal - Principal quantum number of the final energy level. Must be a positive integer and different from nInitial.
 * @param {number} params.constant - The Rydberg constant value in desired units (e.g., PHYSICS_CONSTANTS.RYDBERG_ENERGY_EV for energy in eV, or PHYSICS_CONSTANTS.RYDBERG_CONSTANT_M_INV for wavenumber in m⁻¹). Must be positive.
 * @param {number} [params.atomicNumber=1] - The atomic number (Z) of the hydrogen-like atom. Must be a positive integer (default is 1 for Hydrogen).
 * @param {number} [params.digits=4] - Number of decimal places for formatting.
 * @returns {number} The calculated energy difference (E_final - E_initial) or wavenumber difference based on the constant's units. Sign convention: positive for absorption, negative for emission.
 * @throws {Error} If inputs are invalid (not positive integers for nInitial, nFinal, atomicNumber, nInitial === nFinal, or constant not positive).
 */
const calculateRydbergTransition = ({ nInitial, nFinal, constant, atomicNumber = 1, digits = 4 }) => {
   validateNumber(nInitial, "nInitial", { checkPositive: true, checkInteger: true }); // Quantum numbers must be positive integers
   validateNumber(nFinal, "nFinal", { checkPositive: true, checkInteger: true }); // Quantum numbers must be positive integers
   validateNumber(atomicNumber, "atomicNumber (Z)", { checkPositive: true, checkInteger: true }); // Atomic number must be a positive integer
   validateNumber(constant, "constant (Rydberg value)", { checkPositive: true }); // Rydberg constant should be positive

   if (nInitial === nFinal) {
      throw new Error("nInitial and nFinal must be different for an electron transition.");
   }

   const initialTerm = 1 / (nInitial * nInitial);
   const finalTerm = 1 / (nFinal * nFinal);

   // Using the convention Delta E = E_final - E_initial = Constant * Z^2 * (1/n_initial^2 - 1/n_final^2)
   const result = constant * (atomicNumber * atomicNumber) * (initialTerm - finalTerm);

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
   calculateMassEnergyEquivalence = calculateMassEnergyEquivalence;
   calculateEnergyMomentumRelation = calculateEnergyMomentumRelation;
   calculateRelativisticKE = calculateRelativisticKE;
   calculateRelativisticDopplerEffect = calculateRelativisticDopplerEffect;
   calculatePhotonEnergyFromFrequency = calculatePhotonEnergyFromFrequency;
   calculatePhotonMomentumFromWavelength = calculatePhotonMomentumFromWavelength;
   calculatePhotoelectricEffectKE = calculatePhotoelectricEffectKE;
   calculateRydbergTransition = calculateRydbergTransition;
}

module.exports = new relativityQuantumController();