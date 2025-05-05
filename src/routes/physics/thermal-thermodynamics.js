const express = require("express");
const thermalThermodynamicsRouter = express.Router();
const thermalThermodynamicsController = require("../../controllers/physics/thermal-thermodyanmics"); // Adjust the path as necessary
const { handleCalculationRequest } = require("../../utils/calcUtils"); // Adjust the path as necessary


/**
 * @swagger
 * /physics/solid-expansion-length:
 *   post:
 *     summary: Calculates solid linear thermal expansion (ΔL = αL0ΔT)
 *     description: Calculates the change in length of a solid material due to a temperature change.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alpha:
 *                 type: number
 *                 description: Coefficient of linear expansion (α)
 *               L0:
 *                 type: number
 *                 description: Original length (L0)
 *               deltaT:
 *                 type: number
 *                 description: Change in temperature (ΔT)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - alpha
 *               - L0
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of change in length.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Change in length (ΔL)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/solid-expansion-length", handleCalculationRequest(thermalThermodynamicsController.calculateSolidExpansionLength));

/**
 * @swagger
 * /physics/solid-expansion-area:
 *   post:
 *     summary: Calculates solid area thermal expansion (ΔA = 2αA0ΔT)
 *     description: Calculates the change in area of a solid material due to a temperature change, using the linear expansion coefficient.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alpha:
 *                 type: number
 *                 description: Coefficient of linear expansion (α)
 *               A0:
 *                 type: number
 *                 description: Original area (A0)
 *               deltaT:
 *                 type: number
 *                 description: Change in temperature (ΔT)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - alpha
 *               - A0
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of change in area.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Change in area (ΔA)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/solid-expansion-area", handleCalculationRequest(thermalThermodynamicsController.calculateSolidExpansionArea));

/**
 * @swagger
 * /physics/solid-expansion-volume:
 *   post:
 *     summary: Calculates solid volume thermal expansion (ΔV = 3αV0ΔT)
 *     description: Calculates the change in volume of a solid material due to a temperature change, using the linear expansion coefficient.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alpha:
 *                 type: number
 *                 description: Coefficient of linear expansion (α)
 *               V0:
 *                 type: number
 *                 description: Original volume (V0)
 *               deltaT:
 *                 type: number
 *                 description: Change in temperature (ΔT)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - alpha
 *               - V0
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of change in volume.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Change in volume (ΔV)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/solid-expansion-volume", handleCalculationRequest(thermalThermodynamicsController.calculateSolidExpansionVolume));

/**
 * @swagger
 * /physics/liquid-expansion:
 *   post:
 *     summary: Calculates liquid thermal expansion (ΔV = βV0ΔT)
 *     description: Calculates the change in volume of a liquid due to a temperature change.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               beta:
 *                 type: number
 *                 description: Coefficient of volumetric expansion (β)
 *               V0:
 *                 type: number
 *                 description: Original volume (V0)
 *               deltaT:
 *                 type: number
 *                 description: Change in temperature (ΔT)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - beta
 *               - V0
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of change in volume.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Change in volume (ΔV)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/liquid-expansion", handleCalculationRequest(thermalThermodynamicsController.calculateLiquidExpansion));

/**
 * @swagger
 * /physics/sensible-heat:
 *   post:
 *     summary: Calculates sensible heat (Q = mcΔT)
 *     description: Calculates the heat transferred causing a change in temperature of a substance.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               m:
 *                 type: number
 *                 description: Mass (m)
 *               c:
 *                 type: number
 *                 description: Specific heat capacity (c)
 *               deltaT:
 *                 type: number
 *                 description: Change in temperature (ΔT)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - m
 *               - c
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of sensible heat.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Sensible heat (Q)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/sensible-heat", handleCalculationRequest(thermalThermodynamicsController.calculateSensibleHeat));

/**
 * @swagger
 * /physics/latent-heat:
 *   post:
 *     summary: Calculates latent heat (Q = mL)
 *     description: Calculates the heat transferred during a phase change of a substance.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               m:
 *                 type: number
 *                 description: Mass (m)
 *               L:
 *                 type: number
 *                 description: Specific latent heat (L)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - m
 *               - L
 *     responses:
 *       200:
 *         description: Successful calculation of latent heat.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Latent heat (Q)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/latent-heat", handleCalculationRequest(thermalThermodynamicsController.calculateLatentHeat));

/**
 * @swagger
 * /physics/ideal-gas-law:
 *   post:
 *     summary: Validates Ideal Gas Law (PV = nRT)
 *     description: Checks if the Ideal Gas Law equation holds true for the given parameters. Returns boolean. Note- Uses strict equality (===) which may be sensitive to floating-point precision; consider tolerance for real-world checks.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               P:
 *                 type: number
 *                 description: Pressure (P)
 *               V:
 *                 type: number
 *                 description: Volume (V)
 *               n:
 *                 type: number
 *                 description: Number of moles (n)
 *               R:
 *                 type: number
 *                 description: Ideal gas constant (R)
 *               T:
 *                 type: number
 *                 description: Temperature (T)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - P
 *               - V
 *               - n
 *               - R
 *               - T
 *     responses:
 *       200:
 *         description: Successful validation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: True if PV equals nRT.
 *       400:
 *         description: Invalid input (e.g., non-finite numbers).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/ideal-gas-law", handleCalculationRequest(thermalThermodynamicsController.calculateIdealGasLaw));

/**
 * @swagger
 * /physics/molecular-ke:
 *   post:
 *     summary: Calculates average molecular kinetic energy (KE = (3/2)kT)
 *     description: Calculates the average translational kinetic energy per molecule of an ideal gas.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               k:
 *                 type: number
 *                 description: Boltzmann's constant (k)
 *               T:
 *                 type: number
 *                 description: Temperature (T)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - k
 *               - T
 *     responses:
 *       200:
 *         description: Successful calculation of molecular kinetic energy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Molecular kinetic energy (KE)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/molecular-ke", handleCalculationRequest(thermalThermodynamicsController.calculateMolecularKE));

/**
 * @swagger
 * /physics/molecular-speed-vp:
 *   post:
 *     summary: Calculates most probable molecular speed (v_p = √(2kT/m))
 *     description: Calculates the most probable speed of molecules in an ideal gas according to the Maxwell-Boltzmann distribution.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               k:
 *                 type: number
 *                 description: Boltzmann's constant (k)
 *               T:
 *                 type: number
 *                 description: Temperature (T)
 *               m:
 *                 type: number
 *                 description: Molecular mass (m)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - k
 *               - T
 *               - m
 *     responses:
 *       200:
 *         description: Successful calculation of most probable speed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Most probable molecular speed (v_p)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, negative values for sqrt, mass is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/molecular-speed-vp", handleCalculationRequest(thermalThermodynamicsController.calculateMolecularSpeedVP));

/**
 * @swagger
 * /physics/molecular-speed-avg:
 *   post:
 *     summary: Calculates average molecular speed (v_avg = √(8kT/(πm)))
 *     description: Calculates the average speed of molecules in an ideal gas according to the Maxwell-Boltzmann distribution.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               k:
 *                 type: number
 *                 description: Boltzmann's constant (k)
 *               T:
 *                 type: number
 *                 description: Temperature (T)
 *               m:
 *                 type: number
 *                 description: Molecular mass (m)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - k
 *               - T
 *               - m
 *     responses:
 *       200:
 *         description: Successful calculation of average speed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Average molecular speed (v_avg)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, negative values for sqrt, mass is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/molecular-speed-avg", handleCalculationRequest(thermalThermodynamicsController.calculateMolecularSpeedAvg));

/**
 * @swagger
 * /physics/molecular-speed-rms:
 *   post:
 *     summary: Calculates root mean square molecular speed (v_rms = √(3kT/m))
 *     description: Calculates the root mean square speed of molecules in an ideal gas according to the Maxwell-Boltzmann distribution.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               k:
 *                 type: number
 *                 description: Boltzmann's constant (k)
 *               T:
 *                 type: number
 *                 description: Temperature (T)
 *               m:
 *                 type: number
 *                 description: Molecular mass (m)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - k
 *               - T
 *               - m
 *     responses:
 *       200:
 *         description: Successful calculation of RMS speed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Root mean square molecular speed (v_rms)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, negative values for sqrt, mass is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/molecular-speed-rms", handleCalculationRequest(thermalThermodynamicsController.calculateMolecularSpeedRMS));


/**
 * @swagger
 * /physics/internal-energy-change:
 *   post:
 *     summary: Calculates internal energy change for ideal monatomic gas (ΔU = (3/2)nRΔT)
 *     description: Calculates the change in internal energy for a monatomic ideal gas undergoing a temperature change.
 *     tags:
 *          - Physics - Thermal Physics / Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nR:
 *                 type: number
 *                 description: Product of number of moles and Ideal Gas Constant (nR)
 *               deltaT:
 *                 type: number
 *                 description: Change in temperature (ΔT)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - nR
 *               - deltaT
 *     responses:
 *       200:
 *         description: Successful calculation of internal energy change.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Change in internal energy (ΔU)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/internal-energy-change", handleCalculationRequest(thermalThermodynamicsController.calculateInternalEnergyChange));

/**
 * @swagger
 * /physics/thermodynamic-work:
 *   post:
 *     summary: Calculates thermodynamic work done by system at constant pressure (W = -PΔV)
 *     description: Calculates the work done by or on a system during a thermodynamic process at constant pressure. Note- Equation calculates work *done by* the system, positive for expansion, negative for compression. Function returns -P*deltaV, consistent with work *done by* the system according to the equation W = PΔV, with an added negative sign which may imply work *done on* the system depending on convention. Documenting the function's output.
 *     tags:
 *          - Physics - Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               P:
 *                 type: number
 *                 description: Pressure (P)
 *               deltaV:
 *                 type: number
 *                 description: Change in volume (ΔV)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - P
 *               - deltaV
 *     responses:
 *       200:
 *         description: Successful calculation of work done.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Thermodynamic work done by the system (W) using -PΔV
 *       400:
 *         description: Invalid input (e.g., non-finite numbers).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/thermodynamic-work", handleCalculationRequest(thermalThermodynamicsController.calculateThermodynamicWork));

/**
 * @swagger
 * /physics/efficiency-real:
 *   post:
 *     summary: Calculates efficiency of a real engine (η_real = 1 - (Q_C / Q_H))
 *     description: Calculates the thermal efficiency of a heat engine based on heat absorbed and rejected.
 *     tags:
 *          - Physics - Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               QC:
 *                 type: number
 *                 description: Heat rejected to the cold reservoir (Q_C)
 *               QH:
 *                 type: number
 *                 description: Heat absorbed from the hot reservoir (Q_H)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - QC
 *               - QH
 *     responses:
 *       200:
 *         description: Successful calculation of real efficiency.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Efficiency (η_real)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, QH is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/efficiency-real", handleCalculationRequest(thermalThermodynamicsController.calculateEfficiencyReal));

/**
 * @swagger
 * /physics/efficiency-ideal:
 *   post:
 *     summary: Calculates ideal efficiency (Carnot) (η_ideal = 1 - (T_C / T_H))
 *     description: Calculates the maximum theoretical efficiency of a heat engine operating between two temperatures (Carnot efficiency).
 *     tags:
 *          - Physics - Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TC:
 *                 type: number
 *                 description: Cold reservoir temperature in Kelvin (T_C)
 *               TH:
 *                 type: number
 *                 description: Hot reservoir temperature in Kelvin (T_H)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - TC
 *               - TH
 *     responses:
 *       200:
 *         description: Successful calculation of ideal efficiency.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Ideal efficiency (η_ideal)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, TH is zero, temperatures are negative).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/efficiency-ideal", handleCalculationRequest(thermalThermodynamicsController.calculateEfficiencyIdeal));

/**
 * @swagger
 * /physics/cop-real:
 *   post:
 *     summary: Calculates coefficient of performance for a real refrigerator (COP_real = QC / (QH - QC))
 *     description: Calculates the coefficient of performance for a real refrigerator or heat pump.
 *     tags:
 *          - Physics - Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               QC:
 *                 type: number
 *                 description: Heat removed from cold reservoir (Q_C)
 *               QH:
 *                 type: number
 *                 description: Heat rejected to hot reservoir (Q_H)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - QC
 *               - QH
 *     responses:
 *       200:
 *         description: Successful calculation of real COP.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Coefficient of performance (COP_real)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, denominator is zero).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/cop-real", handleCalculationRequest(thermalThermodynamicsController.calculateCOPReal));

/**
 * @swagger
 * /physics/cop-ideal:
 *   post:
 *     summary: Calculates coefficient of performance for an ideal refrigerator (COP_ideal = TC / (TH - TC))
 *     description: Calculates the maximum theoretical coefficient of performance for a refrigerator or heat pump operating between two temperatures.
 *     tags:
 *          - Physics - Thermodynamics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TC:
 *                 type: number
 *                 description: Cold reservoir temperature in Kelvin (T_C)
 *               TH:
 *                 type: number
 *                 description: Hot reservoir temperature in Kelvin (T_H)
 *               digits:
 *                type: integer
 *                description: Number of decimal places to round the result to (optional, default is 4, value must be 0-16) 
 *                default: 4
 *             required:
 *               - TC
 *               - TH
 *     responses:
 *       200:
 *         description: Successful calculation of ideal COP.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Coefficient of performance (COP_ideal)
 *       400:
 *         description: Invalid input (e.g., non-finite numbers, denominator is zero, temperatures are negative).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
thermalThermodynamicsRouter.post("/cop-ideal", handleCalculationRequest(thermalThermodynamicsController.calculateCOPIdeal));


// Don't forget to export the router
module.exports = thermalThermodynamicsRouter;
