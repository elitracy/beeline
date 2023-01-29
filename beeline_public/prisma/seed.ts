import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {

  //Create a test passenger seed
  const passenger1 = await prisma.passenger.create({
    data: {
      email: "john@example.com",
      password: {
        create: {
          hash: await bcrypt.hash("password", 10)
        }
      },
      name: "John Doe",
      airports: {
        create: [
          { name: "IAH", city: "Houston", state: "TX", country: "USA" },
          { name: "RNO", city: "Reno", state: "NV", country: "USA" },
          { name: "SET", city: "Seattle", state: "WA", country: "USA" },
          { name: "SFO", city: "San Fransisco", state: "CA", country: "USA" }
        ]
      },
      airplanes: {
        create: [
          {
            departure_time: new Date("2022-06-01T09:00:00.000Z"),
            arrival_time: new Date("2022-06-01T12:00:00.000Z"),
            airports: {
              connect: [{ name: "IAH" }, { name: "RNO" }, { name: "SET" }, { name: "SFO" }]
            },
            seats: {
              create: [
                { seat_number: 1, seat_row: 1, seat_class: "economy" },
                { seat_number: 2, seat_row: 1, seat_class: "economy" }
              ]
            }
          },
          {
            departure_time: new Date("2022-06-01T09:00:00.000Z"),
            arrival_time: new Date("2022-06-01T12:00:00.000Z"),
            airports: {
              connect: [{ name: "RNO" }, { name: "SET" }]
            },
            seats: {
              create: [
                { seat_number: 1, seat_row: 1, seat_class: "economy" },
                { seat_number: 2, seat_row: 1, seat_class: "economy" }
              ]
            }
          },
          {
            departure_time: new Date("2022-06-01T09:00:00.000Z"),
            arrival_time: new Date("2022-06-01T12:00:00.000Z"),
            airports: {
              connect: [{ name: "SET" }, { name: "SFO" }]
            },
            seats: {
              create: [
                { seat_number: 1, seat_row: 1, seat_class: "economy" },
                { seat_number: 2, seat_row: 1, seat_class: "economy" }
              ]
            }
          }
        ]
      },

    }
  })

  const passenger2 = await prisma.passenger.create({
    data: {
      email: "jane@example.com",
      password: {
        create: {
          hash: await bcrypt.hash("password", 10)
        }
      },
      name: "Jane Doe",
      airports: {
        create: [
          { name: "LAX", city: "Los Angeles", state: "CA", country: "USA" },
          { name: "JFK", city: "New York", state: "NY", country: "USA" }
        ]
      },
      airplanes: {
        create: [
          {
            departure_time: new Date("2022-06-01T09:00:00.000Z"),
            arrival_time: new Date("2022-06-01T12:00:00.000Z"),
            airports: {
              connect: [{ name: "LAX" }, { name: "JFK" }]
            },
            seats: {
              create: [
                { seat_number: 1, seat_row: 1, seat_class: "economy" },
                { seat_number: 2, seat_row: 1, seat_class: "economy" }
              ]
            }
          }
        ]
      },

    }
  })

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
