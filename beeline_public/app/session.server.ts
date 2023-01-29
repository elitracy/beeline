import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import type { Passenger } from "~/models/passenger.server";
import { getPassengerById } from "~/models/passenger.server";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const PASSENGER_SESSION_KEY = "passengerId";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getPassengerId(
  request: Request
): Promise<Passenger["id"] | undefined> {
  const session = await getSession(request);
  const passengerId = session.get(PASSENGER_SESSION_KEY);
  return passengerId;
}

export async function getPassenger(request: Request) {
  const passengerId = await getPassengerId(request);
  if (passengerId === undefined) return null;

  const passenger = await getPassengerById(passengerId);
  if (passenger) return passenger;

  throw await logout(request);
}

export async function requirePassesngerId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const passengerId = await getPassengerId(request);
  if (!passengerId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return passengerId;
}

export async function requirePassenger(request: Request) {
  const passengerId = await requirePassesngerId(request);

  const passenger = await getPassengerById(passengerId);
  if (passenger) return passenger;

  throw await logout(request);
}

export async function createPassengerSession({
  request,
  passengerId,
  remember,
  redirectTo,
}: {
  request: Request;
  passengerId: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(PASSENGER_SESSION_KEY, passengerId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
