const request = require("supertest");
const assert = require("assert");

// --- Important: You need to import your actual Express app or server instance ---
// Assuming your app is exported from '../src/app.js' or similar
const app = require("../../src/app.js"); // <--- Adjust this path to your application entry point

// Assuming your validateNumber function is used internally by the handler
// and throws errors like "Invalid input: [paramName] must be a finite number."

describe("Centripetal Acceleration API (/physics/centripetal-acceleration)", () => {
   // Test Case 1: Successful calculation
   it("should return 200 and the correct centripetal acceleration for valid inputs", async () => {
      const radius = 5;
      const speed = 10;
      const expectedAcceleration = (speed * speed) / radius; // Calculate expected value

      const response = await request(app)
         .post("/api/v1/physics/centripetal-acceleration") // The API endpoint
         .send({ r: radius, v: speed }) // Send the input parameters
         .expect("Content-Type", /json/) // Expect JSON response
         .expect(200); // Expect a 200 OK status code

      // Assert the response body structure and content
      assert.strictEqual(response.body.result, 20, "Response message is incorrect");
      assert.ok(response.body.hasOwnProperty("result"), "Response body should have a 'result' property");
      assert.ok(response.body.hasOwnProperty("inputs"), "Response body should have an 'inputs' property");

      // Use assert.deepStrictEqual for the inputs if checking them is needed
      // assert.deepStrictEqual(response.body.inputs, { r: radius, v: speed }, "Response inputs do not match sent inputs");

      // Use assert.strictEqual for exact value, or assert.ok for floating point comparison
      // For floating point results, comparing directly with === can be risky due to precision.
      // A small tolerance is usually better.
      const tolerance = 1e-9; // Define a small tolerance for floating point comparison
      assert.ok(
         Math.abs(response.body.result - expectedAcceleration) < tolerance,
         `Expected result to be close to ${expectedAcceleration}, but got ${response.body.result}`
      );

      // Or if you trust your rounding logic (like toFixed in the handler):
      // assert.strictEqual(response.body.result, +expectedAcceleration.toFixed(response.body.inputs.digits || 4), "Calculated result is incorrect");
   });

   // Test Case 2: Handling zero radius (should cause a 400 error)
   it("should return 400 and an error message when radius is zero", async () => {
      const radius = 0;
      const speed = 5;

      const response = await request(app)
         .post("/api/v1/physics/centripetal-acceleration")
         .send({ r: radius, v: speed })
         .expect("Content-Type", /json/)
         .expect(400); // Expect a 400 Bad Request status code

      // Assert the response body structure and content for the error
      assert.ok(response.body.hasOwnProperty("error"), "Error response body should have an 'error' property");
      assert.strictEqual(typeof response.body.error, "string", "Error property should be a string");

      // You can assert the specific error message if you know it
      // Based on the validateNumber error format:
      assert.ok(
         response.body.error.includes("cannot be zero."),
         `Expected error message to mention invalid 'r', but got "${response.body.error}"`
      );
   });

   // Optional: Test case for non-numeric inputs
   it("should return 400 and an error message for non-numeric inputs", async () => {
      const response = await request(app)
         .post("/api/v1/physics/centripetal-acceleration")
         .send({ r: "ten", v: 5 }) // Send non-numeric radius
         .expect("Content-Type", /json/)
         .expect(400); // Expect a 400 Bad Request status code

      assert.ok(response.body.hasOwnProperty("error"), "Error response body should have an 'error' property");
      assert.strictEqual(typeof response.body.error, "string", "Error property should be a string");
      assert.ok(
         response.body.error.includes("must be a finite number."),
         `Expected error message to mention invalid 'r', but got "${response.body.error}"`
      );
   });
});
