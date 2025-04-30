const express = require("express");
const relativityQuantumRouter = express.Router();
const relativityQuantumController = require("../../controllers/physics/relativity-quantum"); // Adjust the path as necessary
const { handleCalculationRequest } = require("../../utils/calcUtils"); // Adjust the path as necessary

/**
 * @swagger
 * /physics/lorentz-factor:
 *   post:
 *     summary: Calculates the Lorentz factor (γ)
 *     description: Calculates the Lorentz factor using γ = 1/√(1 - (v²/c²)). Requires v < c.
 *     tags:
 *       - Physics - Relativity and Quantum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               v:
 *                 type: number
 *                 description: Velocity (v). Must be a finite number.
 *               c:
 *                 type: number
 *                 description: Speed of light in vacuum (c). Must be a positive finite number.
 *                 exclusiveMinimum: 0
 *               digits:
 *                 type: integer
 *                 description: Number of decimal places to round the result to (optional, default is 4). Value must be 0-16.
 *                 minimum: 0
 *                 maximum: 16
 *                 default: 4
 *             required:
 *               - v
 *               - c
 *     responses:
 *       200:
 *         description: Successful calculation of Lorentz factor. Returns Infinity if v=c.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Lorentz factor (γ). Dimensionless.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, c is not positive, |v| > c).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure (e.g., "Velocity (v) cannot be greater than the speed of light (c).").
 */
relativityQuantumRouter.post(
   "/lorentz-factor",
   handleCalculationRequest(relativityQuantumController.calculateLorentzFactor)
);

/**
 * @swagger
 * /physics/time-dilation:
 *   post:
 *     summary: Calculates time dilation (t' = γ * t₀)
 *     description: Calculates the time elapsed (t') for an observer in an inertial frame S, given the proper time (t₀) measured in a moving frame S' and the relative velocity (v) between S and S'. Uses t' = t₀ / √(1 - (v²/c²)). Requires t₀ ≥ 0 and |v| ≤ c. Units of t' will be the same as t₀, units of v and c must be consistent.
 *     tags:
 *       - Physics - Relativity and Quantum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               t0:
 *                 type: number
 *                 description: Proper time (t₀) measured in the moving frame. Must be a non-negative finite number.
 *                 minimum: 0
 *               v:
 *                 type: number
 *                 description: Relative velocity (v) between the observer's frame and the moving frame. Must be a finite number.
 *               c:
 *                 type: number
 *                 description: Speed of light in vacuum (c). Must be a positive finite number.
 *                 exclusiveMinimum: 0
 *               digits:
 *                 type: integer
 *                 description: Number of decimal places to round the result to (optional, default is 4). Value must be 0-16.
 *                 minimum: 0
 *                 maximum: 16
 *                 default: 4
 *             required:
 *               - t0
 *               - v
 *               - c
 *     responses:
 *       200:
 *         description: Successful calculation of dilated time. Returns Infinity if v=c (and t0 > 0), or 0 if t0=0.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Dilated time (t') measured in the observer's frame. Same units as t₀.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, t0 is negative, c is not positive, |v| > c).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 */
relativityQuantumRouter.post(
   "/time-dilation",
   handleCalculationRequest(relativityQuantumController.calculateTimeDilation)
);

/**
 * @swagger
 * /physics/length-contraction:
 *   post:
 *     summary: Calculates length contraction (L' = L₀ / γ)
 *     description: Calculates the length (L') of an object observed from a moving frame S', given its proper length (L₀) measured in its rest frame S and the relative velocity (v) between S and S'. Uses L' = L₀ * √(1 - (v²/c²)). Requires L₀ ≥ 0 and |v| ≤ c. Units of L' will be the same as L₀, units of v and c must be consistent.
 *     tags:
 *       - Physics - Relativity and Quantum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               L0:
 *                 type: number
 *                 description: Proper length (L₀) measured in the rest frame. Must be a non-negative finite number.
 *                 minimum: 0
 *               v:
 *                 type: number
 *                 description: Relative velocity (v) between the observer's frame and the object's rest frame. Must be a finite number.
 *               c:
 *                 type: number
 *                 description: Speed of light in vacuum (c). Must be a positive finite number.
 *                 exclusiveMinimum: 0
 *               digits:
 *                 type: integer
 *                 description: Number of decimal places to round the result to (optional, default is 4). Value must be 0-16.
 *                 minimum: 0
 *                 maximum: 16
 *                 default: 4
 *             required:
 *               - L0
 *               - v
 *               - c
 *     responses:
 *       200:
 *         description: Successful calculation of contracted length. Returns 0 if |v|=c (and L0 > 0), or 0 if L0=0.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Contracted length (L') measured in the observer's frame. Same units as L₀.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, L0 is negative, c is not positive, |v| > c).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 */
relativityQuantumRouter.post(
   "/length-contraction",
   handleCalculationRequest(relativityQuantumController.calculateLengthContraction)
);

/**
 * @swagger
 * /physics/relativistic-velocity:
 *   post:
 *     summary: Calculates relativistic velocity addition
 *     description: Calculates the velocity (u') of an object relative to a frame S', given its velocity (u) relative to a frame S, and the velocity (v) of frame S relative to frame S'. Uses the formula u' = (u + v) / (1 + uv/c²). Assumes motion along the same line. Requires c ≠ 0. Units of u, v, and c must be consistent.
 *     tags:
 *       - Physics - Relativity and Quantum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               u:
 *                 type: number
 *                 description: Velocity of the object relative to frame S (u). Must be a finite number.
 *               v:
 *                 type: number
 *                 description: Velocity of frame S relative to frame S' (v). Must be a finite number.
 *               c:
 *                 type: number
 *                 description: Speed of light (c). Must be a non-zero finite number.
 *                 not:
 *                   const: 0
 *               digits:
 *                 type: integer
 *                 description: Number of decimal places to round the result to (optional, default is 4). Value must be 0-16.
 *                 minimum: 0
 *                 maximum: 16
 *                 default: 4
 *             required:
 *               - u
 *               - v
 *               - c
 *     responses:
 *       200:
 *         description: Successful calculation of the relativistic relative velocity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Velocity of the object relative to frame S' (u'). Same units as u and v.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, c is zero, input velocities cause denominator to be zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 */
relativityQuantumRouter.post(
   "/relativistic-velocity",
   handleCalculationRequest(relativityQuantumController.calculateRelativeVelocity)
);

/**
 * @swagger
 * /physics/relativistic-energy:
 *   post:
 *     summary: Calculates relativistic total energy (E)
 *     description: Calculates the total relativistic energy of a particle with rest mass (m) moving at velocity (v).
 *       Uses the formula E = γmc² = mc² / √(1 - (v²/c²)). Primarily for particles with rest mass (m > 0).
 *       Requires m ≥ 0 and |v| ≤ c. Units of m, v, and c must be consistent to yield energy in appropriate units (e.g., m in kg, v/c in m/s gives E in Joules).
 *     tags:
 *       - Physics - Relativity and Quantum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               m:
 *                 type: number
 *                 description: Rest mass (m) of the particle. Must be a non-negative finite number.
 *                 minimum: 0
 *               v:
 *                 type: number
 *                 description: Velocity (v) of the particle. Must be a finite number.
 *               c:
 *                 type: number
 *                 description: Speed of light in vacuum (c). Must be a positive finite number.
 *                 exclusiveMinimum: 0
 *               digits:
 *                 type: integer
 *                 description: Number of decimal places to round the result to (optional, default is 4). Value must be 0-16.
 *                 minimum: 0
 *                 maximum: 16
 *                 default: 4
 *             required:
 *               - m
 *               - v
 *               - c
 *     responses:
 *       200:
 *         description: Successful calculation of relativistic total energy. Returns Infinity if m > 0 and |v|=c, or 0 if m=0 and v=0 (though m=0, v=c is required for massless particles).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Relativistic total energy (E).
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, m is negative, c is not positive, |v| > c, or attempting to calculate for massless particle with |v| ≠ c).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 */
relativityQuantumRouter.post(
   "/relativistic-energy",
   handleCalculationRequest(relativityQuantumController.calculateRelativisticEnergy)
);

/**
 * @swagger
 * /physics/relativistic-momentum:
 *   post:
 *     summary: Calculates relativistic momentum (p = γmv)
 *     description: Calculates the relativistic momentum of a particle with rest mass (m) moving at velocity (v). Uses the formula p = γmv = mv / √(1 - (v²/c²)). Primarily for particles with rest mass (m > 0). Requires m ≥ 0 and |v| ≤ c. Units of m, v, and c must be consistent to yield momentum in appropriate units (e.g., m in kg, v in m/s, c in m/s gives p in kg·m/s).
 *     tags:
 *       - Physics - Relativity and Quantum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               m:
 *                 type: number
 *                 description: Rest mass (m) of the particle. Must be a non-negative finite number.
 *                 minimum: 0
 *               v:
 *                 type: number
 *                 description: Velocity (v) of the particle. Must be a finite number.
 *               c:
 *                 type: number
 *                 description: Speed of light in vacuum (c). Must be a positive finite number.
 *                 exclusiveMinimum: 0
 *               digits:
 *                 type: integer
 *                 description: Number of decimal places to round the result to (optional, default is 4). Value must be 0-16.
 *                 minimum: 0
 *                 maximum: 16
 *                 default: 4
 *             required:
 *               - m
 *               - v
 *               - c
 *     responses:
 *       200:
 *         description: Successful calculation of relativistic momentum. Returns ±Infinity if m > 0 and |v|=c (sign matches v), or 0 if m=0.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Relativistic momentum (p).
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, m is negative, c is not positive, |v| > c, or attempting to calculate for massless particle with |v| ≠ c).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 */
relativityQuantumRouter.post(
   "/relativistic-momentum",
   handleCalculationRequest(relativityQuantumController.calculateRelativisticMomentum)
);

/**
 * @swagger
 * /physics/energy-momentum-relation:
 *   post:
 *     summary: Calculates total energy from momentum and rest mass (E)
 *     description:  | 
 *       Calculates the total relativistic energy of a particle from its relativistic momentum (p) and rest mass (m). Uses the energy-momentum relation: E² = (pc)² + (mc²)². This formula is valid for both massive (m > 0) and massless (m = 0) particles. Requires p ≥ 0, m ≥ 0, and c > 0. Units of p, m, and c must be consistent.
 *     tags:
 *       - Physics - Relativity and Quantum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               p:
 *                 type: number
 *                 description: Relativistic momentum (p). Usually the magnitude, must be a non-negative finite number.
 *                 minimum: 0
 *               m:
 *                 type: number
 *                 description: Rest mass (m). Must be a non-negative finite number.
 *                 minimum: 0
 *               c:
 *                 type: number
 *                 description: Speed of light in vacuum (c). Must be a positive finite number.
 *                 exclusiveMinimum: 0
 *               digits:
 *                 type: integer
 *                 description: Number of decimal places to round the result to (optional, default is 4). Value must be 0-16.
 *                 minimum: 0
 *                 maximum: 16
 *                 default: 4
 *             required:
 *               - p
 *               - m
 *               - c
 *     responses:
 *       200:
 *         description: Successful calculation of total energy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Total energy (E). Units depend on input units.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, p or m is negative, c is not positive).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 */
relativityQuantumRouter.post(
   "/energy-momentum", // Keep the original path as per Swagger
   handleCalculationRequest(relativityQuantumController.calculateEnergyMomentumRelation)
);

/**
 * @swagger
 * /physics/mass-energy-equivalence:
 *   post:
 *     summary: Calculates mass-energy equivalence (E₀ = mc²)
 *     description: Calculates the rest energy (E₀) equivalent of a given rest mass (m) using Einstein's famous equation E₀ = mc². Requires m ≥ 0 and c > 0. Units of m and c must be consistent (e.g., m in kg, c in m/s gives E₀ in Joules). This endpoint uses a standard value for c (approx 299792458 m/s) unless 'c' is explicitly provided.
 *     tags:
 *       - Physics - Relativity and Quantum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               m:
 *                 type: number
 *                 description: Rest mass (m). Must be a non-negative finite number.
 *                 minimum: 0
 *               c:
 *                 type: number
 *                 description: Optional speed of light in vacuum (c). If not provided, a standard value is used. Must be a positive finite number if provided.
 *                 exclusiveMinimum: 0
 *               digits:
 *                 type: integer
 *                 description: Number of decimal places to round the result to (optional, default is 4). Value must be 0-16.
 *                 minimum: 0
 *                 maximum: 16
 *                 default: 4
 *             required:
 *               - m
 *     responses:
 *       200:
 *         description: Successful calculation of rest energy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Rest energy (E₀). Units depend on input units or the standard c value used.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, m is negative, provided c is not positive).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 */
relativityQuantumRouter.post(
   "/mass-energy", // Keep the original path as per Swagger
   handleCalculationRequest(relativityQuantumController.calculateMassEnergyEquivalence)
);

/**
 * @swagger
 * /physics/relativistic-kinetic-energy:
 *   post:
 *     summary: Calculates relativistic kinetic energy (KE)
 *     description: Calculates the relativistic kinetic energy of a particle with rest mass (m) moving at velocity (v). Uses the formula KE = (γ - 1)mc² = (1/√(1 - (v²/c²)) - 1)mc². Primarily for particles with rest mass (m > 0). Requires m ≥ 0 and |v| < c. Units of m, v, and c must be consistent to yield energy in appropriate units.
 *     tags:
 *       - Physics - Relativity and Quantum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               m:
 *                 type: number
 *                 description: Rest mass (m) of the particle. Must be a non-negative finite number.
 *                 minimum: 0
 *               v:
 *                 type: number
 *                 description: Velocity (v) of the particle. Must be a finite number.
 *               c:
 *                 type: number
 *                 description: Speed of light in vacuum (c). Must be a positive finite number.
 *                 exclusiveMinimum: 0
 *               digits:
 *                 type: integer
 *                 description: Number of decimal places to round the result to (optional, default is 4). Value must be 0-16.
 *                 minimum: 0
 *                 maximum: 16
 *                 default: 4
 *             required:
 *               - m
 *               - v
 *               - c
 *     responses:
 *       200:
 *         description: Successful calculation of relativistic kinetic energy. Returns 0 if v=0 or m=0.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Relativistic kinetic energy (KE).
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, m is negative, c is not positive, |v| ≥ c, or attempting to calculate for massless particle).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 */
relativityQuantumRouter.post(
   "/relativistic-ke", // Keep the original path as per Swagger
   handleCalculationRequest(relativityQuantumController.calculateRelativisticKE)
);

/**
 * @swagger
 * /physics/relativistic-doppler-effect:
 *   post:
 *     summary: Calculates relativistic longitudinal Doppler effect for wavelength
 *     description: Calculates the observed wavelength (λ') of light emitted with proper wavelength (λ₀) from a source moving with relative velocity (v_rel) directly away from or towards the observer. Uses the formula λ' = λ₀√((1 + β)/(1 - β)), where β = v_rel/c. v_rel > 0 for recession (redshift), v_rel < 0 for approach (blueshift). Requires λ₀ > 0 and |v_rel| < c. Units of λ' will be the same as λ₀, units of v_rel and c must be consistent.
 *     tags:
 *       - Physics - Relativity and Quantum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lambda0:
 *                 type: number
 *                 description: Emitted (proper) wavelength (λ₀) in the source's rest frame. Must be a positive finite number.
 *                 exclusiveMinimum: 0
 *               v_rel:
 *                 type: number
 *                 description: Relative velocity (v_rel) between observer and source. Positive for recession, negative for approach. Must be a finite number.
 *               c:
 *                 type: number
 *                 description: Speed of light in vacuum (c). Must be a positive finite number.
 *                 exclusiveMinimum: 0
 *               digits:
 *                 type: integer
 *                 description: Number of decimal places to round the result to (optional, default is 4). Value must be 0-16.
 *                 minimum: 0
 *                 maximum: 16
 *                 default: 4
 *             required:
 *               - lambda0
 *               - v_rel
 *               - c
 *     responses:
 *       200:
 *         description: Successful calculation of observed wavelength. Returns Infinity if v_rel=c, 0 if v_rel=-c (assuming lambda0 > 0).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Observed wavelength (λ'). Same units as λ₀.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, lambda0 is not positive, c is not positive, |v_rel| ≥ c).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 */
relativityQuantumRouter.post(
   "/relativistic-doppler-effect",
   handleCalculationRequest(relativityQuantumController.calculateRelativisticDopplerEffect)
);

/**
 * @swagger
 * /physics/photon-energy-from-frequency:
 *   post:
 *     summary: Calculates photon energy from frequency (E = hf)
 *     description: Calculates the energy (E) of a photon based on its frequency (f). Uses Planck's relation E = hf. Requires f ≥ 0 and h > 0. Units of h and f must be consistent to yield energy in appropriate units (e.g., h in J·s, f in Hz (s⁻¹) gives E in Joules). This endpoint uses a standard value for h (approx 6.626e-34 J·s) unless 'h' is explicitly provided.
 *     tags:
 *       - Physics - Relativity and Quantum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               f:
 *                 type: number
 *                 description: Frequency (f). Must be a non-negative finite number.
 *                 minimum: 0
 *               h:
 *                 type: number
 *                 description: Optional Planck's constant (h). If not provided, a standard value is used. Must be a positive finite number if provided.
 *                 exclusiveMinimum: 0
 *               digits:
 *                 type: integer
 *                 description: Number of decimal places to round the result to (optional, default is 4). Value must be 0-16.
 *                 minimum: 0
 *                 maximum: 16
 *                 default: 4
 *             required:
 *               - f
 *     responses:
 *       200:
 *         description: Successful calculation of photon energy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Photon energy (E). Units depend on input units or the standard h value used.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, f is negative, provided h is not positive).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 */
// Changed controller method reference and Swagger endpoint path/description
relativityQuantumRouter.post(
   "/photon-energy-from-frequency",
   handleCalculationRequest(relativityQuantumController.calculatePhotonEnergyFromFrequency)
);

/**
 * @swagger
 * /physics/photon-momentum-from-wavelength:
 *   post:
 *     summary: Calculates photon momentum from wavelength (p = h/λ)
 *     description: Calculates the momentum (p) of a photon based on its wavelength (λ). Uses the relation p = h/λ. Requires λ > 0 and h > 0. Units of h and λ must be consistent to yield momentum in appropriate units (e.g., h in J·s, λ in meters gives p in kg·m/s). This endpoint uses a standard value for h (approx 6.626e-34 J·s) unless 'h' is explicitly provided.
 *     tags:
 *       - Physics - Relativity and Quantum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lambda:
 *                 type: number
 *                 description: Wavelength (λ). Must be a positive finite number.
 *                 exclusiveMinimum: 0
 *               h:
 *                 type: number
 *                 description: Optional Planck's constant (h). If not provided, a standard value is used. Must be a positive finite number if provided.
 *                 exclusiveMinimum: 0
 *               digits:
 *                 type: integer
 *                 description: Number of decimal places to round the result to (optional, default is 4). Value must be 0-16.
 *                 minimum: 0
 *                 maximum: 16
 *                 default: 4
 *             required:
 *               - lambda
 *     responses:
 *       200:
 *         description: Successful calculation of photon momentum.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Photon momentum (p). Units depend on input units or the standard h value used.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, lambda is not positive, provided h is not positive).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 */
// Changed controller method reference and Swagger endpoint path/description
relativityQuantumRouter.post(
   "/photon-momentum-from-wavelength",
   handleCalculationRequest(relativityQuantumController.calculatePhotonMomentumFromWavelength)
);

/**
 * @swagger
 * /physics/photoelectric-effect-ke:
 *   post:
 *     summary: Calculates maximum kinetic energy in photoelectric effect (KE_max)
 *     description: Calculates the maximum kinetic energy (KE_max) of emitted electrons in the photoelectric effect. Uses the formula KE_max = E_photon - φ, where E_photon is the incoming photon energy and φ is the work function of the material. If E_photon ≤ φ, no electrons are emitted, and KE_max is 0. Requires E_photon ≥ 0 and φ ≥ 0. Units of E_photon and φ must be consistent to yield KE_max in the same units.
 *     tags:
 *       - Physics - Relativity and Quantum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               photonEnergy:
 *                 type: number
 *                 description: Energy of the incoming photon (E_photon). Must be a non-negative finite number.
 *                 minimum: 0
 *               phi:
 *                 type: number
 *                 description: Work function (φ) of the material. Must be a non-negative finite number.
 *                 minimum: 0
 *               digits:
 *                 type: integer
 *                 description: Number of decimal places to round the result to (optional, default is 4). Value must be 0-16.
 *                 minimum: 0
 *                 maximum: 16
 *                 default: 4
 *             required:
 *               - photonEnergy
 *               - phi
 *     responses:
 *       200:
 *         description: Successful calculation of maximum kinetic energy. Returns 0 if photon energy is less than or equal to the work function.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Maximum kinetic energy (KE_max) of the emitted electron.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, photonEnergy or phi are negative).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 */
// Changed controller method reference and Swagger endpoint path/description
relativityQuantumRouter.post(
   "/photoelectric-effect-ke",
   handleCalculationRequest(relativityQuantumController.calculatePhotoelectricEffectKE)
);

/**
 * @swagger
 * /physics/rydberg-transition:
 *   post:
 *     summary: Calculates energy or wavenumber for hydrogen-like atom transitions
 *     description: Calculates the energy difference (ΔE) or wavenumber (1/λ) for an electron transition between two energy levels in a hydrogen-like atom (Z). Uses the formula Result = Constant * Z² * (1/n_initial² - 1/n_final²).
 *       If 'Constant' is the Rydberg energy unit (e.g., in eV), the result is the energy difference E_final - E_initial (positive for absorption, negative for emission).
 *       If 'Constant' is the Rydberg constant for wavenumber (e.g., in m⁻¹), the result is the wavenumber 1/λ (positive for emission, negative for absorption).
 *       Requires nInitial > 0, nFinal > 0, nInitial ≠ nFinal, Z > 0 (integers), and Constant > 0.
 *     tags:
 *       - Physics - Relativity and Quantum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nInitial:
 *                 type: integer
 *                 description: Principal quantum number of the initial energy level (n_i). Must be a positive integer.
 *                 exclusiveMinimum: 0
 *               nFinal:
 *                 type: integer
 *                 description: Principal quantum number of the final energy level (n_f). Must be a positive integer and different from nInitial.
 *                 exclusiveMinimum: 0
 *               constant:
 *                 type: number
 *                 description: The Rydberg constant value in desired units (e.g., Rydberg energy in eV, or Rydberg constant in m⁻¹). Must be a positive finite number.
 *                 exclusiveMinimum: 0
 *               atomicNumber:
 *                 type: integer
 *                 description: The atomic number (Z) of the hydrogen-like atom (1 for Hydrogen). Optional, default is 1. Must be a positive integer.
 *                 exclusiveMinimum: 0
 *                 default: 1
 *               digits:
 *                 type: integer
 *                 description: Number of decimal places to round the result to (optional, default is 4). Value must be 0-16.
 *                 minimum: 0
 *                 maximum: 16
 *                 default: 4
 *             required:
 *               - nInitial
 *               - nFinal
 *               - constant
 *     responses:
 *       200:
 *         description: Successful calculation of the energy difference or wavenumber.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: The calculated value (Energy difference or Wavenumber) in the units defined by the 'constant' parameter.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, non-positive/non-integer quantum numbers or atomic number, nInitial equals nFinal, constant is not positive).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message describing the validation failure.
 */
// Changed controller method reference and Swagger endpoint path/description
relativityQuantumRouter.post(
   "/rydberg-transition",
   handleCalculationRequest(relativityQuantumController.calculateRydbergTransition)
);

module.exports = relativityQuantumRouter;