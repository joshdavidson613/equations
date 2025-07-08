/**
 * @module App
 * @description Main Express.js application setup for the Physics Equation API.
 */

const express = require("express");
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
const {checkAuth} = require("./middleware/auth.js"); // Import the authentication middleware
const cors = require("cors");
const {sendRes} = require("./utils/httpUtils.js"); // Import the sendRes function for sending responses
const {httpCodes} = require("./enums/http.js"); // Import HTTP status codes from enums
const solidMechanicsRouter = require("./routes/physics/solid-mechanics.js");
const thermalThermodynamicsRouter = require("./routes/physics/thermal-thermodynamics.js");
// physics routes
const infoRouter = require("./routes/physics/info.js");
//const statsRouter = require("./routes/stats/stats.js");
const circularMotionRouter = require("./routes/physics/circular-motion.js");
const electromagnetismRouter = require("./routes/physics/electromagnetism.js");
const fluidsThermodynamicsRouter = require("./routes/physics/fluids-thermodynamics.js");
const gravitationRouter = require("./routes/physics/gravitation.js");
const mechanicsRouter = require("./routes/physics/mechanics.js");
const momentumRouter = require("./routes/physics/momentum.js");
const nuclearRouter = require("./routes/physics/nuclear.js");
const oscillationsWavesRouter = require("./routes/physics/oscillations-waves.js");
const opticsRouter = require("./routes/physics/optics.js");
const relativityQuantumRouter = require("./routes/physics/relativity-quantum.js");
const rotationalMotionRouter = require("./routes/physics/rotational-motion.js");
const wavesOpticsRouter = require("./routes/physics/waves-optics.js");
const workEnergyRouter = require("./routes/physics/work-energy.js");

const swaggerConfig = require("../swagger.config.js");

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(checkAuth); // Apply authentication middleware globally

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
// Generate Swagger spec
const swaggerSpec = swaggerJSDoc(swaggerConfig);

// Serve Swagger UI
app.use(
   "/api-docs",
   swaggerUi.serve,
   swaggerUi.setup(swaggerSpec, { explorer: true, swaggerOptions: { docExpansion: "none" } })
); // explorer: true adds a search bar

app.get("/api-docs.json", (req, res) => {
   res.setHeader("Content-Type", "application/json");
   res.send(swaggerSpec); // Sending the generated JSON object
});

// Basic Root Route
app.get("/", (req, res) => {
   res.send("Physics Equation API is running. Go to /api-docs for documentation.");
});

app.use("/api/v1/info", infoRouter); // Mount info router

// Mount Physics Routes

//app.use("/api/v1/stats", statsRouter); // Mount stats router
app.use("/api/v1/physics", solidMechanicsRouter);
app.use("/api/v1/physics", thermalThermodynamicsRouter);
app.use("/api/v1/physics", mechanicsRouter);
app.use("/api/v1/physics", momentumRouter);
app.use("/api/v1/physics/", circularMotionRouter);
app.use("/api/v1/physics", workEnergyRouter);
app.use("/api/v1/physics", rotationalMotionRouter);
app.use("/api/v1/physics", gravitationRouter);
app.use("/api/v1/physics", oscillationsWavesRouter);
app.use("/api/v1/physics", fluidsThermodynamicsRouter);
app.use("/api/v1/physics", wavesOpticsRouter);
app.use("/api/v1/physics", opticsRouter);
app.use("/api/v1/physics", electromagnetismRouter);
app.use("/api/v1/physics", relativityQuantumRouter);
app.use("/api/v1/physics", nuclearRouter);

app.get("/api/v1/ping", (req, res) => {
  res.status(200).json({
      message:"Server is up as of " + new Date(),
   }); // Send a generic error response
});
// Global error handling middleware (for errors not caught by route handlers)
app.use((err, req, res, next) => {
   console.error(err.stack); // Log the error stack
   res.status(500).json({
      message: err.stack,
      error: "An unexpected error occurred.",
   }); // Send a generic error response
});



// Handle 404 errors - not found
// should be last entry and is a global handler for all routes.
app.use((req, res, next) => {
   res.status(404).json({
      url: `${req.url}`,
      error: "Can't find what you are looking for.",
   }); // Send a generic error response
});

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

console.log("Node_Env:", process.env.NODE_ENV);

app.listen(port, () => {
  const apiBase = `http://${host}:${port}/api/v1`;
  const docsUrl = `http://${host}:${port}/api-docs`;

  console.log(`🚀 Physics Equation API is running at: ${apiBase}`);
  console.log(`📚 Swagger Docs available at: ${docsUrl}`);
});

module.exports = app; // Export for testing if needed
