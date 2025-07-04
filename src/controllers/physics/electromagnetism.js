const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

// Keep all original functions defined at the top level with their JSDoc
/**
 * Calculates electric force using Coulomb's Law: F = k * |q1*q2| / r^2.
 * @param {object} params - Parameters for the calculation.
 * @param {number} params.k - Coulomb's constant (k).
 * @param {number} params.q1 - Charge 1 (q1).
 * @param {number} params.q2 - Charge 2 (q2).
 * @param {number} params.r - Distance between charges (r).
 * @returns {number} Electric force (F).
 * @throws {Error} If inputs are not finite numbers.
 */
const calculateCoulombsLaw = ({ k, q1, q2, r  , digits = 4}) => {
    validateNumber(k, "k");
    validateNumber(q1, "q1");
    validateNumber(q2, "q2");
    validateNumber(r, "r", { checkZero: true, checkNonNegative: true });
    return formatNumber((k * (q1 * q2)) / (r * r), digits);
 };

 /**
  * Calculates electric field using E = F/q.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.FE - Electric force (F_E).
  * @param {number} params.q - Charge (q).
  * @returns {number} Electric field (E).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateElectricField = ({ FE, q  , digits = 4}) => {
    validateNumber(FE, "FE");
    validateNumber(q, "q",  { checkZero: true });
    return formatNumber(FE / q, digits);
 };

 /**
  * Calculates electric potential using V = ΔU_E/q.
  * Note: Original JSDoc described this as calculating potential energy, but the equation matches potential.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.deltaUE - Change in potential energy (ΔU_E).
  * @param {number} params.q - Charge (q).
  * @returns {number} Electric potential (V).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateElectricPotential = ({ deltaUE, q  , digits = 4}) => {
    validateNumber(deltaUE, "deltaUE");
    validateNumber(q, "q", { checkZero: true });
    return formatNumber(deltaUE / q, digits);
 };

 /**
  * Calculates electric field using E = V/d.
  * Note: Original JSDoc described this as calculating field and potential, but the equation matches field.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.deltaV - Change in potential (ΔV).
  * @param {number} params.d - Distance (d).
  * @returns {number} Electric field (E).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateFieldAndPotential = ({ deltaV, d  , digits = 4}) => {
    validateNumber(deltaV, "deltaV");
    validateNumber(d, "d", { checkZero: true });
    return formatNumber(deltaV / d, digits);
 };

 /**
  * Calculates capacitance using C = Q/V.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.Q - Charge (Q).
  * @param {number} params.V - Voltage (V).
  * @returns {number} Capacitance (C).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateCapacitance = ({ Q, V  , digits = 4}) => {
    validateNumber(Q, "Q");
    validateNumber(V, "V", { checkZero: true });
    return formatNumber(Q / V, digits);
 };

 /**
  * Calculates capacitance for a parallel plate capacitor using C = κ ε₀ A / d.
  * Note: Assumes `kEpsilon` is the dielectric constant κ and 8.85e-12 is ε₀.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.kEpsilon - Dielectric constant (κ).
  * @param {number} params.A - Area of the plates (A).
  * @param {number} params.d - Distance between plates (d).
  * @returns {number} Capacitance (C).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculatePlateCapacitor = ({ kEpsilon, A, d  , digits = 4}) => {
     const EPSILON_0 = 8.85e-12; // Permittivity of free space
    validateNumber(kEpsilon, "kEpsilon");
    validateNumber(A, "A");
    validateNumber(d, "d", { checkZero: true, checkNonNegative: true });
    return formatNumber((kEpsilon * EPSILON_0 * A) / d, digits);
 };

 /**
  * Calculates capacitance for a cylindrical capacitor using C = (2π κ ε₀ l) / ln(r2/r1).
  * Note: Assumes `kEpsilon` is the dielectric constant κ and 8.85e-12 is ε₀.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.kEpsilon - Dielectric constant (κ).
  * @param {number} params.l - Length of the cylinder (l).
  * @param {number} params.r2 - Outer radius (r2).
  * @param {number} params.r1 - Inner radius (r1).
  * @returns {number} Capacitance (C).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateCylindricalCapacitor = ({ kEpsilon, l, r2, r1  , digits = 4}) => {
     const EPSILON_0 = 8.85e-12; // Permittivity of free space
    validateNumber(kEpsilon, "kEpsilon");
    validateNumber(l, "l");
    validateNumber(r2, "r2",{ checkZero: true, checkNonNegative: true });
    validateNumber(r1, "r1", { checkZero: true, checkNonNegative: true });
    return formatNumber((2 * Math.PI * kEpsilon * EPSILON_0 * l) / Math.log(r2 / r1), digits);
 };

 /**
  * Calculates capacitance for a spherical capacitor using C = 4π κ ε₀ / (1/r1 - 1/r2).
  * Note: Assumes `kEpsilon` is the dielectric constant κ and 8.85e-12 is ε₀.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.kEpsilon - Dielectric constant (κ).
  * @param {number} params.r1 - Inner radius (r1).
  * @param {number} params.r2 - Outer radius (r2).
  * @returns {number} Capacitance (C).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateSphericalCapacitor = ({ kEpsilon, r1, r2  , digits = 4}) => {
     const EPSILON_0 = 8.85e-12; // Permittivity of free space
    validateNumber(kEpsilon, "kEpsilon");
    validateNumber(r1, "r1", { checkZero: true, checkNonNegative: true });
    validateNumber(r2, "r2", {});
    return formatNumber((4 * Math.PI * kEpsilon * EPSILON_0) / (1 / r1 - 1 / r2), digits);
 };

 /**
  * Checks if the potential energy equations 0.5QV = 0.5CV^2 = 0.5Q^2/C hold true for the given values.
  * Note: The original code performs an incorrect boolean comparison `(A === B) === C` and uses strict equality with floating points. Preserving original logic as requested.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.Q - Charge (Q).
  * @param {number} params.V - Voltage (V).
  * @param {number} params.C - Capacitance (C).
  * @returns {boolean} True if the equation holds based on the original logic.
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateCapacitivePE = ({ Q, V, C  , digits = 4}) => {
    validateNumber(Q, "Q");
    validateNumber(V, "V");
    validateNumber(C, "C", { checkZero: true });
    // Original logic
    return formatNumber((0.5 * Q * V === 0.5 * C * V * V) === (0.5 * Q * Q) / C, digits);
 };

 /**
  * Calculates electric current using I = ΔQ/Δt.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.deltaQ - Change in charge (ΔQ).
  * @param {number} params.deltaT - Time interval (Δt).
  * @returns {number} Electric current (I).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateElectricCurrent = ({ deltaQ, deltaT  , digits = 4}) => {
    validateNumber(deltaQ, "deltaQ");
    validateNumber(deltaT, "deltaT", { checkZero: true });
    return formatNumber(deltaQ / deltaT, digits);
 };

 /**
  * Calculates charge density using ρ = Q/V.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.Q - Charge (Q).
  * @param {number} params.V - Volume (V).
  * @returns {number} Charge density (ρ).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateChargeDensity = ({ Q, V  , digits = 4}) => {
    validateNumber(Q, "Q");
    validateNumber(V, "V", { checkZero: true });
    return formatNumber(Q / V, digits);
 };

 /**
  * Calculates current density using J = I/A.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.I - Electric current (I).
  * @param {number} params.A - Cross-sectional area (A).
  * @returns {number} Current density (J).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateCurrentDensity = ({ I, A  , digits = 4}) => {
    validateNumber(I, "I");
    validateNumber(A, "A", { checkZero: true, checkNonNegative: true });
    return formatNumber(I / A, digits);
 };

 /**
  * Calculates resistance using R = V/I (from Ohm's Law).
  * Note: Original JSDoc described this as calculating voltage, but the equation matches resistance.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.V - Voltage (V).
  * @param {number} params.I - Current (I).
  * @returns {number} Resistance (R).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateOhmsLaw = ({ V, I  , digits = 4}) => {
    validateNumber(V, "V");
    validateNumber(I, "I", { checkZero: true });
    return formatNumber(V / I, digits);
 };

 /**
  * Calculates conductivity from resistivity using σ = 1/ρ.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.rhoValue - Resistivity (ρ).
  * @returns {number} Conductivity (σ).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateResitivityConductivity = ({ rhoValue  , digits = 4}) => {
    validateNumber(rhoValue, "rhoValue", { checkZero: true });
    return formatNumber(1 / rhoValue, digits);
 };

 /**
  * Calculates electric resistance using R = ρ(l/A).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.rhoValue - Resistivity (ρ).
  * @param {number} params.l - Length of conductor (l).
  * @param {number} params.A - Cross-sectional area (A).
  * @returns {number} Resistance (R).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateElectricResistance = ({ rhoValue, l, A  , digits = 4}) => {
    validateNumber(rhoValue, "rhoValue");
    validateNumber(l, "l");
    validateNumber(A, "A", { checkZero: true, checkNonNegative: true });
    return formatNumber((rhoValue * l) / A, digits);
 };

 /**
  * Checks if the electric power equations P = VI = I^2R = V^2/R hold true for the given values.
  * Note: The original code performs an incorrect boolean comparison `(A === B) === C` and uses strict equality with floating points. Preserving original logic as requested.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.V - Voltage (V).
  * @param {number} params.I - Current (I).
  * @param {number} params.R - Resistance (R).
  * @returns {boolean} True if the equation holds based on the original logic.
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateElectricPower = ({ V, I, R  , digits = 4}) => {
    validateNumber(V, "V");
    validateNumber(I, "I");
    validateNumber(R, "R", { checkZero: true });
   
    return formatNumber((V * I === I * I * R) === (V * V) / R, digits);
 };

 /**
  * Calculates total resistance for resistors in series using R_total = R1 + R2 + ... + Rn.
  * @param {object} params - Parameters for the calculation.
  * @param {Array<number>} params.resistances - Array of resistances (R).
  * @returns {number} Total resistance (R_total).
  * @throws {Error} If inputs are not finite numbers or not an array.
  */
 const calculateResistorsInSeries = ({ resistances  , digits = 4}) => {
    if (!Array.isArray(resistances)) {
       throw new Error("resistances must be an array.");
    }
    resistances.forEach((resistance, index) => validateNumber(resistance, `resistances[${index}]`));
    return formatNumber(resistances.reduce((sum, resistance) => sum + resistance, 0), digits);
 };

 /**
  * Calculates total resistance for resistors in parallel using 1/R_total = 1/R1 + 1/R2 + ... + 1/Rn.
  * @param {object} params - Parameters for the calculation.
  * @param {Array<number>} params.resistances - Array of resistances (R).
  * @returns {number} Total resistance (R_total).
  * @throws {Error} If inputs are not finite numbers or not an array. Also if sum of reciprocals is zero.
  */
 const calculateResistorsInParallel = ({ resistances  , digits = 4}) => {
    if (!Array.isArray(resistances)) {
       throw new Error("resistances must be an array.");
    }
    resistances.forEach((resistance, index) => validateNumber(resistance, `resistances[${index}]`));
     const sumOfReciprocals = resistances.reduce((sum, resistance) => sum + 1 / resistance, 0);
      if (sumOfReciprocals === 0) {
          throw new Error("Sum of reciprocals is zero, cannot calculate parallel resistance.");
      }
    return formatNumber(1 / sumOfReciprocals, digits);
 };

 /**
  * Calculates total capacitance for capacitors in series using 1/C_total = 1/C1 + 1/C2 + ... + 1/Cn.
  * @param {object} params - Parameters for the calculation.
  * @param {Array<number>} params.capacitances - Array of capacitances (C).
  * @returns {number} Total capacitance (C_total).
  * @throws {Error} If inputs are not finite numbers or not an array. Also if sum of reciprocals is zero.
  */
 const calculateCapacitorsInSeries = ({ capacitances  , digits = 4}) => {
    if (!Array.isArray(capacitances)) {
       throw new Error("capacitances must be an array.");
    }
    capacitances.forEach((capacitance, index) => validateNumber(capacitance, `capacitances[${index}]`));
    const sumOfReciprocals = capacitances.reduce((sum, capacitance) => sum + 1 / capacitance, 0);
     if (sumOfReciprocals === 0) {
         throw new Error("Sum of reciprocals is zero, cannot calculate series capacitance.");
     }
    return formatNumber(1 / sumOfReciprocals, digits);
 };

 /**
  * Calculates total capacitance for capacitors in parallel using C_total = C1 + C2 + ... + Cn.
  * @param {object} params - Parameters for the calculation.
  * @param {Array<number>} params.capacitances - Array of capacitances (C).
  * @returns {number} Total capacitance (C_total).
  * @throws {Error} If inputs are not finite numbers or not an array.
  */
 const calculateCapacitorsInParallel = ({ capacitances  , digits = 4}) => {
    if (!Array.isArray(capacitances)) {
       throw new Error("capacitances must be an array.");
    }
    capacitances.forEach((capacitance, index) => validateNumber(capacitance, `capacitances[${index}]`));
    return formatNumber(capacitances.reduce((sum, capacitance) => sum + capacitance, 0), digits);
 };

 /**
  * Calculates magnetic force on a charged particle using F = qvB sin(θ).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.q - Charge (q).
  * @param {number} params.v - Velocity (v).
  * @param {number} params.B - Magnetic field strength (B).
  * @param {number} params.theta - Angle between velocity and magnetic field (theta in radians).
  * @returns {number} Magnetic force (F).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateMagneticForceCharge = ({ q, v, B, theta  , digits = 4}) => {
    validateNumber(q, "q");
    validateNumber(v, "v");
    validateNumber(B, "B");
    validateNumber(theta, "theta");
    return formatNumber(q * v * B * Math.sin(theta), digits);
 };

 /**
  * Calculates magnetic force on a current-carrying conductor using F = I l B sin(θ).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.I - Current (I).
  * @param {number} params.l - Length of conductor (l).
  * @param {number} params.B - Magnetic field strength (B).
  * @param {number} params.theta - Angle between current and magnetic field (theta in radians).
  * @returns {number} Magnetic force (F).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateMagneticForceCurrent = ({ I, l, B, theta  , digits = 4}) => {
    validateNumber(I, "I");
    validateNumber(l, "l");
    validateNumber(B, "B");
    validateNumber(theta, "theta");
    return formatNumber(I * l * B * Math.sin(theta), digits);
 };

 /**
  * Calculates a value based on the Biot-Savart Law equation provided: (μ₀ I ds) / (4π r²).
  * Note: The equation in the code differs from the JSDoc equation `B = (μ₀I)/(4πr)`. Using the code's equation.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.mu0 - Permeability of free space (μ₀).
  * @param {number} params.I - Current (I).
  * @param {number} params.ds - Differential length element (ds).
  * @param {number} params.r - Distance from element (r).
  * @returns {number} Magnetic field contribution dB (based on the code's equation).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateBiotSavartLaw = ({ mu0, I, ds, r  , digits = 4}) => {
    validateNumber(mu0, "mu0");
    validateNumber(I, "I");
    validateNumber(ds, "ds");
    validateNumber(r, "r", { checkZero: true, checkNonNegative: true });
    return formatNumber((mu0 * I * ds) / (4 * Math.PI * r * r), digits);
 };

 /**
  * Calculates magnetic field inside a long solenoid using B = μ₀nI.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.mu0 - Permeability of free space (μ₀).
  * @param {number} params.n - Number of turns per unit length (n).
  * @param {number} params.I - Current (I).
  * @returns {number} Magnetic field (B).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateSolenoid = ({ mu0, n, I  , digits = 4}) => {
    validateNumber(mu0, "mu0");
    validateNumber(n, "n");
    validateNumber(I, "I");
    return formatNumber(mu0 * n * I, digits);
 };

 /**
  * Calculates magnetic field from an infinitely long straight wire using B = (μ₀I)/(2πr).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.mu0 - Permeability of free space (μ₀).
  * @param {number} params.I - Current (I).
  * @param {number} params.r - Distance from wire (r).
  * @returns {number} Magnetic field (B).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateStraightWire = ({ mu0, I, r  , digits = 4}) => {
    validateNumber(mu0, "mu0");
    validateNumber(I, "I");
    validateNumber(r, "r", { checkZero: true, checkNonNegative: true });
    return formatNumber((mu0 * I) / (2 * Math.PI * r), digits);
 };

 /**
  * Calculates force per unit length between parallel current-carrying wires using F/L = (μ₀I₁I₂)/(2πd).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.mu0 - Permeability of free space (μ₀).
  * @param {number} params.I1 - Current in wire 1 (I₁).
  * @param {number} params.I2 - Current in wire 2 (I₂).
  * @param {number} params.d - Distance between wires (d).
  * @returns {number} Force per unit length (F/L).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateParallelWires = ({ mu0, I1, I2, d  , digits = 4}) => {
    validateNumber(mu0, "mu0");
    validateNumber(I1, "I1", { checkZero: true });
    validateNumber(I2, "I2", { checkZero: true });
    validateNumber(d, "d", { checkZero: true, checkNonNegative: true });
    return formatNumber(((mu0 / (2 * Math.PI)) * (I1 * I2)) / d, digits);
 };

 /**
  * Calculates electric flux using Φ_E = E * A * cos(θ).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.E - Electric field (E).
  * @param {number} params.A - Area (A).
  * @param {number} params.theta - Angle between electric field and area vector (θ in radians).
  * @returns {number} Electric flux (Φ_E).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateElectricFlux = ({ E, A, theta  , digits = 4}) => {
    validateNumber(E, "E");
    validateNumber(A, "A");
    validateNumber(theta, "theta");
    return formatNumber(E * A * Math.cos(theta), digits);
 };

 /**
  * Calculates magnetic flux using Φ_B = B * A * cos(θ).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.B - Magnetic field (B).
  * @param {number} params.A - Area (A).
  * @param {number} params.theta - Angle between magnetic field and area vector (θ in radians).
  * @returns {number} Magnetic flux (Φ_B).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateMagneticFlux = ({ B, A, theta  , digits = 4}) => {
    validateNumber(B, "B");
    validateNumber(A, "A");
    validateNumber(theta, "theta");
    return formatNumber(B * A * Math.cos(theta), digits);
 };

 /**
  * Calculates induced emf in a moving conductor using emf = Blv.
  * Note: Standard equation includes sin(theta) and a negative sign. Using code's Blv equation.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.B - Magnetic field (B).
  * @param {number} params.l - Length of conductor (l).
  * @param {number} params.v - Velocity (v).
  * @returns {number} Induced emf (magnitude based on Blv).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateMotionalEmf = ({ B, l, v  , digits = 4}) => {
    validateNumber(B, "B");
    validateNumber(l, "l");
    validateNumber(v, "v");
    return formatNumber(B * l * v, digits);
 };

 /**
  * Calculates induced emf using Faraday's Law: emf = -ΔΦ_B / Δt.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.deltaPhiB - Change in magnetic flux (ΔΦ_B).
  * @param {number} params.deltaT - Change in time (Δt).
  * @returns {number} Induced emf.
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateInducedEmf = ({ deltaPhiB, deltaT  , digits = 4}) => {
    validateNumber(deltaPhiB, "deltaPhiB");
    validateNumber(deltaT, "deltaT", { checkZero: true });
    return formatNumber(-deltaPhiB / deltaT, digits);
 };

 /**
  * Calculates the induced emf in an inductor using emf = -L dI/dt.
  * Note: Original JSDoc described this as calculating inductance, but the equation calculates induced emf.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.L - Inductance (L).
  * @param {number} params.dI - Change in current (ΔI).
  * @param {number} params.dt - Change in time (Δt).
  * @returns {number} Induced emf.
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateInductance = ({ L, dI, dt  , digits = 4}) => {
    validateNumber(L, "L");
    validateNumber(dI, "dI");
    validateNumber(dt, "dt", { checkZero: true });
    // This calculates induced emf (-L dI/dt), not inductance L.
    return formatNumber((-L * dI) / dt, digits);
 };

 /**
  * Calculates capacitive reactance using X_C = 1/(2πfC).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.f - Frequency (f).
  * @param {number} params.C - Capacitance (C).
  * @returns {number} Capacitive reactance (X_C).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateCapacitiveReactance = ({ f, C  , digits = 4}) => {
    validateNumber(f, "f", { checkZero: true });
    validateNumber(C, "C", { checkZero: true });
    return formatNumber(1 / (2 * Math.PI * f * C), digits);
 };

 /**
  * Calculates inductive reactance using X_L = 2πfL.
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.f - Frequency (f).
  * @param {number} params.L - Inductance (L).
  * @returns {number} Inductive reactance (X_L).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateInductiveReactance = ({ f, L  , digits = 4}) => {
    validateNumber(f, "f");
    validateNumber(L, "L");
    return formatNumber(2 * Math.PI * f * L, digits);
 };

 /**
  * Calculates impedance using Z = √(R^2 + (X_L - X_C)^2).
  * @param {object} params - Parameters for the calculation.
  * @param {number} params.R - Resistance (R).
  * @param {number} params.XL - Inductive reactance (X_L).
  * @param {number} params.XC - Capacitive reactance (X_C).
  * @returns {number} Impedance (Z).
  * @throws {Error} If inputs are not finite numbers.
  */
 const calculateImpedance = ({ R, XL, XC  , digits = 4}) => {
    validateNumber(R, "R");
    validateNumber(XL, "XL");
    validateNumber(XC, "XC");
    return formatNumber(Math.sqrt(R * R + Math.pow(XL - XC, 2)), digits);
 };


/**
 * Controller class that exposes top-level Electromagnetism calculation functions as its properties.
 * The actual calculation logic resides in the functions defined outside this class.
 */
class ElectroMagnetismController {
        // Assign each top-level function to a property on the instance
        calculateCoulombsLaw = calculateCoulombsLaw;
        calculateElectricField = calculateElectricField;
        calculateElectricPotential = calculateElectricPotential;
        calculateFieldAndPotential = calculateFieldAndPotential;
        calculateCapacitance = calculateCapacitance;
        calculatePlateCapacitor = calculatePlateCapacitor;
        calculateCylindricalCapacitor = calculateCylindricalCapacitor;
        calculateSphericalCapacitor = calculateSphericalCapacitor;
        calculateCapacitivePE = calculateCapacitivePE;
        calculateElectricCurrent = calculateElectricCurrent;
        calculateChargeDensity = calculateChargeDensity;
        calculateCurrentDensity = calculateCurrentDensity;
        calculateOhmsLaw = calculateOhmsLaw;
        calculateResitivityConductivity = calculateResitivityConductivity;
        calculateElectricResistance = calculateElectricResistance;
        calculateElectricPower = calculateElectricPower;
        calculateResistorsInSeries = calculateResistorsInSeries;
        calculateResistorsInParallel = calculateResistorsInParallel;
        calculateCapacitorsInSeries = calculateCapacitorsInSeries;
        calculateCapacitorsInParallel = calculateCapacitorsInParallel;
        calculateMagneticForceCharge = calculateMagneticForceCharge;
        calculateMagneticForceCurrent = calculateMagneticForceCurrent;
        calculateBiotSavartLaw = calculateBiotSavartLaw;
        calculateSolenoid = calculateSolenoid;
        calculateStraightWire = calculateStraightWire;
        calculateParallelWires = calculateParallelWires;
        calculateElectricFlux = calculateElectricFlux;
        calculateMagneticFlux = calculateMagneticFlux;
        calculateMotionalEmf = calculateMotionalEmf;
        calculateInducedEmf = calculateInducedEmf;
        calculateInductance = calculateInductance;
        calculateCapacitiveReactance = calculateCapacitiveReactance;
        calculateInductiveReactance = calculateInductiveReactance;
        calculateImpedance = calculateImpedance;
}

module.exports = new ElectroMagnetismController();