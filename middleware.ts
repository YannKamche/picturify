import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/api/webhooks/clerk",
]);

export default clerkMiddleware((auth, request) => {
  // Check if the request matches any public routes
  if (!isPublicRoute(request)) {
    // Protect all non-public routes
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
