import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { getGlobalData } from "./data.server";
import Navbar from "./components/navbar";
import Footer from "./components/Footer"; // Import the Footer component
import ErrorBoundaryContent from "~/components/ErrorBoundaryContent";

// CSS IMPORTS
import "./tailwind.css";
import globalstyles from './globalstyles.css?url';

export const links: LinksFunction = () => [
  // Preconnect
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  // Font imports
  {
    rel: "stylesheet",
    href: "https://fonts.cdnfonts.com/css/ocr-a-extended",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.cdnfonts.com/css/ethnocentric",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  // Global stylesheet
  { rel: "stylesheet", href: globalstyles },
];

export const loader: LoaderFunction = async () => {
  const globalData = await getGlobalData();
  const strapiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";
  return Response.json({ globalData, strapiUrl });
};

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorBoundaryContent error={error} />;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { globalData, strapiUrl } = useLoaderData<{
    globalData: any;
    strapiUrl: string;
  }>();

  return (
    <Layout>
      <Navbar data={globalData.header} strapiUrl={strapiUrl} />
      <Outlet />
      <Footer data={globalData.footer} strapiUrl={strapiUrl} />
    </Layout>
  );
}
