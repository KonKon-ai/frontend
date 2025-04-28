import { LoaderFunction, redirect } from "@remix-run/node";

// This is a catch-all route that will match any URL that hasn't been matched by other routes
export const loader: LoaderFunction = async ({ params }) => {
  console.log("Catch-all route hit for path:", params["*"]);
  
  // You can either redirect to the homepage:
  return redirect("/");
  
  // Or you can throw a 404 response:
  // throw new Response("Not Found", { status: 404 });
};

export default function CatchAll() {
  // This component won't actually render because we're redirecting in the loader
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
} 