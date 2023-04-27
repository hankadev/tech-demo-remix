import type { V2_MetaFunction } from "@remix-run/react";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "~/styles/main.css";
import MainNavigation from "./components/navigation";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Remember it!" }];
};

function Document({
  title,
  children,
}: {
  title?: string;
  children: JSX.Element;
}) {
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {children}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </>
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <div className="error-wrapper">
          <h1>Oops</h1>
          <p>Status: {error.status}</p>
          <p>{error.data.message}</p>
        </div>
      </Document>
    );
  }

  let errorMessage = "Unknown error";
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <Document>
      <div className="error-wrapper">
        <h1>Uh oh ...</h1>
        <p>Something went wrong.</p>
        <pre>{errorMessage}</pre>
      </div>
    </Document>
  );
}
