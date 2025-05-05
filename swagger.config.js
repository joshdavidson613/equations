/**
 * @module SwaggerConfig
 * @description Configuration for swagger-jsdoc to generate OpenAPI spec.
 */

const options = {
   definition: {
      openapi: "3.0.3",
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
            url: "http://localhost:3000/api/v1", // Adjust if your app runs on a different port or host
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
