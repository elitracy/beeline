import type { Airplane, Passenger } from "@prisma/client";
import { prisma } from "~/db.server";

export type Airport = {
  id: string,
  name: string,
  city: string,
  state: string,
  country: string,
  airplanes: Airplane[],
  passengers: Passenger[],
}

export async function getAirportById(id: Airport["id"]): Promise<Airport | undefined> {
  const airport = await prisma.airport.findUnique({ where: { id } });
  return airport ? airport : undefined
}

export async function getAllAirports(): Promise<Array<Airport>> {
  return prisma.airport.findMany();
}

