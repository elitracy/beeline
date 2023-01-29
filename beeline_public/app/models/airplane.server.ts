import { prisma } from "~/db.server";
import type { Airport, Passenger } from "@prisma/client";

export type Airplane = {
  id: string,
  departure_time: string,
  arrival_time: string,
  airports: Airport[],
  passengers: Passenger[],
}

export async function getAirplaneById(id: Airplane["id"]): Promise<Airplane | undefined> {
  const plane = await prisma.airplane.findUnique({ where: { id } });
  return plane ? plane : undefined
}

export async function getAllAirplanes(): Promise<Array<Airplane>> {
  return prisma.airplane.findMany();
}
