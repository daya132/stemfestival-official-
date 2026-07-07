export function reportLovableError(error: Error, context?: Record<string, string>) {
  if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
    console.warn("[Lovable Error]", error.message, context);
  }
}