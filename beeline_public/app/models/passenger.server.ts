import type { Airport, Airplane, Password } from "@prisma/client";
import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";
import { getAirplaneById, getAllAirplanes } from "~/models/airplane.server";
import { getPassengerId } from "~/session.server";
import { getAllAirports } from "./airport.server";
import { warn } from "console";

export type Passenger = {
  id: string,
  name: string,
  email: string,
  password?: Password,
  airplanes: Airplane[],
  airports: Airport[]
}

export type Flight = {
  id: string,
  departure_airport: Airport,
  arrival_airport: Airport,
  airplane: Airplane,
}

export async function getAllAirplanesByPassenger(passengerId: Passenger["id"]): Promise<Array<Airplane>> {
  const airplanes = await prisma.passenger.findUnique({ where: { id: passengerId } }).airplanes()
  return airplanes ? airplanes : [];
}

export async function getAllAirportsByPassenger(passengerId: Passenger["id"]): Promise<Array<Airport>> {
  const airports = await prisma.passenger.findUnique({ where: { id: passengerId } }).airports()
  return airports ? airports : [];
}

export async function getAltFlights(current_airport: Airport, final_destination: Airport): Promise<Array<Flight>> {

  return [
    {
      id: "1",
      departure_airport: {
        id: "1",
        name: "LAX",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
      },
      arrival_airport: {
        id: "2",
        name: "JFK",
        city: "New York",
        state: "NY",
        country: "USA",
      },
      airplane: {
        id: "1",
        departure_time: new Date("12:00"),
        arrival_time: new Date("13:00"),
      }
    }
  ]

}

export async function getPassengerById(id: Passenger["id"]): Promise<Passenger | undefined> {
  const passenger = await prisma.passenger.findUnique({ where: { id } })
  return passenger ? passenger : undefined
}

export async function getPassengerByEmail(email: Passenger["email"]) {
  return prisma.passenger.findUnique({ where: { email } });
}

export async function createPassenger(email: Passenger["email"], password: string) {
  const hashedPassword = bcrypt.hash(password, 10);

  return prisma.passenger.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deletePassengerByEmail(email: Passenger["email"]) {
  return prisma.passenger.delete({ where: { email } });
}

export async function verifyLogin(
  email: Passenger["email"],
  password: Password["hash"]
) {
  const passengerWithPassword = await prisma.passenger.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!passengerWithPassword || !passengerWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    passengerWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...passengerWithoutPassword } = passengerWithPassword;

  return passengerWithoutPassword;
}
