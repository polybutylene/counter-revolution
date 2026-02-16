/* eslint-disable */
/**
 * Generated API stub — replaced by `npx convex dev`
 *
 * Run `npx convex dev` to generate the real API bindings from your schema.
 */

// Proxy that returns itself for any property access, allowing
// api.estimator.submitEstimate etc. to resolve without real codegen.
function createProxy(path = []) {
  return new Proxy(function () {}, {
    get(_, prop) {
      if (typeof prop === "string") {
        return createProxy([...path, prop]);
      }
      return undefined;
    },
    apply() {
      return undefined;
    },
  });
}

export const api = createProxy();
export const internal = createProxy();
