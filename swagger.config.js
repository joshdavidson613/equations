/**
 * @module SwaggerConfig
 * @description Configuration for swagger-jsdoc to generate OpenAPI spec.
 */

const isDevelopment = process.env.NODE_ENV === "development";
const options = {
   definition: {
      openapi: "3.1.0",
      info: {
         title: "Math & Science Equation API",
         version: "1.0.0",
         description:
            "API endpoints to calculate various physics equations. Documentation is generated from JSDoc comments.",
      },
      tags: [
         {
            name: "API Information",
            description: "Endpoints for general API information and metadata.",
         },
      ],
      servers: [
         {
            url: isDevelopment
               ? "http://localhost:3000/api/v1"
               : "https://d709b619-af57-4d79-8978-89d2776b900e.us-east-1.cloud.genez.io/api/v1",
            description: "Math & Science Equation Endpoints",
         },
      ],

      components: {
         schemas: {
            Error: {
               type: "object",
               properties: {
                  error: {
                     type: "string",
                     description: "Error message describing the issue.",
                  },
               },
               required: ["error"],
            },
         },
      },
   },
   // Paths to files containing OpenAPI definitions (JSDoc comments with @swagger)
   apis: [
      "./src/routes/physics/*.js", // Scan route files for endpoint definitions
      "./src/routes/stats/*.js", // Scan route files for endpoint definitions
   ],
};

module.exports = options;
