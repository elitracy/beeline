import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

import type { Passenger } from "~/models/passenger.server";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isPassenger(passenger: any): passenger is Passenger {
  return passenger && typeof passenger === "object" && typeof passenger.email === "string" && typeof passenger.name === "string";
}

export function useOptionalPassenger(): Passenger | undefined {
  const data = useMatchesData("root");
  if (!data || !isPassenger(data.passenger)) {
    return undefined;
  }
  return data.passenger;
}

export function usePassenger(): Passenger {
  const maybePassenger = useOptionalPassenger();
  if (!maybePassenger) {
    throw new Error(
      "No passenger found in root loader, but passenger is required by usePasssenger. If passenger is optional, try useOptional instead."
    );
  }
  return maybePassenger;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}
