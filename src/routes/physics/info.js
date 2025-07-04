const express = require("express");
const infoRouter = express.Router();
const { sendRes } = require("../../utils/httpUtils");
const { httpCodes } = require("../../enums/http.js");
const dbUtils = require("../../utils/dbUtils.js");
const es = require("../../info/es.js");
const en = require("../../info/en.js");
const fr = require("../../info/fr.js");
const de = require("../../info/de.js");
const it = require("../../info/it.js");
const ja = require("../../info/ja.js");
const pl = require("../../info/pl.js");
const nl = require("../../info/nl.js");
const zh = require("../../info/zh.js");
const he = require("../../info/he.js");
const ar = require("../../info/ar.js");
const ru = require("../../info/ru.js");
const pt = require("../../info/pt.js");
const ko = require("../../info/ko.js");
const hi = require("../../info/ht.js");
const tr = require("../../info/tr.js");
const ur = require("../../info/ur.js");
const bn = require("../../info/bn.js");
const functionNames = {
   "/physics/youngs-modulus": {
      name: "Young's Modulus",
      equation: "E = σ / ε",
   },
   "/physics/shear-modulus": {
      name: "Shear Modulus",
      equation: "G = τ / γ",
   },
   "/physics/bulk-modulus": {
      name: "Bulk Modulus",
      equation: "K = -ΔP / (ΔV / V₀)",
   },
   "/physics/hookes-law": {
      name: "Hooke's Law",
      equation: "F = kx",
   },
   "/physics/solid-expansion-length": {
      name: "Solid Thermal Expansion (Length)",
      equation: "ΔL = αL₀ΔT",
   },
   "/physics/solid-expansion-area": {
      name: "Solid Thermal Expansion (Area)",
      equation: "ΔA = βA₀ΔT",
   },
   "/physics/solid-expansion-volume": {
      name: "Solid Thermal Expansion (Volume)",
      equation: "ΔV = γV₀ΔT",
   },
   "/physics/liquid-expansion": {
      name: "Liquid Thermal Expansion",
      equation: "ΔV = βV₀ΔT",
   },
   "/physics/sensible-heat": {
      name: "Sensible Heat",
      equation: "Q = mcΔT",
   },
   "/physics/latent-heat": {
      name: "Latent Heat",
      equation: "Q = mL",
   },
   "/physics/ideal-gas-law": {
      name: "Ideal Gas Law",
      equation: "PV = nRT",
   },
   "/physics/molecular-ke": {
      name: "Molecular Kinetic Energy",
      equation: "KE_avg = (3/2)kT",
   },
   "/physics/molecular-speed-vp": {
      name: "Molecular Speed (Most Probable)",
      equation: "v_p = √(2kT/m)",
   },
   "/physics/molecular-speed-avg": {
      name: "Molecular Speed (Average)",
      equation: "v_avg = √(8kT/πm)",
   },
   "/physics/molecular-speed-rms": {
      name: "Molecular Speed (RMS)",
      equation: "v_rms = √(3kT/m)",
   },
   "/physics/thermal-conduction": {
      name: "Thermal Conduction",
      equation: "Q/t = kAΔT/d",
   },
   "/physics/stefan-boltzmann-law": {
      name: "Stefan-Boltzmann Law",
      equation: "P = εσAT⁴",
   },
   "/physics/wien-law-lambda-max": {
      name: "Wien's Displacement Law (Max Wavelength)",
      equation: "λ_max = b/T",
   },
   "/physics/wien-law-f-max": {
      name: "Wien's Displacement Law (Max Frequency)",
      equation: "f_max ≈ 2.82 * kT / h",
   },
   "/physics/internal-energy-change": {
      name: "Internal Energy Change",
      equation: "ΔU = Q - W",
   },
   "/physics/thermodynamic-work": {
      name: "Thermodynamic Work",
      equation: "W = PΔV (constant pressure)",
   },
   "/physics/efficiency-real": {
      name: "Real Efficiency",
      equation: "η = W_out / Q_in",
   },
   "/physics/efficiency-ideal": {
      name: "Ideal Efficiency",
      equation: "η_ideal = 1 - T_cold / T_hot",
   },
   "/physics/cop-real": {
      name: "Real Coefficient of Performance (COP)",
      equation: "COP_ref = Q_c / W (Refrigerator)",
   },
   "/physics/cop-ideal": {
      name: "Ideal Coefficient of Performance (COP)",
      equation: "COP_ideal_ref = T_c / (T_h - T_c)",
   },
   "/physics/centripetal-acceleration": {
      name: "Centripetal Acceleration",
      equation: "a_c = v² / r",
   },
   "/physics/centripetal-acceleration-angular": {
      name: "Centripetal Acceleration (Angular)",
      equation: "a_c = ω²r",
   },
   "/physics/coulombs-law": {
      name: "Coulomb's Law (Force)",
      equation: "F = k |q₁q₂| / r²",
   },
   "/physics/electric-field": {
      name: "Electric Field",
      equation: "E = kq / r² (point charge)",
   },
   "/physics/electric-potential": {
      name: "Electric Potential",
      equation: "V = kq / r (point charge)",
   },
   "/physics/field-and-potential": {
      name: "Electric Field and Potential Relationship",
      equation: "E_x = -dV/dx",
   },
   "/physics/capacitance": {
      name: "Capacitance",
      equation: "C = Q / V",
   },
   "/physics/plate-capacitor": {
      name: "Plate Capacitor Capacitance",
      equation: "C = ε₀A / d",
   },
   "/physics/cylindrical-capacitor": {
      name: "Cylindrical Capacitor Capacitance",
      equation: "C = 2πε₀L / ln(b/a)",
   },
   "/physics/spherical-capacitor": {
      name: "Spherical Capacitor Capacitance",
      equation: "C = 4πε₀ * (ab / (b-a))",
   },
   "/physics/capacitive-pe": {
      name: "Capacitive Potential Energy",
      equation: "U_C = ½CV²",
   },
   "/physics/electric-current": {
      name: "Electric Current",
      equation: "I = ΔQ / Δt",
   },
   "/physics/charge-density": {
      name: "Charge Density",
      equation: "ρ = Q / V (Volume)",
   },
   "/physics/current-density": {
      name: "Current Density",
      equation: "J = I / A",
   },
   "/physics/ohms-law": {
      name: "Ohm's Law",
      equation: "V = IR",
   },
   "/physics/resistivity-conductivity": {
      name: "Resistivity and Conductivity",
      equation: "ρ = RA / L",
   },
   "/physics/electric-resistance": {
      name: "Electric Resistance",
      equation: "R = ρL / A",
   },
   "/physics/electric-power": {
      name: "Electric Power",
      equation: "P = IV",
   },
   "/physics/resistors-in-series": {
      name: "Resistors in Series",
      equation: "R_total = R₁ + R₂ + ...",
   },
   "/physics/resistors-in-parallel": {
      name: "Resistors in Parallel",
      equation: "1/R_total = 1/R₁ + 1/R₂ + ...",
   },
   "/physics/capacitors-in-series": {
      name: "Capacitors in Series",
      equation: "1/C_total = 1/C₁ + 1/C₂ + ...",
   },
   "/physics/capacitors-in-parallel": {
      name: "Capacitors in Parallel",
      equation: "C_total = C₁ + C₂ + ...",
   },
   "/physics/magnetic-force-charge": {
      name: "Magnetic Force on a Charge",
      equation: "F_B = |q|vBsin(θ)",
   },
   "/physics/magnetic-force-current": {
      name: "Magnetic Force on a Current",
      equation: "F_B = ILBsin(θ)",
   },
   "/physics/biot-savart-law": {
      name: "Biot-Savart Law",
      equation: "B = μ₀I / (2πr) (infinite straight wire)",
   },
   "/physics/solenoid": {
      name: "Magnetic Field of a Solenoid",
      equation: "B = μ₀nI (inside, ideal)",
   },
   "/physics/straight-wire": {
      name: "Magnetic Field of a Straight Wire",
      equation: "B = μ₀I / (2πr) (infinite wire)",
   },
   "/physics/parallel-wires": {
      name: "Force Between Parallel Wires",
      equation: "F/L = (μ₀I₁I₂) / (2πd)",
   },
   "/physics/electric-flux": {
      name: "Electric Flux",
      equation: "Φ_E = EAcos(θ) (uniform E)",
   },
   "/physics/magnetic-flux": {
      name: "Magnetic Flux",
      equation: "Φ_B = BAcos(θ) (uniform B)",
   },
   "/physics/motional-emf": {
      name: "Motional EMF",
      equation: "ε = vBL (straight conductor)",
   },
   "/physics/induced-emf": {
      name: "Induced EMF (Faraday's Law)",
      equation: "ε = -dΦ_B / dt",
   },
   "/physics/inductance-induced-emf": {
      name: "Induced EMF from Inductance",
      equation: "ε_L = -L dI / dt",
   },
   "/physics/capacitive-reactance": {
      name: "Capacitive Reactance",
      equation: "X_C = 1 / (2πfC)",
   },
   "/physics/inductive-reactance": {
      name: "Inductive Reactance",
      equation: "X_L = 2πfL",
   },
   "/physics/impedance": {
      name: "Impedance",
      equation: "Z = √(R² + (X_L - X_C)²)",
   },
   "/physics/density": {
      name: "Density",
      equation: "ρ = m / V",
   },
   "/physics/pressure": {
      name: "Pressure",
      equation: "P = F / A",
   },
   "/physics/pressure-in-fluid": {
      name: "Pressure in a Fluid",
      equation: "P = P₀ + ρgh",
   },
   "/physics/buoyancy": {
      name: "Buoyancy",
      equation: "F_B = ρ_fluid * V_submerged * g",
   },
   "/physics/mass-flow-rate": {
      name: "Mass Flow Rate",
      equation: "ṁ = ρAv",
   },
   "/physics/volume-flow-rate": {
      name: "Volume Flow Rate",
      equation: "Q = Av",
   },
   "/physics/bernoulli-equation": {
      name: "Bernoulli's Equation",
      equation: "P + ½ρv² + ρgy = constant",
   },
   "/physics/dynamic-viscosity": {
      name: "Dynamic Viscosity",
      equation: "τ = μ * (dv/dy)",
   },
   "/physics/kinematic-viscosity": {
      name: "Kinematic Viscosity",
      equation: "ν = μ / ρ",
   },
   "/physics/drag": {
      name: "Drag Force",
      equation: "F_D = ½ρv²CdA",
   },
   "/physics/mach-number": {
      name: "Mach Number",
      equation: "M = v / c_sound",
   },
   "/physics/reynolds-number": {
      name: "Reynolds Number",
      equation: "Re = ρvd / μ",
   },
   "/physics/froude-number": {
      name: "Froude Number",
      equation: "Fr = v / √(gL)",
   },
   "/physics/surface-tension": {
      name: "Surface Tension",
      equation: "γ = F / L",
   },
   "/physics/universal-gravitation": {
      name: "Universal Gravitation (Force)",
      equation: "F = G m₁m₂ / r²",
   },
   "/physics/gravitational-field": {
      name: "Gravitational Field",
      equation: "g = GM / r² (magnitude)",
   },
   "/physics/gravitational-pe": {
      name: "Gravitational Potential Energy",
      equation: "U_g = -G m₁m₂ / r (general)",
   },
   "/physics/gravitational-potential": {
      name: "Gravitational Potential",
      equation: "V_g = -GM / r",
   },
   "/physics/orbital-speed": {
      name: "Orbital Speed",
      equation: "v_orbit = √(GM / r) (circular)",
   },
   "/physics/escape-speed": {
      name: "Escape Speed",
      equation: "v_escape = √(2GM / r)",
   },
   "/info/{subject}/{equation_id}/{language_code}": {
      name: "Equation Info (Specific)",
      equation: "N/A (Retrieves info, not calculates)",
   },
   "/info/equation-summaries": {
      name: "List Endpoints (API Reference)",
      equation: "N/A (Lists endpoints)",
   },
   "/physics/velocity": {
      name: "Velocity",
      equation: "v = Δx / Δt",
   },
   "/physics/acceleration": {
      name: "Acceleration",
      equation: "a = Δv / Δt",
   },
   "/physics/motion-v": {
      name: "Kinematic Equation (v = v₀ + at)",
      equation: "v = v₀ + at",
   },
   "/physics/motion-s": {
      name: "Kinematic Equation (s = s₀ + v₀t + ½at²)",
      equation: "s = s₀ + v₀t + ½at²",
   },
   "/physics/motion-v2": {
      name: "Kinematic Equation (v² = v₀² + 2aΔs)",
      equation: "v² = v₀² + 2aΔs",
   },
   "/physics/motion-v-avg": {
      name: "Average Velocity",
      equation: "v_avg = Δx / Δt",
   },
   "/physics/force": {
      name: "Force (Newton's Second Law)",
      equation: "F_net = ma",
   },
   "/physics/weight": {
      name: "Weight",
      equation: "W = mg",
   },
   "/physics/dry-friction-static-max": {
      name: "Maximum Static Friction",
      equation: "f_s_max = μ_s * F_N",
   },
   "/physics/dry-friction-kinetic": {
      name: "Kinetic Friction",
      equation: "f_k = μ_k * F_N",
   },
   "/physics/momentum": {
      name: "Momentum",
      equation: "p = mv",
   },
   "/physics/impulse": {
      name: "Impulse",
      equation: "J = F_avg * Δt",
   },
   "/physics/impulse-momentum": {
      name: "Impulse-Momentum Theorem",
      equation: "J = Δp",
   },
   "/physics/activity": {
      name: "Radioactive Activity",
      equation: "A = λN",
   },
   "/physics/half-life": {
      name: "Half-Life",
      equation: "T_½ = ln(2) / λ",
   },
   "/physics/absorbed-dose": {
      name: "Absorbed Radiation Dose",
      equation: "D = dE / dm",
   },
   "/physics/equivalent-dose": {
      name: "Equivalent Radiation Dose",
      equation: "H = D * W_R",
   },
   "/physics/effective-dose": {
      name: "Effective Radiation Dose",
      equation: "E = Σ (H_T * W_T)",
   },
   "/physics/cerenkov-angle": {
      name: "Cherenkov Angle",
      equation: "cos(θ_C) = c / (nv)",
   },
   "/physics/interference-fringes": {
      name: "Interference Fringes (e.g., position, spacing)",
      equation: "Δy = λL / d (double slit spacing)",
   },
   "/physics/index-of-refraction": {
      name: "Index of Refraction",
      equation: "n = c / v",
   },
   "/physics/snells-law": {
      name: "Snell's Law",
      equation: "n₁sin(θ₁) = n₂sin(θ₂)",
   },
   "/physics/critical-angle": {
      name: "Critical Angle",
      equation: "sin(θ_c) = n₂ / n₁ (n₁ > n₂)",
   },
   "/physics/image-location": {
      name: "Image Location (Optics)",
      equation: "1/f = 1/d_o + 1/d_i (Thin Lens/Mirror)",
   },
   "/physics/image-size": {
      name: "Image Size (Magnification - Optics)",
      equation: "M = h_i / h_o = -d_i / d_o",
   },
   "/physics/spherical-mirror": {
      name: "Spherical Mirror Equation",
      equation: "1/f = 1/d_o + 1/d_i",
   },
   "/physics/spring-pe": {
      name: "Spring Potential Energy",
      equation: "U_s = ½kx²",
   },
   "/physics/sho-period": {
      name: "Simple Harmonic Oscillator (SHO) Period",
      equation: "T = 2π√(m/k)",
   },
   "/physics/simple-pendulum-period": {
      name: "Simple Pendulum Period",
      equation: "T = 2π√(L/g)",
   },
   "/physics/frequency": {
      name: "Frequency",
      equation: "f = 1 / T",
   },
   "/physics/angular-frequency": {
      name: "Angular Frequency",
      equation: "ω = 2πf",
   },
   "/physics/lorentz-factor": {
      name: "Lorentz Factor",
      equation: "γ = 1 / √(1 - v²/c²)",
   },
   "/physics/time-dilation": {
      name: "Time Dilation",
      equation: "Δt' = γ * Δt₀",
   },
   "/physics/length-contraction": {
      name: "Length Contraction",
      equation: "L' = L₀ / γ",
   },
   "/physics/relativistic-velocity": {
      name: "Relativistic Velocity Addition",
      equation: "u' = (u + v) / (1 + uv/c²)",
   },
   "/physics/relativistic-energy": {
      name: "Relativistic Total Energy",
      equation: "E = γmc²",
   },
   "/physics/relativistic-momentum": {
      name: "Relativistic Momentum",
      equation: "p = γmv",
   },
   "/physics/energy-momentum-relation": {
      name: "Energy-Momentum Relation",
      equation: "E² = (pc)² + (mc²)²",
   },
   "/physics/mass-energy-equivalence": {
      name: "Mass-Energy Equivalence (E₀ = mc²)",
      equation: "E₀ = mc²",
   },
   "/physics/relativistic-kinetic-energy": {
      name: "Relativistic Kinetic Energy",
      equation: "KE = (γ - 1)mc²",
   },
   "/physics/relativistic-doppler-effect": {
      name: "Relativistic Doppler Effect (Wavelength)",
      equation: "λ' = λ₀√((1 + β)/(1 - β)) (β = v/c)",
   },
   "/physics/photon-energy-from-frequency": {
      name: "Photon Energy (from Frequency)",
      equation: "E = hf",
   },
   "/physics/photon-momentum-from-wavelength": {
      name: "Photon Momentum (from Wavelength)",
      equation: "p = h / λ",
   },
   "/physics/photoelectric-effect-ke": {
      name: "Photoelectric Effect (Max KE)",
      equation: "KE_max = E_photon - φ",
   },
   "/physics/rydberg-transition": {
      name: "Rydberg Equation (Atomic Transition)",
      equation: "ΔE = R_y * Z² * (1/n₁² - 1/n₂²)",
   },
   "/physics/angular-velocity": {
      name: "Angular Velocity",
      equation: "ω = Δθ / Δt",
   },
   "/physics/angular-acceleration": {
      name: "Angular Acceleration",
      equation: "α = Δω / Δt",
   },
   "/physics/rotation-omega": {
      name: "Rotational Kinematics (ω)",
      equation: "ω = ω₀ + αt",
   },
   "/physics/rotation-theta": {
      name: "Rotational Kinematics (θ)",
      equation: "θ = θ₀ + ω₀t + ½αt²",
   },
   "/physics/rotation-omega2": {
      name: "Rotational Kinematics (ω²)",
      equation: "ω² = ω₀² + 2αΔθ",
   },
   "/physics/rotation-omega-avg": {
      name: "Average Angular Velocity",
      equation: "ω_avg = Δθ / Δt",
   },
   "/physics/torque": {
      name: "Torque",
      equation: "τ = rFsin(θ)",
   },
   "/physics/2nd-law-rotation": {
      name: "Newton's Second Law (Rotation)",
      equation: "τ_net = Iα",
   },
   "/physics/moment-of-inertia": {
      name: "Moment of Inertia",
      equation: "I = mr² (point mass)",
   },
   "/physics/rotational-work": {
      name: "Rotational Work",
      equation: "W = τΔθ (constant torque)",
   },
   "/physics/rotational-power": {
      name: "Rotational Power",
      equation: "P = τω",
   },
   "/physics/rotational-ke": {
      name: "Rotational Kinetic Energy",
      equation: "KE_rot = ½Iω²",
   },
   "/physics/angular-momentum": {
      name: "Angular Momentum",
      equation: "L = Iω",
   },
   "/physics/angular-impulse": {
      name: "Angular Impulse",
      equation: "J_angular = τ_avg * Δt",
   },
   "/physics/periodic-wave-velocity": {
      name: "Periodic Wave Velocity",
      equation: "v = fλ",
   },
   "/physics/intensity": {
      name: "Wave Intensity",
      equation: "I = P / A",
   },
   "/physics/intensity-level": {
      name: "Intensity Level (Decibels)",
      equation: "β = 10 * log₁₀(I / I₀)",
   },
   "/physics/pressure-level": {
      name: "Pressure Level (Sound Pressure Level)",
      equation: "L_p = 20 * log₁₀(P_rms / P_ref)",
   },
   "/physics/doppler-effect": {
      name: "Doppler Effect (Sound/Non-Relativistic)",
      equation: "f_obs / f_source = (v_wave + v_observer) / (v_wave - v_source)",
   },
   "/physics/mach-angle": {
      name: "Mach Angle",
      equation: "sin(μ) = 1 / M",
   },
   "/physics/work": {
      name: "Work",
      equation: "W = Fdcos(θ)",
   },
   "/physics/kinetic-energy": {
      name: "Kinetic Energy",
      equation: "KE = ½mv²",
   },
   "/physics/kinetic-energy-from-momentum": {
      name: "Kinetic Energy (from Momentum)",
      equation: "KE = p² / (2m)",
   },
   "/physics/gravitational-potential-energy": {
      name: "Gravitational Potential Energy",
      equation: "U_g = mgh (near surface)",
   },
   "/physics/efficiency": {
      name: "Efficiency",
      equation: "Efficiency = Output / Input",
   },
   "/physics/power": {
      name: "Power",
      equation: "P = W / t",
   },
   "/physics/power-velocity": {
      name: "Power (P = Fv)",
      equation: "P = Fv",
   },
};
function toProperCase(str) {
   return str.replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
}

function getFile(language_code) {
   switch (language_code) {
      case "en":
         return en;
      case "es":
         return es;
      case "fr":
         return fr;
      case "de":
         return de;
      case "it":
         return it;
      case "ja":
         return ja;
      case "pl":
         return pl;
      case "nl":
         return nl;
      case "zh":
         return zh;
      case "he":
         return he;
      case "ar":
         return ar;
      case "ru":
         return ru;
      case "pt":
         return pt;
      case "ko":
         return ko;
      case "tr":
         return tr;
      case "ur":
         return ur;
      case "hi":
         return hi;
      case "bn":
         return bn;
      default:
         return [];
   }
}
async function extractSwaggerData(swaggerObj) {
   try {
      // Input validation
      if (!swaggerObj || typeof swaggerObj !== "object") {
         throw new Error("Invalid input: expected an object.");
      }
      let list = [];

      Object.entries(swaggerObj).forEach(([key, value]) => {
         // Check if the path has any common methods (post, get, etc.)
         if (!value?.post && !value?.get && !value?.put && !value?.delete) {
            console.warn(`Missing 'post', 'get', 'put', or 'delete' data for key: ${key}`);
            return; // Skip to the next iteration if no methods are found
         }

         // Get the data from the first available method (post, then get, etc.)
         const itemData = value.post || value.get || value.put || value.delete;

         // Extract tags and derive the subject
         const tags = Array.isArray(itemData.tags) && itemData.tags.length > 0 ? itemData.tags[0] : "";
         const subject = tags.includes(" - ") ? tags.split(" - ")[0].trim() : tags.trim();
         const topic = tags.includes(" - ") ? tags.split(" - ")[1].trim() : tags.trim();
         // Split the string by the '/' character
         const parts = key.split("/");

         // The parts array will look like this: ["", "physics", "doppler-effect"]
         // Note the empty string at the beginning because the path starts with '/'

         // To get the last item, access the element at the last index
         const equation_id = parts[parts.length - 1];

         const item = functionNames[key] || {}; // Get the function name and equation from the predefined object
         const equationInfo = {
            equation_id: equation_id,
            name: item.name || "", // Use functionNames or fallback to summary/description
            equation_text: item.equation || "", // Use summary or description as equation text
            summary: itemData.summary || "", // summary
            description: itemData.description || "", // description
            language_code: itemData.language_code || "en", // Default to English if not provided
            subject: toProperCase(subject), // Convert subject to proper case
            variables: itemData.variables || {}, // variables
            topic: toProperCase(topic), // topic
         };
         // Assign the array to the key (equation_id)
         list.push(equationInfo);
      });
      return list; // Return the list of endpoints
   } catch (error) {
      console.error("Error processing Swagger data:", error);
      // Return an empty object in case of any processing error
      return {};
   }
}

/**
 * Returns a new array of objects, with specified properties stripped from each object.
 * Does not modify the original array or the objects within it.
 * Non-object elements in the array are returned as they are.
 *
 * @param {Array<Object>} arr - The array of objects to process.
 * @param {string | string[]} propertiesToRemove - A single property name (string) or an array of property names (strings) to remove from each object.
 * @returns {Array<Object>} A new array with the specified properties removed from each object copy.
 */
function getReducedArray(arr, propertiesToRemove) {
   // Ensure the input is an array
   if (!Array.isArray(arr)) {
      console.error("stripPropertiesFromArray: First argument must be an array.");
      // Depending on desired behavior, you might return [], throw error, or return arr
      return [];
   }

   // Normalize propertiesToRemove into an array of strings
   let propsToStrip = [];
   if (typeof propertiesToRemove === "string") {
      propsToStrip = [propertiesToRemove];
   } else if (Array.isArray(propertiesToRemove)) {
      // Filter out any non-string values from the input array of properties
      propsToStrip = propertiesToRemove.filter((prop) => typeof prop === "string");
   }
   // If propertiesToRemove is not a string or array, propsToStrip remains empty,
   // meaning no properties will be stripped.

   // Create a new array by mapping over the original array
   const newArray = arr.map((item) => {
      // If the item is not a valid object, return it as is
      if (!item || typeof item !== "object") {
         return item;
      }

      // Create a shallow copy of the original object
      // Using spread syntax {...item} is a concise way for shallow copy
      const copiedObject = { ...item };

      // Iterate over the list of properties to remove and delete them from the copy
      propsToStrip.forEach((propName) => {
         // Use hasOwnProperty check for robustness, though `delete` is safe even if the property doesn't exist
         if (Object.prototype.hasOwnProperty.call(copiedObject, propName)) {
            delete copiedObject[propName];
         }
      });

      // Return the modified copy of the object
      return copiedObject;
   });

   return newArray;
}

/**
 * Finds the first object in an array where a specific property matches a given value.
 *
 * @param {Array<Object>} arr - The array of objects to search within.
 * @param {string} propName - The name of the property to check on each object.
 * @param {*} propValue - The value to match for the specified property.
 * @returns {Object | undefined} The first matching object, or undefined if no match is found.
 */
function getByProperty(arr, propName, propValue) {
   // Check if the input is actually an array
   if (!Array.isArray(arr)) {
      console.error("findObjectByProperty: First argument must be an array.");
      return undefined; // Or throw an error
   }

   // Use the find method to iterate through the array
   return arr.find((obj) => {
      // Ensure the object is valid and has the property before accessing
      if (obj && typeof obj === "object" && obj.hasOwnProperty(propName)) {
         // For each object, check if the specified property's value
         // strictly equals the target value
         return obj[propName] === propValue;
      }
      return false; // Skip objects that are null/not objects or don't have the property
   });
}

/**
 * @swagger
 * /info/equation-summaries/{language_code}:
 *   get:
 *     summary: Get summary information about all the equations in the API.
 *     description: Retrieves summary information on all endpoints in the API.
 *     tags:
 *       - API Information
 *     parameters:
 *       - in: path
 *         name: language_code
 *         schema:
 *           type: string
 *           # === Add the enum here to specify allowed values ===
 *           enum:
 *             - en
 *             - es
 *             - fr
 *             - de
 *             - it
 *             - ja
 *             - pl
 *             - nl
 *             - zh
 *             - he
 *             - ar
 *             - ru
 *             - pt
 *             - ko
 *             - tr
 *             - ur
 *             - hi
 *             - bn
 *           # ================================================
 *         required: false
 *         description: The language code for the equation summary. Select from the supported list.
 *     responses:
 *       200:
 *         description: Successful response with array of equation summaries.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subject:
 *                   type: string
 *                   description: The subject the equation belongs to.
 *                 equation_id:
 *                   type: string
 *                   description: The ID of the equation.
 *                 language_code:
 *                   type: string
 *                   description: The language code of the returned details (Note - Code uses 'lang' query param or defaults 'en').
 *               # Example of a successful response body (assuming the internal 'body' object structure)
 *               example:
 *                 subject: Physics
 *                 equation_id: centripetal-acceleration
 *                 language_code: en # Or 'es', 'fr' etc. based on request/logic
 *       400:
 *         description: Bad Request - Equation ID is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error.
 *               example:
 *                 error: Equation ID is required.
 *       # Add other potential responses like 404 Not Found if you implement that logic
 */
infoRouter.get("/equation-summaries/:language_code", async (req, res) => {
   try {
      const propsToRemove = ["description", "variables", "topic", "language_code"]; // Properties to remove from the response
      let language_code = req.params.language_code || "en"; // Default to English if not provided

      //came from swagger unset
      if (language_code === "{language_code}") {
         language_code = "en"; // Default to English if not provided
      }
      const langFile = getFile(language_code); // Get the language file based on the language code
      if (!langFile) {
         return sendRes(res, httpCodes.NotFound, "Unknown or unsupported language_code.", {}); // Send the processed data as response
      }

      const result = getReducedArray(langFile, propsToRemove); // Get the function names and equations
      return sendRes(res, httpCodes.OK, "", result); // Return the function names directly if language is English
   } catch (error) {
      console.error("Error fetching Swagger data:", error);
      throw new Error(`HTTP error! Status: ${error.message}`);
   }
});
/**
 * @swagger
 * /info/{subject}/{equation_id}/{language_code}:
 *   get:
 *     summary: Get detailed equation information by subject, id, and language code.
 *     description: Retrieves details for a specific equation based on its unique ID and the desired language.
 *                  Note - The language is extracted from the 'language_code' path parameter. The internal logic shown
 *                  in the code snippet also looks at a 'lang' query parameter, but this Swagger definition
 *                  documents the primary path parameters.
 *     tags:
 *       - API Information
 *     parameters:
 *       - in: path
 *         name: subject
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the subject of the equation (e.g., 'Physics').
 *         example: Physics
 *       - in: path
 *         name: equation_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the equation (e.g., 'centripetal-acceleration') which is the endpoint
 *                      of the post request to generate a calculation.
 *         example: centripetal-acceleration
 *       - in: path
 *         name: language_code
 *         schema:
 *           type: string
 *           # === Add the enum here to specify allowed values ===
 *           enum:
 *             - en
 *             - es
 *             - fr
 *             - de
 *             - it
 *             - ja
 *             - pl
 *             - nl
 *             - zh
 *             - he
 *             - ar
 *             - ru
 *             - pt
 *             - ko
 *             - tr
 *             - ur
 *             - hi
 *             - bn
 *           # ================================================
 *         required: false
 *         description: The language code for the equation details. Select from the supported list.
 *     responses:
 *       200:
 *         description: Successful response with equation details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subject:
 *                   type: string
 *                   description: The subject the equation belongs to.
 *                 equation_id:
 *                   type: string
 *                   description: The ID of the equation.
 *                 language_code:
 *                   type: string
 *                   description: The language code of the returned details (Note - Code uses 'lang' query param or defaults 'en').
 *               # Example of a successful response body (assuming the internal 'body' object structure)
 *               example:
 *                 subject: Physics
 *                 equation_id: centripetal-acceleration
 *                 language_code: en # Or 'es', 'fr' etc. based on request/logic
 *       400:
 *         description: Bad Request - Equation ID is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error.
 *               example:
 *                 error: Equation ID is required.
 *       # Add other potential responses like 404 Not Found if you implement that logic
 */
infoRouter.get("/:subject/:equation_id/:language_code", async (req, res) => {
   const equation_id = req.params.equation_id;
   let language_code = req.params.language_code || "en"; // Default to English if not provided
   const subject = req.params.subject; // Default to Physics if not provided
   //came from swagger unset
   if (language_code === "{language_code}") {
      language_code = "en"; // Default to English if not provided
   }
   if (!equation_id) {
      return sendRes(res, 400, { error: "Equation ID is required." });
   }
   if (!subject) {
      return sendRes(res, 400, { error: "Subject is required." });
   }

   const langFile = getFile(language_code); // Get the language file based on the language code
   if (!langFile) {
      return sendRes(res, httpCodes.NotFound, "Unknown or unsupported language_code.", {}); // Send the processed data as response
   }
   let info = {};

   info = getByProperty(langFile, "equation_id", equation_id); // Get the function by equation_id

   if (Object.keys(info).length === 0) {
      return sendRes(res, httpCodes.NotFound, `Unable to find equation_id of ${equation_id}.`, {});
   }

   return sendRes(res, httpCodes.OK, "Equation info found", info); // Send the processed data as response
   const body = {
      subject: toProperCase(subject), // Convert subject to uppercase for consistency
      equation_id: equation_id,
      language_code: language_code || "en", // Default to English
   };
   req.body = body; // Set the request body to the properties object

   // setup the fields you want to return from the database
   const fields = [
      "name",
      "equation_id",
      "language_code",
      "equation_text",
      "variables",
      "description",
      "subject",
      "topic",
   ];
   await dbUtils.getByProperties(req, res, "explanations", fields); //search properties are stuffed into req.body;
});

/**
 * @swagger
 * /info/find-equations/{subject}/{search_term}/{language_code}:
 *   get:
 *     summary: Get summary information about all the equations in the API that contain a specific term.
 *     description: Retrieves summary information on endpoints in the API that contain a specific term.
 *     tags:
 *       - API Information
 *     parameters:
 *       - in: path
 *         name: subject
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the subject of the equation (e.g., 'Physics').
 *         example: Physics
 *       - in: path
 *         name: search_term
 *         schema:
 *           type: string
 *         required: true
 *         description: The term to search for in the equation names or descriptions.
 *         example: "acceleration"
 *       - in: path
 *         name: language_code
 *         schema:
 *           type: string
 *           # === Add the enum here to specify allowed values ===
 *           enum:
 *             - en
 *             - es
 *             - fr
 *             - de
 *             - it
 *             - ja
 *             - pl
 *             - nl
 *             - zh
 *             - he
 *             - ar
 *             - ru
 *             - pt
 *             - ko
 *             - tr
 *             - ur
 *             - hi
 *             - bn
 *           # ================================================
 *         required: false
 *         description: The language code for the equation summary. Select from the supported list.
 *     responses:
 *       200:
 *         description: Successful response with array of equation summaries.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subject:
 *                   type: string
 *                   description: The subject the equation belongs to.
 *                 equation_id:
 *                   type: string
 *                   description: The ID of the equation.
 *                 language_code:
 *                   type: string
 *                   description: The language code of the returned details (Note - Code uses 'lang' query param or defaults 'en').
 *               # Example of a successful response body (assuming the internal 'body' object structure)
 *               example:
 *                 subject: Physics
 *                 equation_id: centripetal-acceleration
 *                 language_code: en # Or 'es', 'fr' etc. based on request/logic
 *       400:
 *         description: Bad Request - Equation ID is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error.
 *               example:
 *                 error: Equation ID is required.
 *       # Add other potential responses like 404 Not Found if you implement that logic
 */
infoRouter.get("/find-equations/:subject/:search_term/:language_code", async (req, res) => {
   const subject = req.params.subject; // Default to Physics if not provided
   const search_term = req.params.search_term; // Default to Physics if not provided
   let language_code = req.params.language_code || "en"; // Default to English if not provided
   const propsToRemove = ["description", "variables", "topic", "language_code"]; // Properties to remove from the response

   //came from swagger unset
   if (language_code === "{language_code}") {
      language_code = "en"; // Default to English if not provided
   }
   const langFile = getFile(language_code); // Get the language file based on the language code
   if (!langFile) {
      return sendRes(res, httpCodes.NotFound, "Unknown or unsupported language_code.", {}); // Send the processed data as response
   }
   let result = langFile.filter((item) => item.name.toLowerCase().includes(search_term.toLowerCase()));
   result = getReducedArray(result, propsToRemove); // Get the function names and equations
   return sendRes(res, httpCodes.OK, "", result); // Return the function names directly if language is English
});

module.exports = infoRouter;
