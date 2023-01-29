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
  airtime: number,
  arriveList: Date[],
  departList: Date[],
  path: string[],
  'total time': number
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

  // const altFlights_cost = await fetch(`https://beeline.herokuapp.com/cost/${current_airport.name}/${final_destination.name}`).then(res => res.json()).catch(err => console.error(err))
  const altFlights_time = await fetch(`https://beeline.herokuapp.com/time/${current_airport.name}/${final_destination.name}`).then(res => res.json()).catch(err => console.error(err))

  return altFlights_time.sort((a, b) => a['total time'] - b['total time']).slice(0, 5)
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
