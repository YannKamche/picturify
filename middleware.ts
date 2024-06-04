import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that should not require authentication
const isPublicRoute = createRouteMatcher([
  // The sign-in route and any sub-routes under it
  "/sign-in(.*)",
  // The sign-up route and any sub-routes under it
  
  "/sign-up(.*)", 
  // The Clerk webhook route
  "/api/webhooks/clerk(.*)",
]);

export default clerkMiddleware((auth, request) => {
  // Check if the current request matches any of the public routes
  if (!isPublicRoute(request)) {
    // If the route is not public, protect it by requiring authentication
    auth().protect();
  }
});

// Configuration for the middleware matcher
export const config = {
  // Match all routes except those containing a dot (e.g., static files) or starting with "_next" (Next.js internal)
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
