// const { validateNumber, formatNumber } = require("../../utils/calcUtils"); // Adjust the path as necessary

// /**
//  * Helper function to calculate factorial (n!).
//  * @param {number} n - The non-negative integer for which to calculate factorial.
//  * @returns {number} The factorial of n. Returns 1 for n=0.
//  * @throws {Error} If n is not a non-negative integer.
//  */
// const factorial = (n) => {
//     // Basic validation - more thorough checks are done before calling this helper
//     if (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || !Number.isInteger(n)) {
//         throw new Error(`Factorial input must be a non-negative integer, received: ${n}`);
//     }
//     if (n === 0) {
//         return 1;
//     }
//     let result = 1;
//     for (let i = 2; i <= n; i++) {
//         result *= i;
//     }
//     // Note: Standard JavaScript numbers have limits for factorials (~170!).
//     // This function will return Infinity for larger numbers.
//     return result;
// };


// /**
//  * Calculates the number of permutations of k items from a set of n distinct items (without repetition).
//  * Formula: P(n, k) = n! / (n-k)!
//  * Requires n >= 0, k >= 0, and n >= k. If k > n, the result is 0.
//  * @param {object} params - Parameters for the calculation.
//  * @param {number} params.n - Total number of distinct items available (n). Must be a non-negative integer.
//  * @param {number} params.k - Number of items to choose (k). Must be a non-negative integer.
//  * @param {number} [params.digits=4] - Number of decimal places for formatting.
//  * @returns {number} The number of permutations P(n, k). Returns 0 if k > n.
//  * @throws {Error} If inputs are not finite non-negative integers, or fail validation rules.
//  */
// const calculatePermut = ({ n, k, digits = 4 }) => {
//     // n must be a non-negative integer
//     validateNumber(n, "n (total items)", { checkNonNegative: true, checkInteger: true });
//     // k must be a non-negative integer
//     validateNumber(k, "k (items to choose)", { checkNonNegative: true, checkInteger: true });

//     // Standard definition requires k <= n. If k > n, there are no permutations.
//     if (k > n) {
//         return formatNumber(0, digits);
//     }

//     // P(n, k) = n! / (n-k)!
//     const numerator = factorial(n);
//     const denominator = factorial(n - k);

//     // Handle potential Infinity/0 from factorial for large numbers, but primarily check k <= n
//      if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
//          // This case should theoretically only happen if k > n (handled above),
//          // or if n is too large for factorial (returns Infinity).
//          // If n is too large, n! is Infinity, and (n-k)! is also Infinity or a large number.
//          // Infinity / Infinity is NaN.
//          // Let's recalculate directly using multiplication for better handling of larger n within JS limits
//          // without relying on potentially problematic large factorials.
//          let result = 1;
//          for (let i = n; i > n - k; i--) {
//              result *= i;
//              if (!Number.isFinite(result)) {
//                   // Catch overflow during multiplication
//                   console.warn(`Calculation of Permut(${n}, ${k}) resulted in Infinity due to large intermediate product.`);
//                   return formatNumber(Infinity, digits);
//              }
//          }
//          return formatNumber(result, digits);

//      }

//     return formatNumber(numerator / denominator, digits);
// };

// /**
//  * Calculates the number of permutations of k items from a set of n distinct types, with repetition allowed.
//  * Formula: n^k
//  * Requires n >= 0, k >= 0.
//  * @param {object} params - Parameters for the calculation.
//  * @param {number} params.n - Number of distinct types available (n). Must be a non-negative integer.
//  * @param {number} params.k - Number of items to choose (k). Must be a non-negative integer.
//  * @param {number} [params.digits=4] - Number of decimal places for formatting.
//  * @returns {number} The number of permutations with repetition n^k.
//  * @throws {Error} If inputs are not finite non-negative integers, or fail validation rules.
//  */
// const calculatePermutationA = ({ n, k, digits = 4 }) => {
//     // n must be a non-negative integer
//     validateNumber(n, "n (number of types)", { checkNonNegative: true, checkInteger: true });
//     // k must be a non-negative integer
//     validateNumber(k, "k (items to choose)", { checkNonNegative: true, checkInteger: true });

//     // n^k calculation. Math.pow handles 0^0 = 1, 0^k (k>0) = 0 correctly.
//     const result = Math.pow(n, k);

//     // Check for potential Infinity result from Math.pow for very large inputs
//     if (!Number.isFinite(result) && result !== Infinity) {
//         // Math.pow can return NaN if inputs are invalid (e.g., negative base with non-integer exponent),
//         // but our validation checks prevent this. It might return 0 for 0^k (k>0) or Infinity.
//          if (result === Infinity) {
//              console.warn(`Calculation of PermutationA(${n}, ${k}) resulted in Infinity.`);
//          } else {
//              console.error(`Calculation of PermutationA(${n}, ${k}) resulted in non-finite value other than Infinity: ${result}`);
//          }
//     }


//     return formatNumber(result, digits);
// };

// class CombinatoricsController {
//     calculatePermut = calculatePermut;
//     calculatePermutationA = calculatePermutationA;
// }

// module.exports = new combinatoricsController();