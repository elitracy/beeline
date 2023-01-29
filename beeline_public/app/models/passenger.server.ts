import type { Password } from "@prisma/client";
import { prisma } from "~/db.server";
import bcrypt from "bcryptjs";

type Flight = {
  id: string,
  source_airport: string,
  destination_airport: string,
  departure_time: string,
  arrival_time: string,
  duration: string,
}

export type Passenger = {
  id: string,
  name: string,
  email: string,
}

const data = [

    {
      id: "1",
      source_airport: "JFK",
      destination_airport: "LAX",
      departure_time: "2022-09-01 10:00",
      arrival_time: "2022-09-01 13:00",
      duration: "3 hours"
    },
    {
      id: "2",
      source_airport: "LAX",
      destination_airport: "SFO",
      departure_time: "2022-09-01 14:00",
      arrival_time: "2022-09-01 15:00",
      duration: "1 hour"
    },
    {
      id: "3",
      source_airport: "SFO",
      destination_airport: "ORD",
      departure_time: "2022-09-01 16:00",
      arrival_time: "2022-09-01 19:00",
      duration: "3 hours"
    }
  ];
 
export async function getFlights(): Promise<Array<Flight>> {
  return data
}

export async function getFlight(flightId: String): Promise<Flight | undefined> {
    return new Promise((resolve) => {
        const flight = data.find(f => f.id === flightId);
        resolve(flight);
    });
}

export async function getPassengerById(id: Passenger["id"]) {
  return prisma.passenger.findUnique({ where: { id } });
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

  console.log(password)
  console.log(passengerWithPassword)
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
